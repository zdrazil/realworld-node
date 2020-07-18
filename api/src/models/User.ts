import mongoose from "mongoose";

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  bio: string;
  image: string;
  hash: string;
  salt: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: String,
    email: String,
    bio: String,
    image: String,
    hash: String,
    salt: String,
  },
  { timestamps: true },
);

mongoose.model<IUser>("User", UserSchema);
