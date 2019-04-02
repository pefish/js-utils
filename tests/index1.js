const fs = require('fs')
const path = require('path')

function readDir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        resolve(null)
        return
      }
      resolve(files)
    })
  })
}

function stat(dir) {
  return new Promise((resolve, reject) => {
    fs.stat(dir, (err, stats) => {
      if (err) {
        resolve(null)
        return
      }
      resolve(stats)
    })
  })
}

function readFile(dir) {
  return new Promise((resolve, reject) => {
    fs.readFile(dir, (err, data) => {
      if (err) {
        resolve(null)
        return
      }
      resolve(data)
    })
  })
}

const results = []

async function test (dir) {
  const files = await readDir(dir)
  if (files) {
    for (let filename of files) {
      const dir1 = path.join(dir, filename)
      const stats = await stat(dir1)
      if (stats) {
        if (stats.isDirectory()) {
          const data = await readFile(path.join(dir1, `package.json`))
          if (data) {
            const dataObj = JSON.parse(data.toString())
            results.push(dataObj[`name`])
            await test(path.join(dir1, `node_modules`))
          }
        }
      }
    }
  }
}

function test1 (dir, resolve1) {
  return new Promise((resolve, reject) => {
    readDir(dir).then((files) => {
      if (files) {
        for (let filename of files) {
          const dir1 = path.join(dir, filename)
          stat(dir1).then((stats) => {
            if (stats) {
              if (stats.isDirectory()) {
                readFile(path.join(dir1, `package.json`)).then((data) => {
                  if (data) {
                    const dataObj = JSON.parse(data.toString())
                    results.push(dataObj[`name`])
                    test1(path.join(dir1, `node_modules`), resolve).then((data) => {
                      resolve1(data)
                    })
                  }
                })
              }
            }
          })
        }
      } else {
        resolve1(results)
      }
    })
  })
}

function test2 (dir) {
  return new Promise((resolve, reject) => {
    // resolve(11)
    setTimeout(() => {
      resolve(2)
    }, 2000)
  })
}

test1(path.join(process.cwd(), `node_modules`), (d) => {
  // console.log(d, d.length)
}).then((a) => {
  console.log(a,results)
  console.log(results.length)
})

