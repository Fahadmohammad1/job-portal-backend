import { Prisma, Project } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { IProfileFilter } from '../profile/profile.interface';
import { projectSearchableFields } from './project.constant';

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

const getAllFromDB = async (
  filter: IProfileFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Project[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filter;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: projectSearchableFields.map(filed => ({
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
  const whereConditions: Prisma.ProjectWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.project.findMany({
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

  const total = await prisma.project.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
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
