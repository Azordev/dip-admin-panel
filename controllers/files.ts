import formidable from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import { addObject } from '@/services/AWS/s3'

export const uploadFile = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200,
  })

  const form = formidable()
  const { prefix } = req.query

  form.parse(req, async (err, _, files) => {
    try {
      if (err) {
        return res.status(500).json({ error: err })
      }

      if (files.file) {
        const file = files.file as formidable.File
        const { Location: fileUrl, error: saveError } = await addObject(file, prefix as string)

        if (saveError) {
          return res.status(500).json({ error: saveError })
        }

        return res.json({
          msg: 'File created successfully',
          data: { fileUrl },
        })
      }
    } catch (error) {
      res.status(500).json(error)
    }
  })
}
