import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import bcrypt from 'bcrypt';
import config from '../../../config';

const signup = async (payload: User) => {
  if (payload?.password) {
    const hashedPassword = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_rounds)
    );
    payload.password = hashedPassword;
  }
  console.log(payload);

  const result = await prisma.user.create({
    data: payload,
  });

  return result;
};

export const UserService = {
  signup,
};
