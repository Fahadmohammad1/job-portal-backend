import { z } from 'zod';

const createPage = z.object({
  body: z.object({
    logo: z.string().optional(),
    coverPic: z.string().optional(),
    title: z.string({
      required_error: 'Title is required',
    }),
    bio: z.string().optional(),
    description: z.string({
      required_error: 'Description is required',
    }),
    locationId: z.string({
      required_error: 'Location is required',
    }),
    address: z.string({
      required_error: 'Required id is required',
    }),
    contactNo: z.string({
      required_error: 'Contact number is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    websiteURL: z.string().optional(),
    foundedDate: z.string({
      required_error: 'Founded date is required',
    }),
  }),
});

export const PageValidation = {
  createPage,
};
