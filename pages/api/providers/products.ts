import type { NextApiRequest, NextApiResponse } from 'next'

import { getProviderProducts } from '../../../controllers/products'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') getProviderProducts(req, res)
}
