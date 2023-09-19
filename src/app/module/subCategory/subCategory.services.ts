import { SubCategory } from '@prisma/client';
import { prisma } from '../../../shared/prisma';

const createSubCategory = async (payload: SubCategory): Promise<SubCategory> => {
  const result = await prisma.subCategory.create({
    data: payload,
  });

  return result;
};

const getAllSubCategory = async (): Promise<SubCategory[]> => {
  const result = await prisma.subCategory.findMany();

  return result;
};

const getSingleSubCategory = async (id: string): Promise<SubCategory | null> => {
  const result = await prisma.subCategory.findFirst({
    where: {
      id,
    },
  });

  return result;
};

const updateSubCategory = async (
  id: string,
  payload: Partial<SubCategory>
): Promise<SubCategory | null> => {
  const result = await prisma.subCategory.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteSubCategory = async (id: string): Promise<SubCategory | null> => {
  const result = await prisma.subCategory.delete({
    where: {
      id,
    },
  });

  return result;
};

export const SubCategoryServices = {
  createSubCategory,
  getAllSubCategory,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
