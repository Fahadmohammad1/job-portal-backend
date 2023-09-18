import { Experience } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (
  data: Experience,
  authUserId: string
): Promise<Experience> => {
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
  return await prisma.experience.create({
    data,
  });
};

const getAllFromDB = async (): Promise<Experience[]> => {
  return await prisma.experience.findMany({});
};
const getByIdFromDB = async (id: string): Promise<Experience | null> => {
  return await prisma.experience.findFirst({ where: { id } });
};
const deleteByIdFromDB = async (id: string): Promise<Experience | null> => {
  return await prisma.experience.delete({ where: { id } });
};
const updateByIdIntoDB = async (
  id: string,
  data: Partial<Experience>
): Promise<Experience> => {
  return await prisma.experience.update({ where: { id }, data });
};

export const ExperienceService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
};
