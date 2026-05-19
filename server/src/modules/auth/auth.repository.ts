import ApiError from "#utils/ApiError.js";
import AuthModel, { type IAuth } from "./Auth.model.js";

const getUserWithPasswordByEmail = async (
  email: IAuth["email"],
): Promise<IAuth> => {
  const authResponse = await AuthModel.findOne({ email }).select("+password");

  if (!authResponse) {
    throw new ApiError(404, "User not found");
  }

  return authResponse as IAuth;
};

const checkAuthExists = async (auth: Partial<IAuth>): Promise<Boolean> => {
  const userExists = await AuthModel.findOne(auth);
  return !!userExists;
};

const createAuth = async (auth: Partial<IAuth>): Promise<IAuth> => {
  const authResponse = await AuthModel.create(auth);
  if (!authResponse) throw new ApiError(500, "Error creating auth");
  return authResponse as IAuth;
};

const findUserByEmailAndUpdate = async (
  email: IAuth["email"],
  update: any,
): Promise<IAuth> => {
  const authResponse = await AuthModel.findOneAndUpdate({ email }, update, {
    new: true,
  });
  if (!authResponse) throw new ApiError(404, "User not found");
  return authResponse as IAuth;
};

const getAuthById = async (authId: IAuth["_id"]): Promise<IAuth> => {
  const authResponse = await AuthModel.findById(authId);
  if (!authResponse) throw new ApiError(404, "User not found");
  return authResponse as IAuth;
};

export default {
  getUserWithPasswordByEmail,
  checkAuthExists,
  createAuth,
  findUserByEmailAndUpdate,
  getAuthById
};
