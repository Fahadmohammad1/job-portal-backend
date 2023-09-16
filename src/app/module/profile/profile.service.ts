import { UserProfile } from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';
import { IProfileUserRequest } from './profile.interface';

const insertIntoDB = async (
  data: IProfileUserRequest,
  authUserId: string
): Promise<UserProfile> => {
  const result = await prisma.$transaction(async transactionClient => {
    data.profile.userId = authUserId;
    const profile = await transactionClient.userProfile.create({
      data: data.profile,
      include: {
        PlatformConnection: true,
      },
    });
    data.socialConnection.userId = authUserId;
    await transactionClient.platformConnection.create({
      data: data.socialConnection,
    });
    return profile;
  });

  return result;
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
  data: IProfileUserRequest
): Promise<UserProfile | null> => {
  const user = await prisma.userProfile.findFirst({
    where: {
      userId: authUserId,
    },
    include: {},
  });
  if (!user) {
    throw new ApiError(404, 'User Not Found!');
  }
  const result = await prisma.$transaction(async transactionClient => {
    const updatedProfile = await transactionClient.userProfile.update({
      where: { userId: authUserId },
      data: data.profile,
    });

    // await transactionClient.platformConnection.update({
    //   where: { userId:  },
    //   data: data.socialConnection,
    // });

    return updatedProfile;
  });

  return result;
};

export const ProfileService = {
  insertIntoDB,
  myProfileFromDB,
  updateMyProfileIntoDB,
};
