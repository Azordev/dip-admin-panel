import type { NextApiRequest, NextApiResponse } from 'next'

import { createProvider, getProviders } from '../../../controllers/providers'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') getProviders(req, res)
  if (req.method === 'POST') createProvider(req, res)
}
