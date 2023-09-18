import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { PageService } from './page.service';
import pick from '../../../../shared/pick';
import { pageFilterableFields } from './page.constant';

const createPage = catchAsync(async (req: Request, res: Response) => {
  const result = await PageService.createPage(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Page created successfully!',
    data: result,
  });
});

const getAllPage = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, pageFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await PageService.getAllPage(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pages fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSinglePage = catchAsync(async (req: Request, res: Response) => {
  const { title } = req.params;
  const result = await PageService.getSinglePage(title);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Page fetched successfully!',
    data: result,
  });
});

const updatePage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as JwtPayload;
  const result = await PageService.updatePage(id, req.body, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Page updated successfully!',
    data: result,
  });
});

const deletePage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as JwtPayload;
  const result = await PageService.deletePage(id, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Page deleted successfully!',
    data: result,
  });
});

export const PageController = {
  createPage,
  getAllPage,
  getSinglePage,
  updatePage,
  deletePage,
};
