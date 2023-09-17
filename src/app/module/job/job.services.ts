import { JobPost } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createJobPostFromUser = async (payload: JobPost, user: string) => {
  payload.userId = user;
  const result = await prisma.jobPost.create({
    data: payload,
  });

  return result;
};

const createJobPostFromPage = async (payload: JobPost, id: string) => {
  payload.pageId = id;
  const result = await prisma.jobPost.create({
    data: payload,
  });

  return result;
};

export const JobPostService = {
  createJobPostFromUser,
  createJobPostFromPage,
};
