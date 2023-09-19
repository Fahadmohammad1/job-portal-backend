import { Prisma, Skills } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { skillSearchableFields } from './skill.constant';
import { ISkillFilter } from './skill.interface';

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

const getAllFromDB = async (
  filter: ISkillFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Skills[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filter;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: skillSearchableFields.map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereConditions: Prisma.SkillsWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.skills.findMany({
    skip,
    take: limit,
    where: whereConditions,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.skills.count({ where: whereConditions });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
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
