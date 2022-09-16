import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteProduct, updateProduct } from '../../../controllers/products'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') deleteProduct(req, res)
  if (req.method === 'PUT') updateProduct(req, res)
}
