import { z } from 'zod';

const create = z.object({
  body: z.object({
    profile: z.object({
      dateOfBirth: z.string({
        required_error: 'dateOfBirth is required',
      }),
      maritualStatus: z.string({
        required_error: 'maritualStatus is required',
      }),
      image: z.string({
        required_error: 'image is required',
      }),
      about: z.string({
        required_error: 'about is required',
      }),
      nationality: z.string({
        required_error: 'nationality is required',
      }),

      location: z.string({
        required_error: 'location is required',
      }),
    }),
    education: z.object({
      title: z.string({
        required_error: 'title is required',
      }),
      instituteName: z.string({
        required_error: 'instituteName is required',
      }),
      startDate: z.string({
        required_error: 'startDate is required',
      }),
      endDate: z.string({
        required_error: 'endDate is required',
      }),
      cgpa: z.number({
        required_error: 'title is required',
      }),
    }),
  }),
});

const update = z.object({
  body: z.object({
    profile: z.object({
      dateOfBirth: z.string().optional(),
      maritualStatus: z.string().optional(),
      image: z.string().optional(),
      about: z.string().optional(),
      nationality: z.string().optional(),
      location: z.string().optional(),
    }),
    education: z.object({
      title: z.string().optional(),
      instituteName: z.string().optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      cgpa: z.number().optional(),
    }),
  }),
});

export const ProfileValidation = {
  create,
  update,
};
