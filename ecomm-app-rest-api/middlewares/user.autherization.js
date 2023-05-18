import { verify, decode } from "jsonwebtoken";
const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET;

export default async (req, res, next) => {
  try {
    //for dev skip this verification
    //next();
    //working code: use this middleware in production
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const isVerified = verify(token, JWT_SIGN_SECRET);
      if (isVerified) {
        req.user = decode(token);
        console.log("jwt decoded user: ", req.user);
        //move to next handlers
        next();
      } else {
        throw new Error("JWT verification is failed. JWT token is required.");
      }
    } else {
      throw new Error("JWT verification is failed. JWT token is required.");
    }
  } catch (error) {
    next(error);
  }
};
