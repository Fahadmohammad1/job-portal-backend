import { z } from 'zod';

const createSubCategory = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Title is required',
    }),
    categoryId: z.string({
      required_error: 'Category id is required',
    }),
  }),
});

const updateSubCategory = z.object({
  body: z.object({
    name: z.string().optional(),
    categoryId: z.string().optional(),
  }),
});

export const SubCategoryValidation = {
  createSubCategory,
  updateSubCategory,
};
