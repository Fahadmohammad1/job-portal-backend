import { Project } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const insertIntoDB = async (
  data: Project,
  authUserId: string
): Promise<Project> => {
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
  return await prisma.project.create({
    data,
  });
};

const getAllFromDB = async (): Promise<Project[]> => {
  return await prisma.project.findMany({});
};
const getByIdFromDB = async (id: string): Promise<Project | null> => {
  return await prisma.project.findFirst({ where: { id } });
};
const deleteByIdFromDB = async (id: string): Promise<Project | null> => {
  return await prisma.project.delete({ where: { id } });
};
const updateByIdIntoDB = async (
  id: string,
  data: Partial<Project>
): Promise<Project> => {
  return await prisma.project.update({ where: { id }, data });
};

export const ProjectService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
};
