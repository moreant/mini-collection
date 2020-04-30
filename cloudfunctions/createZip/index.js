// 云函数入口文件
const cloud = require('wx-server-sdk')
const fs = require('fs')
const jszip = require('jszip')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

// 云函数入口函数
exports.main = async (event, context) => {

  const zip = new jszip()
  const { files, _id } = event

  for (let i = 0; i < files.length; i++) {
    const res = await cloud.downloadFile({
      fileID: files[i].fileID,
    })
    zip.file(files[i].name, res.fileContent)
  }

  await new Promise(resolve => {
    zip.generateNodeStream({ streamFiles: true })
      .pipe(fs.createWriteStream('/tmp/out.zip'))
      .on('finish', function () {
        resolve()
      });
  })

  const fileStream = fs.createReadStream('/tmp/out.zip')
  return await cloud.uploadFile({
    cloudPath: `${_id}/out.zip`,
    fileContent: fileStream,
  })
}