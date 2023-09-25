import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ServiceServices } from './service.services';
import pick from '../../../shared/pick';
import { ServiceFilterableFields } from './service.constant';
import { paginationFields } from '../../../constants/pagination';

const createServiceIntoDB = catchAsync(async (req: Request, res: Response) => {
  const user = (req as JwtPayload).user;
  const result = await ServiceServices.createServiceIntoDB(
    user.userId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service created successfully',
    data: result,
  });
});

const getAllServiceFromDB = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ServiceFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await ServiceServices.getAllServiceFromDB(filter, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service fetched successfully',
    data: result,
  });
});

const getServiceByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await ServiceServices.getServiceByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'service fetched successfully',
    data: result,
  });
});

const updateServiceByIdIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ServiceServices.updateServiceByIdIntoDB(
      req.params.id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'service updated successfully',
      data: result,
    });
  }
);

const deleteServiceByIdFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ServiceServices.deleteServiceByIdFromDB(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'service deleted successfully',
      data: result,
    });
  }
);

export const ServiceController = {
  createServiceIntoDB,
  updateServiceByIdIntoDB,
  deleteServiceByIdFromDB,
  getAllServiceFromDB,
  getServiceByIdFromDB,
};
