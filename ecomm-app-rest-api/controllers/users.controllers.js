import { hash, compare } from "bcrypt";
import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import { JWT_SIGN_SECRET } from "../utils.js";
import jsonwebtoken from "jsonwebtoken";
const { sign, decode, verify } = jsonwebtoken;
const saltRounds = 10;

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    console.log("login() - email: " + email);
    // password: 123, hash:  '$2b$10$M0PhOC.s9hModFr93YhBDuB9JJahxLzPLHm71BK58PBSG0HnlJlWm',
    const user = await UserModel.findOne({ email: email });

    console.log("user found from db: ", user);
    //if user does not exists, return by sending response
    if (user == null || user == undefined) {
      res.json(createInvalidUserResponseData());
    }

    //if user exisits then compare hash and send resonse
    if (user && isMatchedPasswordHash(password, user)) {
      console.log("User's password hash is matched.");
      res.json(createJWTokenAndResponseData(user));
    } else {
      console.log("No user matched.");
      res.json(createInvalidUserResponseData());
    }
  } catch (error) {
    next(error);
  }
}

export async function singup(req, res, next) {
  try {
    console.log("singup - body: ", req.body);
    const newUser = new UserModel(req.body);
    const isUserExist = await isUserEmailExistInDb(newUser);
    if (!isUserExist) {
      ///////
      const passHash = await hash(newUser.password, saltRounds);
      newUser.password = passHash;
      //////
      newUser._id = new mongoose.Types.ObjectId();
      const result = await newUser.save();
      ////////////
      console.log("new user saved result: ", result);
      res.json(createJWTokenAndResponseData(result));
    } else {
      res.json({
        success: false,
        data: { msg: "Email is aready used!!!" },
      });
    }
  } catch (error) {
    next(error);
  }
}

export async function getAllUsers(req, res, next) {
  try {
    console.log("getAllUsers()");
    const result = await UserModel.find({});
    console.log("getAllUsers: ", result);
    res.json({ sucess: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getUserById(req, res, next) {
  try {
    const { user_id } = req.params;
    console.log("getUserById() - user_id: ", user_id);
    const result = await UserModel.find({ _id: user_id });
    res.json({ sucess: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    // if (!req.user) {
    //   throw new Error("JWT verification is failed. JWT token is required.");
    // }
    const { user_id } = req.params;
    console.log("udateUser() - user_id: ", user_id);
    const result = await UserModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(user_id) },
      { ...req.body },
      { new: true }
    );
    res.json({ sucess: true, data: result });
  } catch (error) {
    next(error);
  }
}

function createJWTokenAndResponseData(user) {
  console.log("createJWTokenAndResponseData()", user);

  const userTokenInfo = {
    _id: user._id,
    email: user.email,
    fullname: user.fullname,
  };

  userTokenInfo.jwt = sign({ ...userTokenInfo }, JWT_SIGN_SECRET);

  return {
    success: true,
    data: userTokenInfo,
  };
}

function createInvalidUserResponseData() {
  return { success: false, data: { msg: "Invalid email or password." } };
}

async function isMatchedPasswordHash(password, user) {
  try {
    return await compare(password, user.password);
  } catch (err) {
    next(err);
  }
}

async function isUserEmailExistInDb(newUser) {
  try {
    const oldUser = await UserModel.findOne({ email: newUser.email });
    console.log("isUserEmailExistsInDb() - oldUser", oldUser);
    if (oldUser != null && oldUser.email === newUser.email) {
      console.log("email exists");
      return true;
    } else {
      return false;
    }
  } catch (err) {
    next(err);
  }
}
