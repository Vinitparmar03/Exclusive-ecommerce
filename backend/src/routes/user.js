import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSession,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  saveDetails,
} from "../controllers/user.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/register-user", registerUser);
app.post("/login-user", loginUser);
app.post("/logout", logoutUser);
app.post("/save-details", saveDetails);

app.get("/all", adminOnly, getAllUsers);

app.route("/:id").get(getUser).delete(adminOnly, deleteUser);

export default app;
