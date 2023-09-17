import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../../shared/catchAsync';
import sendResponse from '../../../../shared/sendResponse';
import { PageService } from './page.service';

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
  const result = await PageService.getAllPage();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pages fetched successfully!',
    data: result,
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
  const result = await PageService.updatePage(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Page updated successfully!',
    data: result,
  });
});

const deletePage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PageService.deletePage(id);

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
