import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../../constants/pagination';
import catchAsync from '../../../../shared/catchAsync';
import pick from '../../../../shared/pick';
import sendResponse from '../../../../shared/sendResponse';
import { MemberFilterableFields } from './member.constant';
import { MemberMemberService } from './member.services';

const createMemberIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberMemberService.createMemberIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Member created successfully',
    data: result,
  });
});

const getAllMemberFromDB = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, MemberFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await MemberMemberService.getAllMemberFromDB(filter, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Member fetched successfully',
    data: result,
  });
});

const getMemberByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const result = await MemberMemberService.getMemberByIdFromDB(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Member fetched successfully',
    data: result,
  });
});

const updateMemberByIdIntoDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await MemberMemberService.updateMemberByIdIntoDB(
      req.params.id,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Member updated successfully',
      data: result,
    });
  }
);

const deleteMemberByIdFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await MemberMemberService.deleteMemberByIdFromDB(
      req.params.id
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Member deleted successfully',
      data: result,
    });
  }
);

export const MemberController = {
  createMemberIntoDB,
  updateMemberByIdIntoDB,
  deleteMemberByIdFromDB,
  getAllMemberFromDB,
  getMemberByIdFromDB,
};
