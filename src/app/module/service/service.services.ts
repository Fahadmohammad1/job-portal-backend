import { Prisma, Service } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { prisma } from '../../../shared/prisma';
import { ServiceSearchableFields } from './service.constant';
import { IServiceFilter } from './service.interface';

const createServiceIntoDB = async (
  authUserId: string,
  data: Service
): Promise<Service> => {
  const user = await prisma.user.findFirst({ where: { id: authUserId } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not Found');
  }
  data.userId = authUserId;
  return await prisma.service.create({
    data,
  });
};

const getAllServiceFromDB = async (
  filter: IServiceFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filter;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: ServiceSearchableFields.map(filed => ({
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
  const whereConditions: Prisma.ServiceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.service.findMany({
    skip,
    take: limit,
    where: whereConditions,
    include: {
      user: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.service.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getServiceByIdFromDB = async (id: string): Promise<Service | null> => {
  return prisma.service.findFirst({
    where: { id },
  });
};

const updateServiceByIdIntoDB = async (
  id: string,
  data: Partial<Service>
): Promise<Service | null> => {
  return await prisma.service.update({
    where: { id },
    data,
  });
};

const deleteServiceByIdFromDB = async (id: string): Promise<Service | null> => {
  return await prisma.service.delete({ where: { id } });
};

export const ServiceServices = {
  createServiceIntoDB,
  getAllServiceFromDB,
  getServiceByIdFromDB,
  updateServiceByIdIntoDB,
  deleteServiceByIdFromDB,
};
