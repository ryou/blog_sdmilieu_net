const fs = require('fs-extra')
const glob = require('glob')
const moment = require('moment')

const sourceDir = 'public/posts'
const destDir = '_parsed/posts'

const copyPostsDirectory = () => {
  return new Promise((resolve, reject) => {
    fs.copy(sourceDir, destDir, err => {
      if (err) reject(err)
    
      resolve()
    })
  })
}

const getPostsDirectories = () => {
  return new Promise((resolve, reject) => {
    glob(`${destDir}/**/meta.json`, {}, (error, files) => {
      if (error) reject(error)

      const directories = files.map(file => {
        let tmp = file.split('/')
        tmp.pop()
        return tmp.join('/')
      })
      
      resolve(directories)
    })
  })
}

const processTargetDirectory = async path => {
  const metaFilePath = `${path}/meta.json`
  const mdFilePath = `${path}/readme.md`
  const meta = await fs.readJSON(metaFilePath)
  const createdAt = reformatCreatedAt(meta.created_at)
  const md = await fs.readFile(mdFilePath)
  const newMD = `---\ncreated_at: ${createdAt}\n---\n\n${md}`
  await fs.remove(metaFilePath)

  return fs.writeFile(mdFilePath, newMD)
}

const reformatCreatedAt = createdAt => {
  return moment(createdAt.toString()).format('YYYY-MM-DD')
}

const main = async () => {
  await copyPostsDirectory()
  const directories = await getPostsDirectories()

  const promises = directories.map(directory => processTargetDirectory(directory))

  Promise.all(promises)
    .then(() => {
      console.log('complete')
    })
}

main()
