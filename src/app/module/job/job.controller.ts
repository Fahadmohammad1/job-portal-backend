import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { JobPostService } from './job.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createJobPost = catchAsync(async (req: Request, res: Response) => {
  const result = await JobPostService.createJobPost(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job post created successfully!',
    data: result,
  });
});

export const JobPostController = {
  createJobPost,
};
