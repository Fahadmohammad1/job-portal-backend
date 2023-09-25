import { Member, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../../interfaces/common';
import { IPaginationOptions } from '../../../../interfaces/pagination';
import { prisma } from '../../../../shared/prisma';
import { MemberSearchableFields } from './member.constant';
import { IMemberFilter } from './member.interface';

const createMemberIntoDB = async (data: Member): Promise<Member> => {
  return await prisma.member.create({
    data,
  });
};

const getAllMemberFromDB = async (
  filter: IMemberFilter,
  options: IPaginationOptions
): Promise<IGenericResponse<Member[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filter;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: MemberSearchableFields.map(filed => ({
        [filed]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereConditions: Prisma.MemberWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.member.findMany({
    skip,
    take: limit,
    where: whereConditions,

    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            // createdAt: 'desc',
          },
  });

  const total = await prisma.member.count({ where: whereConditions });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};
const getMemberByIdFromDB = async (id: string): Promise<Member | null> => {
  return prisma.member.findFirst({
    where: { id },
  });
};

const updateMemberByIdIntoDB = async (
  id: string,
  data: Partial<Member>
): Promise<Member | null> => {
  return await prisma.member.update({
    where: { id },
    data,
  });
};

const deleteMemberByIdFromDB = async (id: string): Promise<Member | null> => {
  return await prisma.member.delete({ where: { id } });
};

export const MemberMemberService = {
  createMemberIntoDB,
  getAllMemberFromDB,
  getMemberByIdFromDB,
  updateMemberByIdIntoDB,
  deleteMemberByIdFromDB,
};
