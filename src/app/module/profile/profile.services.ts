import { UserProfile } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { prisma } from '../../../shared/prisma';
import { IProfileUserRequest } from './profile.interface';

const insertIntoDB = async (
  data: IProfileUserRequest,
  authUserId: string
): Promise<UserProfile> => {
  const { education, skillConnection, experience, profile } = data;
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
    for (let i = 0; i < education?.length; i++) {
      await transactionClient.education.create({
        data: {
          title: education[i].title,
          userId: authUserId,
          instituteName: education[i].instituteName,
          startDate: education[i].startDate,
          endDate: education[i].endDate,
          cgpa: education[i].cgpa,
          userProfileUserId: userProfile.userId,
        },
      });
    }

    for (let i = 0; i < experience?.length; i++) {
      await transactionClient.experience.create({
        data: {
          companyName: experience[i].companyName,
          endYear: experience[i].endYear,
          designation: experience[i].designation,
          startYear: experience[i].startYear,
          userId: authUserId,
          present: experience[i].present,
          userProfileUserId: userProfile.userId,
        },
      });
    }

    for (let i = 0; i < skillConnection?.length; i++) {
      await transactionClient.skillConnection.create({
        data: {
          userId: authUserId,
          userProfileUserId: profile?.userId,
          skillId: skillConnection[i].skillId,
        },
      });
    }

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
//--------------
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

    return updatedProfile;
  });

  return result;
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
