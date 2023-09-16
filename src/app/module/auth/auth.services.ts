import { User } from '@prisma/client';
import { prisma } from '../../../shared/prisma';
import bcrypt from 'bcrypt';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import { errorlogger, logger } from '../../../shared/logger';
import nodemailer from 'nodemailer';
import randomstring from 'randomstring';

const sendResetPasswordWithMail = (
  name: string,
  email: string,
  token: string
) => {
  const transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: 25,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
  });

  const mailOptions = {
    from: config.emailUser,
    to: email,
    subject: 'Reset your Job-Portal website password',
    html:
      '<h3>Dear honorable user ' +
      name +
      ',</h3><p>Please click on the following link to <a href ="http://localhost:5000/api/v1/auth/reset-password/?token=' +
      token +
      '"> reset your password </a></p>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      errorlogger.error('Error sending email:', error);
    } else {
      logger.info('Email sent:', info.response);
    }
  });
};

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
    accessToken,
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

const forgetPassword = async (email: string) => {
  const user = await prisma.user.findFirst({ where: { email: email } });

  if (user) {
    const resetToken = randomstring.generate();
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        token: resetToken,
      },
    });
    const name = user.firstName + ' ' + user?.lastName;
    sendResetPasswordWithMail(name, user.email, resetToken);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "The user doesn't exist");
  }
};

const resetPassword = async (token: string | undefined, password: string) => {
  const isUserExist = await prisma.user.findFirst({ where: { token: token } });

  if (isUserExist) {
    password = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
    console.log(password);

    await prisma.user.update({
      where: {
        id: isUserExist.id,
      },
      data: {
        password: password,
        token: '',
      },
    });
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This token has been expired');
  }
};

export const AuthService = {
  signup,
  login,
  forgetPassword,
  resetPassword,
};
