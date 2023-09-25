import { Location, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../../interfaces/common';
import { IPaginationOptions } from '../../../../interfaces/pagination';
import { prisma } from '../../../../shared/prisma';
import { LocationSearchableFields } from './location.constant';
import { ILocationFilter } from './location.interface';

const createLocationIntoDB = async (data: Location): Promise<Location> => {
  return await prisma.location.create({
    data,
  });
};

const getAllLocationFromDB = async (
  filter: ILocationFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Location[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filter;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: LocationSearchableFields.map(filed => ({
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
  const whereConditions: Prisma.LocationWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.location.findMany({
    skip,
    take: limit,
    where: whereConditions,

    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            // createdAt: 'desc',
          },
  });

  const total = await prisma.location.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getLocationByIdFromDB = async (id: string): Promise<Location | null> => {
  return prisma.location.findFirst({
    where: { id },
  });
};

const updateLocationByIdIntoDB = async (
  id: string,
  data: Partial<Location>
): Promise<Location | null> => {
  return await prisma.location.update({
    where: { id },
    data,
  });
};

const deleteLocationByIdFromDB = async (
  id: string
): Promise<Location | null> => {
  return await prisma.location.delete({ where: { id } });
};

export const LocationLocationService = {
  createLocationIntoDB,
  getAllLocationFromDB,
  getLocationByIdFromDB,
  updateLocationByIdIntoDB,
  deleteLocationByIdFromDB,
};
