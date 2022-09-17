import type { NextApiRequest, NextApiResponse } from 'next'

import { createMember } from '../../../controllers/members'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') createMember(req, res)
}
