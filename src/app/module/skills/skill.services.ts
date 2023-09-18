import { Skills } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';

const insertSkillsIntoDB = async (data: Skills): Promise<Skills> => {
  const isExist = await prisma.skills.findFirst({
    where: {
      name: data.name.toLowerCase(),
    },
  });
  console.log(isExist);
  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This skill already here');
  }
  return await prisma.skills.create({
    data: {
      name: data.name.toLowerCase(),
    },
  });
};

const getAllFromDB = async (): Promise<Skills[]> => {
  return await prisma.skills.findMany({});
};
const getByIdFromDB = async (id: string): Promise<Skills | null> => {
  return await prisma.skills.findFirst({ where: { id } });
};
const deleteByIdFromDB = async (id: string): Promise<Skills | null> => {
  return await prisma.skills.delete({ where: { id } });
};
const updateByIdIntoDB = async (
  id: string,
  data: Partial<Skills>
): Promise<Skills> => {
  return await prisma.skills.update({ where: { id }, data });
};

export const SkillsService = {
  insertSkillsIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteByIdFromDB,
  updateByIdIntoDB,
};
