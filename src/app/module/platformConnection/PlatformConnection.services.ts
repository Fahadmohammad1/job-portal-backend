import { PlatformConnection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const insertPlatformConnectionIntoDB = async (
  data: PlatformConnection,
  authUserId: string
): Promise<PlatformConnection> => {
  const user = await prisma.user.findFirst({
    where: {
      id: authUserId,
    },
  });
  data.userId = authUserId;
  data.userProfileUserId = authUserId;

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  return await prisma.platformConnection.create({
    data,
  });
};

const getAllPlatformConnectionFromDB = async (): Promise<
  PlatformConnection[]
> => {
  return await prisma.platformConnection.findMany({});
};
const getPlatformConnectionByIdFromDB = async (
  id: string
): Promise<PlatformConnection | null> => {
  return await prisma.platformConnection.findFirst({ where: { id } });
};
const deletePlatformConnectionByIdFromDB = async (
  id: string
): Promise<PlatformConnection | null> => {
  return await prisma.platformConnection.delete({ where: { id } });
};
const updatePlatformConnectionByIdIntoDB = async (
  id: string,
  data: Partial<PlatformConnection>
): Promise<PlatformConnection> => {
  return await prisma.platformConnection.update({ where: { id }, data });
};

export const PlatformConnectionService = {
  insertPlatformConnectionIntoDB,
  getAllPlatformConnectionFromDB,
  deletePlatformConnectionByIdFromDB,
  updatePlatformConnectionByIdIntoDB,
  getPlatformConnectionByIdFromDB,
};
