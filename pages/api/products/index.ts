import type { NextApiRequest, NextApiResponse } from 'next'

import { createProduct, getProducts } from '../../../controllers/products'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') getProducts(req, res)
  if (req.method === 'POST') createProduct(req, res)
}
