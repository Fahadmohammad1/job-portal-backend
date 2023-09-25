import { z } from 'zod';

const create = z.object({
  body: z.object({
    companyName: z.string({
      required_error: 'companyName is required',
    }),
    designation: z.string({
      required_error: 'designation is required',
    }),
    startYear: z.string({
      required_error: 'startYear is required',
    }),
    present: z.string({
      required_error: 'present is required',
    }),
    endYear: z.string({
      required_error: 'companyName is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    companyName: z.string().optional(),
    designation: z.string().optional(),
    startYear: z.string().optional(),
    present: z.string().optional(),
    endYear: z.string().optional(),
  }),
});

export const ExperienceValidation = {
  create,
  update,
};
