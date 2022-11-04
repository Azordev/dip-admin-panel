import type { NextApiRequest, NextApiResponse } from 'next'

import { createSubscription } from '../../../controllers/subscriptions'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') createSubscription(req, res)
}
