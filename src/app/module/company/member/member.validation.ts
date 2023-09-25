import { z } from 'zod';

const create = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    joiningDate: z.string({
      required_error: 'joiningDate is required',
    }),
    role: z.string({
      required_error: 'role is required',
    }),
    pageId: z.string({
      required_error: 'pageId is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    email: z.string().optional(),
    joiningDate: z.string().optional(),
    role: z.string().optional(),
    pageId: z.string(),
  }),
});

export const MemberValidation = {
  create,
  update,
};
