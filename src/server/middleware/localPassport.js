import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import db from '../../db/models'

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user))

const localStrategy = (username, password, done) => {
  return db.User.verifyLogin(username, password)
    .then((user) => done(null, user))
    .catch((err) => done(null, false, err));
}

passport.use(new LocalStrategy(localStrategy));

export default passport