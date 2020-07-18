import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

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
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    bio: String,
    image: String,
    hash: String,
    salt: String,
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

mongoose.model<IUser>('User', UserSchema);
