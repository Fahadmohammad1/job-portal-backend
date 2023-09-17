import { z } from 'zod';

const createJobPost = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    minSalary: z.number({
      required_error: 'Minimum salary is required',
    }),
    maxSalary: z.number({
      required_error: 'Maximum salary is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    responsibility: z.string({
      required_error: 'Responsibility is required',
    }),
    requirements: z.string({
      required_error: 'Requirements is required',
    }),
    vacancy: z.string({
      required_error: 'Vacancy is required',
    }),
    deadline: z.string({
      required_error: 'Deadline is required',
    }),
    categoryId: z.string({
      required_error: 'Category id is required',
    }),
    extraInfo: z.string().optional(),
  }),
});


const updateJobPost = z.object({
  body: z.object({
    title: z.string().optional(),
    minSalary: z.number().optional(),
    maxSalary: z.number().optional(),
    description: z.string().optional(),
    responsibility: z.string().optional(),
    requirements: z.string().optional(),
    vacancy: z.string().optional(),
    deadline: z.date().optional(),
    categoryId: z.string().optional(),
    extraInfo: z.string().optional(),
  }),
});



export const JobPostValidation = {
    createJobPost,
    updateJobPost
}