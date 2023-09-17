import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.services';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  console.log(req.body);
  const result = await ProfileService.insertIntoDB(req.body, user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile create successfully',
    data: result,
  });
});
const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetched successfully',
    data: result,
  });
});
const myProfileFromDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  console.log(user);
  const result = await ProfileService.myProfileFromDB(user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetched successfully',
    data: result,
  });
});
const updateMyProfileIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const user = (req as JwtPayload).user;
    const result = await ProfileService.updateMyProfileIntoDB(
      user.userId,
      user.userId
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile updated successfully',
      data: result,
    });
  }
);
const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.getByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile fetched successfully',
    data: result,
  });
});
const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ProfileService.deleteByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile deleted successfully',
    data: result,
  });
});

export const ProfileController = {
  insertIntoDB,
  myProfileFromDB,
  updateMyProfileIntoDB,
  deleteByIdFromDB,
  getByIdFromDB,
  getAllFromDB,
};
