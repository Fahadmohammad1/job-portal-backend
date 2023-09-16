import { PlatformConnection, UserProfile } from '@prisma/client';

export type IProfileUserRequest = {
  profile: UserProfile;
  socialConnection: PlatformConnection;
};
