// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { setCookie } from "nookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { username } = req.body;

  const existExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!existExists) {
    return res.status(201).json({ userExist: false });
  }

  return res.status(201).json({ userExist: true });
}
