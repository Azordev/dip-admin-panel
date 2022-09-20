import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

import { uploadFile } from 'controllers/files'

export const config = {
  api: { bodyParser: false },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    origin: '*',
    optionsSuccessStatus: 200,
  })
  if (req.method === 'POST') uploadFile(req, res)
}
