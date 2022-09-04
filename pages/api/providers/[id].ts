import type { NextApiRequest, NextApiResponse } from 'next'

import { disableProvider, updateProvider } from '../../../controllers/providers'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') disableProvider(req, res)
  if (req.method === 'PUT') updateProvider(req, res)
}
