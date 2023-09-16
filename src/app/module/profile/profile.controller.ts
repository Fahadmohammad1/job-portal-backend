import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await ProfileService.insertIntoDB(req.body, user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile create successfully',
    data: result,
  });
});
const myProfileFromDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const result = await ProfileService.myProfileFromDB(user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetch successfully',
    data: result,
  });
});
const updateMyProfileIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as any).user;
    const result = await ProfileService.updateMyProfileIntoDB(
      user.userId,
      user.userId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile update successfully',
      data: result,
    });
  }
);
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetch successfully',
    data: result,
  });
});
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.deleteByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile delete successfully',
    data: result,
  });
});

export const ProfileController = {
  insertIntoDB,
  myProfileFromDB,
  updateMyProfileIntoDB,
  deleteByIdFromDB,
  getByIdFromDB,
};
