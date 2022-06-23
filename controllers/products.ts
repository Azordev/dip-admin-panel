import formidable from 'formidable'
import type { NextApiRequest, NextApiResponse } from 'next'

import { addObject } from '../services/AWS/s3'

export const createProduct = (req: NextApiRequest, res: NextApiResponse) => {
  const form = formidable()
  form.parse(req, async (_err, _fields, files) => {
    const file = files.image as formidable.File
    const { Location: imageURL } = await addObject(file)
    res.json({ msg: 'File saved successfully', imageURL })
  })
}
