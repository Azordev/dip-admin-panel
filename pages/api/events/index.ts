import type { NextApiRequest, NextApiResponse } from 'next'

import { createEvent, getEventsAPI } from '../../../controllers/events'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') getEventsAPI(req, res)
  if (req.method === 'POST') createEvent(req, res)
}
