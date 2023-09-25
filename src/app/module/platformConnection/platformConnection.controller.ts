import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PlatformConnectionService } from './PlatformConnection.services';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  const result = await PlatformConnectionService.insertPlatformConnectionIntoDB(
    req.body,
    user.userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PlatformConnection created successfully',
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result =
    await PlatformConnectionService.getAllPlatformConnectionFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PlatformConnection fetched successfully',
    data: result,
  });
});
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result =
    await PlatformConnectionService.getPlatformConnectionByIdFromDB(
      req.params.id
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PlatformConnection fetched successfully',
    data: result,
  });
});
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result =
    await PlatformConnectionService.deletePlatformConnectionByIdFromDB(
      req.params.id
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PlatformConnection deleted successfully',
    data: result,
  });
});
const updateByIdIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result =
    await PlatformConnectionService.updatePlatformConnectionByIdIntoDB(
      req.params.id,
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PlatformConnection updated successfully',
    data: result,
  });
});

export const PlatformConnectionController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateByIdIntoDB,
  deleteByIdFromDB,
};
