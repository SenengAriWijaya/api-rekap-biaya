import { validate } from "../validation/validation.js";
import {
  userLoginValidation,
  userRegisterValidation,
  userRefreshTokenValidation,
  getUserValidation,
  userLogoutValidation,
} from "../validation/user-validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt_auth.js";
import bcrypt from "bcrypt";

const register = async (req) => {
  const user = validate(userRegisterValidation, req);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "username already exists");
  }

  if (!user.repeatPassword) {
    throw new ResponseError(400, "repeat password required!");
  }

  if (user.repeatPassword !== user.password) {
    throw new ResponseError(400, "password and repeatPassword do not match");
  }

  user.password = await bcrypt.hash(user.password, 10);
  delete user.repeatPassword;

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      name: true,
    },
  });
};

const login = async (req) => {
  const validatAccount = validate(userLoginValidation, req);
  const user = await prismaClient.user.findUnique({
    where: {
      username: validatAccount.username,
    },
  });

  if (
    !user ||
    !(await bcrypt.compare(validatAccount.password, user.password))
  ) {
    throw new ResponseError(401, "invalid username or password");
  }
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: {
      refreshToken,
    },
  });

  return {
    name: user.name,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (req, res) => {
  const validateRefreshToken = validate(userRefreshTokenValidation, req);

  console.log(
    `validasi refresh token = ${JSON.stringify(validateRefreshToken)}`
  );

  if (!validateRefreshToken) {
    throw new ResponseError(401, "refresh token is required");
  }

  const user = await prismaClient.user.findFirst({
    where: {
      refreshToken: validateRefreshToken.refreshToken,
    },
  });

  console.log("user: " + JSON.stringify(user));

  if (!user) {
    throw new ResponseError(401, "invalid refresh token");
  }

  const verified = verifyToken(
    validateRefreshToken.refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  console.log(`verfied refresh token ${JSON.stringify(verified)}`);

  if (!verified) {
    throw new ResponseError(401, "invalid refresh token");
  }

  const accessToken = generateAccessToken(user);
  return {
    accessToken: accessToken,
  };
};

const getUserService = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    // include: {
    //   biaya: {
    //     include: {
    //       kebutuhan: true,
    //     },
    //   },
    // },
    select: {
      id: true,
      username: true,
      name: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user not found!");
  }

  return user;
};

const logoutService = async (username) => {
  username = validate(userLogoutValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user not found");
  }

  return prismaClient.user.update({
    where: {
      username: username,
    },
    data: {
      refreshToken: null,
    },
    select: {
      id: true,
      username: true,
      name: true,
      refreshToken: true,
    },
  });
};

export default { register, login, refreshToken, getUserService, logoutService };
