/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { JobPostService } from './job.services';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';

const createJobPostFromUser = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await JobPostService.createJobPostFromUser(
      req.body,
      user!.userId
    );

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

const getAllJobPost = catchAsync(async (req: Request, res: Response) => {
  const result = await JobPostService.getAllJobPost();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job posts retrieved successfully!',
    data: result,
  });
});

const getSingleJobPost = catchAsync(async (req: Request, res: Response) => {
  const result = await JobPostService.getSingleJobPost(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job post retrieved successfully!',
    data: result,
  });
});

const updateJobPost = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload | null = req.user;
  const pageId: string = req.query.pageId as string;
  const result = await JobPostService.updateJobPost(
    req.params.id,
    req.body,
    user!.userId,
    pageId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job post retrieved successfully!',
    data: result,
  });
});

const deleteJobPost = catchAsync(async (req: Request, res: Response) => {
  const user: JwtPayload | null = req.user;
  const pageId: string = req.query.pageId as string;
  const result = await JobPostService.deleteJobPost(
    req.params.id,
    user!.userId,
    pageId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job post retrieved successfully!',
    data: result,
  });
});

export const JobPostController = {
  createJobPostFromUser,
  createJobPostFromPage,
  getAllJobPost,
  getSingleJobPost,
  updateJobPost,
  deleteJobPost,
};
