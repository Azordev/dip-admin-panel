import type { NextApiRequest, NextApiResponse } from 'next'

import { uploadFile } from 'controllers/files'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') uploadFile(req, res)
}
