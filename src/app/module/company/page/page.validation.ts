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

const updatePage = z.object({
  body: z.object({
    logo: z.string().optional(),
    coverPic: z.string().optional(),
    title: z.string().optional(),
    bio: z.string().optional(),
    description: z.string().optional(),
    locationId: z.string().optional(),
    address: z.string().optional(),
    contactNo: z.string().optional(),
    email: z.string().optional(),
    websiteURL: z.string().optional(),
    foundedDate: z.string().optional(),
  }),
});

export const PageValidation = {
  createPage,
  updatePage,
};
