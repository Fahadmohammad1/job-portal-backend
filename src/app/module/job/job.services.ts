import { JobPost } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createJobPostFromUser = async (payload: JobPost, user: string) => {
  payload.userId = user;
  const result = await prisma.jobPost.create({
    data: payload,
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
  });

  return result;
};

const getAllJobPost = async (): Promise<JobPost[]> => {
  const result = await prisma.jobPost.findMany();

  return result;
};

const getSingleJobPost = async (id: string): Promise<JobPost | null> => {
  const result = await prisma.jobPost.findUnique({
    where: {
      id,
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


const deleteExpiredJobPosts = async() => {
  const expiredJobPosts = await prisma.jobPost.findMany({
    where: {
      createdAt: {
        lte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
  });

  for (const jobPost of expiredJobPosts) {
    await prisma.jobPost.delete({
      where: {
        id: jobPost.id,
      },
    });
  }
}


export const JobPostService = {
  createJobPostFromUser,
  createJobPostFromPage,
  getAllJobPost,
  getSingleJobPost,
  updateJobPost,
  deleteJobPost,
  deleteExpiredJobPosts,
};
