import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteMember, toggleMember, updateMember } from 'controllers/members'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') toggleMember(req, res)
  if (req.method === 'PUT') updateMember(req, res)
  if (req.method === 'DELETE') deleteMember(req, res)
}
