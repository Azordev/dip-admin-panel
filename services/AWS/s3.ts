import S3 from 'aws-sdk/clients/s3'
import type { File } from 'formidable'
import fs from 'fs'
import { v4 as uuid } from 'uuid'

const bucketName = process.env.S3_BUCKET_NAME || ''
const region = process.env.S3_BUCKET_REGION
const accessKeyId = process.env.S3_ACCESS_KEY || ''
const secretAccessKey = process.env.S3_SECRET_KEY || ''

const s3 = new S3({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

export const addObject = (file: File, prefix?: String) => {
  const extName = file.originalFilename?.split('.').at(-1)
  const fileName = `${prefix ? `${prefix}_` : ''}${uuid()}.${extName}`
  return s3
    .upload({
      Bucket: bucketName,
      Key: fileName,
      Body: fs.createReadStream(file.filepath),
    })
    .promise()
}
