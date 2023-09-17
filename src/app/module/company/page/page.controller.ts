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

export const PageController = {
  createPage,
};
