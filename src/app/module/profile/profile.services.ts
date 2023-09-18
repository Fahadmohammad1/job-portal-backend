import { UserProfile } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';
import { IProfileUserRequest } from './profile.interface';

const insertIntoDB = async (
  data: IProfileUserRequest,
  authUserId: string
): Promise<UserProfile> => {
  const { education, profile } = data;
  const user = await prisma.user.findFirst({
    where: {
      id: authUserId,
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.OK, 'User not found');
  }
  const result = await prisma.$transaction(async transactionClient => {
    data.profile.userId = authUserId;
    const userProfile = await transactionClient.userProfile.create({
      data: profile,
      include: {
        PlatformConnection: true,
      },
    });

    education.userId = authUserId;
    education.userProfileUserId = authUserId;
    await transactionClient.education.create({
      data: education,
    });

    return userProfile;
  });

  return result;
};

const getAllFromDB = async (): Promise<UserProfile[]> => {
  return await prisma.userProfile.findMany({
    include: {
      PlatformConnection: true,
      Experience: true,
      Education: true,
      Project: true,
      Service: true,
      SkillConnection: true,
    },
  });
};
const myProfileFromDB = async (
  authUserId: string
): Promise<UserProfile | null> => {
  return await prisma.userProfile.findFirst({
    where: {
      userId: authUserId,
    },
    include: {
      PlatformConnection: true,
      Experience: true,
      Education: true,
      Project: true,
      Service: true,
      SkillConnection: true,
    },
  });
};

const updateMyProfileIntoDB = async (
  authUserId: string,
  data: Partial<IProfileUserRequest>
): Promise<{ message: string }> => {
  const { profile, education } = data;

  const user = await prisma.user.findFirst({
    where: {
      id: authUserId,
    },
    include: {
      UserProfile: true,
    },
  });
  if (!user) {
    throw new ApiError(404, 'User Not Found!');
  }

  await prisma.$transaction(async transactionClient => {
    if (profile) {
      await transactionClient.userProfile.update({
        where: { userId: authUserId },
        data: profile,
      });
    }
    if (education) {
      await transactionClient.education.update({
        where: {
          id: education.id,
        },
        data: education,
      });
    }
  });

  return {
    message: 'profile updated',
  };
};

const getByIdFromDB = async (id: string): Promise<UserProfile | null> => {
  return await prisma.userProfile.findUnique({
    where: { userId: id },
    include: {
      PlatformConnection: true,
      Experience: true,
      Education: true,
      Project: true,
      Service: true,
      SkillConnection: true,
    },
  });
};
const deleteByIdFromDB = async (id: string): Promise<UserProfile | null> => {
  return await prisma.userProfile.delete({
    where: { userId: id },
    include: {
      PlatformConnection: true,
      Experience: true,
      Education: true,
      Project: true,
      Service: true,
      SkillConnection: true,
    },
  });
};

export const ProfileService = {
  insertIntoDB,
  myProfileFromDB,
  updateMyProfileIntoDB,
  getByIdFromDB,
  deleteByIdFromDB,
  getAllFromDB,
};
