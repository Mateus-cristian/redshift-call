import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { buildNextAuthOptions } from "../auth/[...nextauth].api";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";

const updateProfileBodySchema = z.object({
  name: z.string().nullable().optional(),
  bio: z.string(),
});

export default async function handlerProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
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

  const { bio, name } = updateProfileBodySchema.parse(req.body);

  const dataToUpdate: { bio: string; name?: string } = {
    bio,
  };

  if (name !== null && name !== undefined) {
    dataToUpdate.name = name;
  }

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: dataToUpdate,
  });

  return res.status(204).end();
}
