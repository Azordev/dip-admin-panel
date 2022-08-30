import type { NextApiRequest, NextApiResponse } from 'next'

import { createProduct, getProductsAPI } from '../../../controllers/products'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') getProductsAPI(req, res)
  if (req.method === 'POST') createProduct(req, res)
}
