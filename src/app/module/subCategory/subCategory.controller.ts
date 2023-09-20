import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { SubCategoryServices } from './subCategory.services';

const createSubCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await SubCategoryServices.createSubCategory(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub category created successfully',
    data: result,
  });
});

const getAllSubCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await SubCategoryServices.getAllSubCategory();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub categories retrieved successfully',
    data: result,
  });
});

const getSingleSubCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await SubCategoryServices.getSingleSubCategory(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub category retrieved successfully',
    data: result,
  });
});

const updateSubCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await SubCategoryServices.updateSubCategory(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub category updated successfully',
    data: result,
  });
});

const deleteSubCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await SubCategoryServices.deleteSubCategory(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub category deleted successfully',
    data: result,
  });
});

export const SubCategoryController = {
  createSubCategory,
  getAllSubCategory,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
