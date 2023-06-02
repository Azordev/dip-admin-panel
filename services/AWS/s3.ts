import S3 from 'aws-sdk/clients/s3'
import crypto from 'crypto'
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
  signatureVersion: 'v4',
})

export const addObject = async ({ originalFilename, filepath }: any, prefix?: string) => {
  if (!filepath || !originalFilename) {
    return { Location: '' }
  }
  try {
    const fileName = `${prefix ? `${prefix}_` : ''}${uuid()}.${originalFilename}`
    const fileBuffer = fs.readFileSync(filepath)
    const fileStream = fs.createReadStream(filepath)
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
