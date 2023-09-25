import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../../constants/pagination';
import catchAsync from '../../../../shared/catchAsync';
import pick from '../../../../shared/pick';
import sendResponse from '../../../../shared/sendResponse';
import { LocationFilterableFields } from './location.constant';
import { LocationLocationService } from './location.services';

const createLocationIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await LocationLocationService.createLocationIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Location created successfully',
    data: result,
  });
});

const getAllLocationFromDB = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, LocationFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await LocationLocationService.getAllLocationFromDB(
    filter,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Location fetched successfully',
    data: result,
  });
});

const getLocationByIdFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await LocationLocationService.getLocationByIdFromDB(
      req.params.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Location fetched successfully',
      data: result,
    });
  }
);

const updateLocationByIdIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await LocationLocationService.updateLocationByIdIntoDB(
      req.params.id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Location updated successfully',
      data: result,
    });
  }
);

const deleteLocationByIdFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await LocationLocationService.deleteLocationByIdFromDB(
      req.params.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Location deleted successfully',
      data: result,
    });
  }
);

export const LocationController = {
  createLocationIntoDB,
  updateLocationByIdIntoDB,
  deleteLocationByIdFromDB,
  getAllLocationFromDB,
  getLocationByIdFromDB,
};
