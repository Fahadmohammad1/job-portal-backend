import { Prisma, SocialPlatform } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { socialPlatformSearchableFields } from './socialPlatform.constant';
import { ISocialPlatformFilter } from './socialPlatform.interface';

const insertIntoDB = async (data: SocialPlatform): Promise<SocialPlatform> => {
  return await prisma.socialPlatform.create({
    data,
  });
};

const getAllFromDB = async (
  filter: ISocialPlatformFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<SocialPlatform[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filter;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: socialPlatformSearchableFields.map(filed => ({
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
  const whereConditions: Prisma.SocialPlatformWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.socialPlatform.findMany({
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
  const total = await prisma.socialPlatform.count({ where: whereConditions });
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<SocialPlatform | null> => {
  return await prisma.socialPlatform.findFirst({
    where: { id: id },
  });
};
const updateByIdIntoDB = async (
  id: string,
  payload: Partial<SocialPlatform>
): Promise<SocialPlatform> => {
  return await prisma.socialPlatform.update({
    where: { id },
    data: payload,
  });
};

const deleteByIdFromDB = async (id: string) => {
  await prisma.socialPlatform.delete({
    where: { id },
  });
};

export const SocialPlatformService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
};
