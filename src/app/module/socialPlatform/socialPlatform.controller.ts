import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SocialPlatformService } from './socialPlatform.services';
import pick from '../../../shared/pick';
import { socialPlatformFilterableFields } from './socialPlatform.constant';
import { paginationFields } from '../../../constants/pagination';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SocialPlatformService.insertIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Social platform create successfully',
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, socialPlatformFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await SocialPlatformService.getAllFromDB(filter, options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Social platform fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SocialPlatformService.getByIdFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Social platform fetched successfully',
    data: result,
  });
});

const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SocialPlatformService.updateByIdIntoDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Social platform fetched successfully',
    data: result,
  });
});

const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await SocialPlatformService.deleteByIdFromDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Social platform fetched successfully',
    data: result,
  });
});

export const SocialPlatformController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
};
