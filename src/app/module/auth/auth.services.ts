import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import bcrypt from 'bcrypt';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';

const signup = async (payload: User) => {
  if (payload?.password) {
    const hashedPassword = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_rounds)
    );
    payload.password = hashedPassword;
  }

  const result = await prisma.user.create({
    data: payload,
  });

  const { id: userId, email: userEmail, role: userRole } = result;

  const accessToken = jwtHelpers.createToken(
    {
      userId,
      userEmail,
      userRole,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    result,
    accessToken
  };
};

const login = async (payload: Partial<User>) => {
  const { email, password } = payload;

  const isExistUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not exist!');
  }

  const isPasswordMatch = await bcrypt.compare(
    password as string,
    isExistUser.password
  );

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password not matched');
  }

  const { id: userId, email: userEmail, role: userRole } = isExistUser;

  const accessToken = jwtHelpers.createToken(
    {
      userId,
      userEmail,
      userRole,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    {
      userId,
      userEmail,
      userRole,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  signup,
  login,
};
