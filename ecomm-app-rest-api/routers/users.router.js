import express from "express";
import {
  getAllUsers,
  getUserById,
  login,
  singup,
  updateUser,
} from "../controllers/users.controllers.js";

const usersRouter = express.Router({ mergeParams: true });

usersRouter.get("/", getAllUsers);
usersRouter.get("/:user_id", getUserById);
usersRouter.put("/:user_id", updateUser);
usersRouter.post("/login", login);
usersRouter.post("/signup", singup);

export default usersRouter;
