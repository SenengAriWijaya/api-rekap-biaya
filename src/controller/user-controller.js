import { prismaClient } from "../app/database.js";
import userServive from "../service/user-servive.js";

const register = async (req, res, next) => {
  try {
    const result = await userServive.register(req.body);
    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userServive.login(req.body);
    res.status(200).json({
      data: result,
      message: "logged in successfully",
      //   accessToken: generateAccessToken,
    });
  } catch (e) {
    next(e);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const result = await userServive.refreshToken(req.body);
    // console.log(req.body);
    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getUserController = async (req, res, next) => {
  try {
    const result = await userServive.getUserService(req.user.username);
    res.status(200).json({
      data: result,
      message: "get data user successfully",
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const result = await userServive.logoutService(req.user.username);
    res.status(200).json({
      data: result,
      message: "Successfully logged out",
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  refreshToken,
  getUserController,
  logout,
};
