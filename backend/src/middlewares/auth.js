import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";

export const adminOnly = async (req, res, next) => {
  const { id } = req.query;

  if (!id) return next(new ErrorHandler("Saale Login kar pahle", 401));

  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Saale fake id deta hai", 401));

  if (user.role !== "admin")
    return next(new ErrorHandler("Saale aukat nahi hai", 401));

  next();
};