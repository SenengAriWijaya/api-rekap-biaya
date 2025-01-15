import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const access_token_secret = process.env.ACCESS_TOKEN_SECRET || "access-secret";
const refresh_token_secret =
  process.env.REFRESH_TOKEN_SECRET || "refresh-secret";

// Generate Access Token

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, username: user.username },
    access_token_secret,
    {
      expiresIn: "15m",
    }
  );
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign(                                                                                                                                                                                                                                                                                                                                                                                        
    { id: user.id, username: user.username },
    refresh_token_secret,
    {
      expiresIn: "1d",
    }
  );
};

// Verify Token
const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

export { generateAccessToken, generateRefreshToken, verifyToken };
