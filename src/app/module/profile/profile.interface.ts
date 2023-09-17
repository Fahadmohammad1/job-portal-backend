import { Education, Experience, UserProfile } from '@prisma/client';

export type IProfileUserRequest = {
  profile: UserProfile;
  education: Education[];
  experience: Experience[];
  skillConnection: {
    skillId: string;
    userId?: string;
    userProfileUserId?: string;
  }[];
};
