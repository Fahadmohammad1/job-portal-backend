import { Education, UserProfile } from '@prisma/client';

export type IProfileUserRequest = {
  profile: UserProfile;
  education: Education;
};

export type IProfileUserUpdateRequest = {
  profile?: UserProfile;
  education?: Education;
};
