import { verifyToken } from "../utils/jwt_auth.js";

const authentication = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "access token required!" });

  try {
    const user = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ err: "Invalid or expired token." });
  }
};

export { authentication };
