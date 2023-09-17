import { Page } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../../errors/ApiError';
import { prisma } from '../../../../shared/prisma';

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

export const PageService = {
  createPage,
};
