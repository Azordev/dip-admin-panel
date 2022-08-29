import type { NextApiRequest, NextApiResponse } from 'next'

import { createProvider, getProvidersAPI } from '../../../controllers/providers'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') getProvidersAPI(req, res)
  if (req.method === 'POST') createProvider(req, res)
}
