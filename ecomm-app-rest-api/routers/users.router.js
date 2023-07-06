import express from "express";
import {
  getAllUsers,
  getUserById,
  login,
  singup,
  updateUser,
} from "../controllers/users.controllers.js";
import { authUser } from "../middlewares/user.autherization.js";

const usersRouter = express.Router({ mergeParams: true });

usersRouter.get("/", authUser, getAllUsers);
usersRouter.get("/:user_id", authUser, getUserById);
usersRouter.put("/:user_id", authUser, updateUser);
usersRouter.post("/login", login);
usersRouter.post("/signup", singup);

export default usersRouter;
