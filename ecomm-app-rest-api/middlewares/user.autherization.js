import jsonwebtoken from "jsonwebtoken";
const { sign, decode, verify } = jsonwebtoken;
const JWT_SIGN_SECRET = process.env.JWT_SIGN_SECRET;

export const authUser = async (req, res, next) => {
  try {
    //working code: use this middleware in production
    if (req.headers.authorization) {
      console.log("auth user from headers: ", req.headers.authorization);
      const token = req.headers.authorization.split(" ")[1];
      const isVerified = verify(token, JWT_SIGN_SECRET);
      if (isVerified) {
        req.user = decode(token);
        console.log("jwt decoded user: ", req.user);
        //move to next handlers
        next();
      } else {
        //throw new Error("JWT verification is failed. JWT token is required.");
      }
    } else {
      //throw new Error("JWT verification is failed. JWT token is required.");
    }
    //TODO: remove, dev testing
    //for dev skip this verification
    next();
  } catch (error) {
    //TODO: remove, dev testing
    //for dev skip this verification
    next();
    //next(error);
  }
};
