import { z } from 'zod';

const create = z.object({
  body: z.object({
    country: z.string({
      required_error: 'country is required',
    }),
    division: z.string({
      required_error: 'division is required',
    }),
    district: z.string({
      required_error: 'district is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    country: z.string().optional(),
    division: z.string().optional(),
    district: z.string().optional(),
  }),
});

export const LocationValidation = {
  create,
  update,
};
