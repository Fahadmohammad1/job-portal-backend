import { JobPost } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createJobPost = async (payload: JobPost) => {
  const result = await prisma.jobPost.create({
    data: payload,
  });

  return result;
};

export const JobPostService = {
  createJobPost,
};
