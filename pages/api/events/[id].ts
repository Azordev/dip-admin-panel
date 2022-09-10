import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteEvent, getEventAPI, updateEvent } from '../../../controllers/events'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') getEventAPI(req, res)
  if (req.method === 'PUT') updateEvent(req, res)
  if (req.method === 'DELETE') deleteEvent(req, res)
}
