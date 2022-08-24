import type { NextApiRequest, NextApiResponse } from 'next'

import { getEvent, updateEvent } from '../../../controllers/events'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') getEvent(req, res)
  if (req.method === 'PUT') updateEvent(req, res)
}
