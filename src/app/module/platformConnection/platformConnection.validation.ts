import { z } from 'zod';

const create = z.object({
  body: z.object({
    platformId: z.string({
      required_error: 'platformId is required',
    }),
    link: z.string({
      required_error: 'link is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    platformId: z.string().optional(),
    link: z.string().optional(),
  }),
});

export const PlatformConnectionValidation = {
  create,
  update,
};
