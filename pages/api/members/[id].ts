import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

import { deleteMember, toggleMember, updateMember } from "controllers/members";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["DELETE"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method === "PATCH") toggleMember(req, res);
  if (req.method === "PUT") updateMember(req, res);
  if (req.method === "DELETE") deleteMember(req, res);
}
