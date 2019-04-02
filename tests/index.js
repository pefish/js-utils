var fs = require('fs');
var path = require('path');
let aa = []

function readdirPromisify(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, list) => {
      if (err) {
        reject(err);
      } else {
        resolve(list);
      }
    });
  });
}

function statPromisify(dir) {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats);
      }
    });
  });
}

function readFilePromisify(dir) {
  return new Promise((resolve, reject) => {
    fs.readFile(dir + '/package.json', function (err, datas) {
      if (err) {
        // console.log(dir + '/package.json', '读取失败')
      } else {
        let pkg_datas = JSON.parse(datas.toString()), subNodeModule = null
        aa.push(pkg_datas.name)
      }
      resolve()
    })
  }).catch((err) => {
    // console.log(err)
  });
}

function listDir(dir) {
  return statPromisify(dir).then(stats => {
    if (stats.isDirectory()) {
      return readdirPromisify(dir).then(filesList => {
        let subTree = filesList.map((item) => {
          return readFilePromisify(path.resolve(dir, item)).then(() => {
            return listDir(path.resolve(dir, item) + '/node_modules')
          })
        })
        return Promise.all(subTree)
      }).then((datas) => {
        return datas
      });
    } else {
      return '';
    }
  }).catch((err) => {
    // console.log(err)
    // throw err
  });
}

var file_path = path.join(process.cwd(), `node_modules`)
listDir(file_path).then((datas) => {
  console.log(aa, aa.length)
})