import { PlatformConnection } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (
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

const getAllFromDB = async (): Promise<PlatformConnection[]> => {
  return await prisma.platformConnection.findMany({});
};
const getByIdFromDB = async (
  id: string
): Promise<PlatformConnection | null> => {
  return await prisma.platformConnection.findFirst({ where: { id } });
};
const deleteByIdFromDB = async (
  id: string
): Promise<PlatformConnection | null> => {
  return await prisma.platformConnection.delete({ where: { id } });
};
const updateByIdIntoDB = async (
  id: string,
  data: Partial<PlatformConnection>
): Promise<PlatformConnection> => {
  return await prisma.platformConnection.update({ where: { id }, data });
};

export const PlatformConnectionService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
};
