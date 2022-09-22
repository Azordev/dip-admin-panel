import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteProvider, toggleProvider, updateProvider } from '../../../controllers/providers'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') toggleProvider(req, res)
  if (req.method === 'PUT') updateProvider(req, res)
  if (req.method === 'DELETE') deleteProvider(req, res)
}
