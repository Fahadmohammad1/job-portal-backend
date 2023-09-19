/* eslint-disable @typescript-eslint/no-explicit-any */
import { JobPost, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { JobPostFiltersType } from './job.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import {
  jobPostRelationalFieldsMapper,
  jobPostSearchableField,
} from './job.constant';

const createJobPostFromUser = async (payload: JobPost, user: string) => {
  console.log(user);
  payload.userId = user;
  const result = await prisma.jobPost.create({
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};

const createJobPostFromPage = async (
  payload: JobPost,
  id: string
): Promise<JobPost> => {
  payload.pageId = id;
  const result = await prisma.jobPost.create({
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllJobPost = async (
  filters: JobPostFiltersType,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, minSalary, maxSalary, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: jobPostSearchableField.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (minSalary !== undefined) {
    andConditions.push({
      minSalary: {
        gte: Number(minSalary),
      },
    });
  }

  if (maxSalary !== undefined) {
    andConditions.push({
      maxSalary: {
        lte: Number(maxSalary),
      },
    });
  }

  if (Object.keys(filtersData).length > 0) {
    andConditions.push({
      AND: Object.keys(filtersData).map(key => {
        if (jobPostSearchableField.includes(key)) {
          return {
            [key]: {
              equals: (filtersData as any)[key],
            },
          };
        } else {
          return {
            [jobPostRelationalFieldsMapper[key]]: {
              id: (filtersData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.JobPostWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.jobPost.findMany({
    where: whereConditions,
    include: {
      category: true,
      user: true,
      page: true,
    },
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.jobPost.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleJobPost = async (id: string): Promise<JobPost | null> => {
  const result = await prisma.jobPost.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      user: true,
      page: true,
    },
  });

  return result;
};

const updateJobPost = async (
  id: string,
  payload: Partial<JobPost>,
  userId: string,
  pageId: string
): Promise<JobPost> => {
  const isPostExistWithUser = await prisma.jobPost.findFirst({
    where: {
      id,
      userId: userId,
    },
  });

  const isPostExistWithPage = await prisma.jobPost.findFirst({
    where: {
      id,
      pageId,
    },
  });

  if (isPostExistWithUser || isPostExistWithPage) {
    const result = await prisma.jobPost.update({
      where: {
        id,
        userId: userId,
      },
      data: payload,
      include: {
        category: true,
        page: true,
        user: true,
      },
    });

    return result;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "You don't have permission");
  }
};

const deleteJobPost = async (
  id: string,
  userId: string,
  pageId: string
): Promise<JobPost | null> => {
  const isPostExistWithUser = await prisma.jobPost.findFirst({
    where: {
      id,
      userId: userId,
    },
  });

  const isPostExistWithPage = await prisma.jobPost.findFirst({
    where: {
      id,
      pageId,
    },
  });

  if (isPostExistWithUser || isPostExistWithPage) {
    const result = await prisma.jobPost.delete({
      where: {
        id,
      },
    });
    return result;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "You don't have the permission");
  }
};

const deleteExpiredJobPosts = async () => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  await prisma.jobPost.deleteMany({
    where: {
      createdAt: {
        lt: thirtyDaysAgo.toISOString(),
      },
    },
  });
};

export const JobPostService = {
  createJobPostFromUser,
  createJobPostFromPage,
  getAllJobPost,
  getSingleJobPost,
  updateJobPost,
  deleteJobPost,
  deleteExpiredJobPosts,
};
