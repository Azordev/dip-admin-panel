import S3 from 'aws-sdk/clients/s3'
import crypto from 'crypto'
import type { File } from 'formidable'
import fs from 'fs'
import { v4 as uuid } from 'uuid'

const bucketName = process.env.S3_BUCKET_NAME || ''
const region = process.env.S3_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY || process.env.S3_ACCESS_KEY || ''
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || process.env.S3_SECRET_KEY || ''

const s3 = new S3({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  signatureVersion: 'v4',
})

export const addObject = async (file: File, prefix?: String) => {
  try {
    const extName = file?.originalFilename?.split('.').at(-1)
    const fileName = `${prefix ? `${prefix}_` : ''}${uuid()}.${extName}`

    const fileBuffer = fs.readFileSync(file.filepath)
    const fileStream = fs.createReadStream(file.filepath)
    const hex = crypto.createHash('sha256').update(fileBuffer).digest('base64')

    const { Location } = await s3
      .upload({
        Bucket: bucketName,
        Key: fileName,
        Body: fileStream,
        ChecksumSHA256: hex,
      })
      .promise()
    return { Location }
  } catch (error) {
    return { error }
  }
}
