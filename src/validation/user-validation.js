import Joi from "joi";

const userRegisterValidation = Joi.object({
  username: Joi.string().min(6).max(100).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9@*#%!&]{3,30}$")),
  repeatPassword: Joi.ref("password"),
  name: Joi.string().max(100).required(),
});

const userLoginValidation = Joi.object({
  username: Joi.string().min(6).max(100).required(),
  password: Joi.string().min(8).max(150).required(),
});

const userRefreshTokenValidation = Joi.object({
  refreshToken: Joi.string().max(255),
});

const getUserValidation = Joi.string().max(100).required();

const userLogoutValidation = Joi.string().max(100).required();

export {
  userRegisterValidation,
  userLoginValidation,
  userRefreshTokenValidation,
  getUserValidation,
  userLogoutValidation,
};
