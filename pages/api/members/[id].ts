import type { NextApiRequest, NextApiResponse } from 'next'

import { toggleMember } from 'controllers/members'

export const config = {
  api: { bodyParser: false },
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') toggleMember(req, res)
}
