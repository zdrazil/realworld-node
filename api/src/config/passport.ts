import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from 'mongoose';
import { IUser } from '../models';

const User = mongoose.model<IUser>('User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]',
    },
    (email, password, done) => {
      User.findOne({ email: email })
        .then((user) => {
          if (!user || !user.isValidPassword(password)) {
            return done(null, false, {
              message: 'email or password is invalid',
            });
          }
          return done(null, user);
        })
        .catch(done);
    },
  ),
);
