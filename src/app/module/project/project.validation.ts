import { z } from 'zod';

const create = z.object({
  body: z.object({
    designation: z.string({
      required_error: 'designation is required',
    }),
    projectLink: z.string({
      required_error: 'projectLink is required',
    }),
    image: z.string({
      required_error: 'image is required',
    }),
    description: z.string({
      required_error: 'description is required',
    }),
    endYear: z.string({
      required_error: 'endYear is required',
    }),
    startYear: z.string({
      required_error: 'startYear is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    designation: z.string().optional(),
    projectLink: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    endYear: z.string().optional(),
    startYear: z.string().optional(),
  }),
});

export const ProjectValidation = {
  create,
  update,
};
