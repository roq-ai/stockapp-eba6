import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { stockIdeaValidationSchema } from 'validationSchema/stock-ideas';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.stock_idea
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getStockIdeaById();
    case 'PUT':
      return updateStockIdeaById();
    case 'DELETE':
      return deleteStockIdeaById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStockIdeaById() {
    const data = await prisma.stock_idea.findFirst(convertQueryToPrismaUtil(req.query, 'stock_idea'));
    return res.status(200).json(data);
  }

  async function updateStockIdeaById() {
    await stockIdeaValidationSchema.validate(req.body);
    const data = await prisma.stock_idea.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteStockIdeaById() {
    const data = await prisma.stock_idea.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
