import mongoose from "mongoose";

export interface IAuth {
  email: string;
  userId: string;
  password: string;
  tokenVersion: number;
  userName: string;
}

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  userName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    select: false,
  },

  tokenVersion: {
    type: Number,
    default: 0,
  },
});

const AuthModel = mongoose.model<IAuth>("auth", authSchema);

export default AuthModel;
