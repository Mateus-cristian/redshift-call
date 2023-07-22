import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

export default async function handlerProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res)
  );

  if (!session) {
    return res.status(401).end();
  }

  const timeInterval = await prisma.userTimeInterval.findMany({
    where: {
      user_id: session.user.id,
    },
    distinct: ["week_day"],
    select: {
      week_day: true,
      end_time_in_minutes: true,
      start_time_in_minutes: true,
      id: true,
    },
  });

  return res.status(200).json(timeInterval);
}
