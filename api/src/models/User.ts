import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import crypto from 'crypto';

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  bio: string;
  image: string;
  hash: string;
  salt: string;
  setPassword: (password: string) => void;
  isValidPassword: (password: string) => boolean;
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

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

UserSchema.methods.isValidPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

mongoose.model<IUser>('User', UserSchema);
