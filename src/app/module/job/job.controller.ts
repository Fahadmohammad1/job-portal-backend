/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { JobPostService } from './job.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createJobPostFromUser = catchAsync(
  async (req: Request, res: Response) => {
    const user  = req.user;
    const result = await JobPostService.createJobPostFromUser(req.body, user!.userId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Job post created successfully!',
      data: result,
    });
  }
);


const createJobPostFromPage = catchAsync(
  async (req: Request, res: Response) => {
    const result = await JobPostService.createJobPostFromPage(
      req.body,
      req.params.id
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Job post created successfully!',
      data: result,
    });
  }
);


export const JobPostController = {
  createJobPostFromUser,
  createJobPostFromPage,
};
