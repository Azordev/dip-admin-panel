import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteInscription } from '../../../controllers/inscriptions'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') deleteInscription(req, res)
}
