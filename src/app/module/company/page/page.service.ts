import { Page } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../../errors/ApiError';
import { paginationHelpers } from '../../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../../interfaces/common';
import { IPaginationOptions } from '../../../../interfaces/pagination';
import { prisma } from '../../../../shared/prisma';
import { pageSearchableFields } from './page.constant';
import { IPageFilter } from './page.interface';

const createPage = async (pageData: Page): Promise<Page> => {
  const pageExist = await prisma.page.findUnique({
    where: {
      title: pageData.title,
    },
  });

  if (pageExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Name is already taken, Please try another!'
    );
  }

  const result = await prisma.page.create({
    data: pageData,
  });

  return result;
};

const getAllPage = async (
  filters: IPageFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Page[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;
  console.log(filtersData);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: pageSearchableFields.map(field => ({
        [field]: {
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

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.page.findMany({
    include: {
      Blog: true,
      JobPost: true,
    },

    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.page.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSinglePage = async (title: string): Promise<Page | null> => {
  return await prisma.page.findUnique({
    where: {
      title: title,
    },
    include: {
      Blog: true,
      JobPost: true,
    },
  });
};

const updatePage = async (
  pageId: string,
  data: Record<string, unknown>,
  user: JwtPayload
): Promise<Page | null> => {
  const pageExist = await prisma.page.findUnique({
    where: {
      id: pageId,
    },
  });

  if (!pageExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Page does not exist!');
  }

  if (pageExist.userId !== user.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access');
  }

  const result = await prisma.page.update({
    where: {
      id: pageId,
    },
    data,
  });

  return result;
};

const deletePage = async (
  pageId: string,
  user: JwtPayload
): Promise<Page | null> => {
  const pageExist = await prisma.page.findUnique({
    where: {
      id: pageId,
    },
  });

  if (!pageExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Page does not exist!');
  }

  if (pageExist.userId !== user.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden Access');
  }

  return await prisma.page.delete({
    where: {
      id: pageId,
    },
  });
};

export const PageService = {
  createPage,
  getAllPage,
  getSinglePage,
  updatePage,
  deletePage,
};
