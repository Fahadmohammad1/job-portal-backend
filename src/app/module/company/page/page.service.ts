import { Page } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
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

const getAllPage = async (): Promise<Page[] | null> => {
  return await prisma.page.findMany({
    include: {
      Blog: true,
      JobPost: true,
    },
  });
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
