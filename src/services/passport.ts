import 'dotenv/config';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import prisma from './prisma';
import { comparePassword } from '../helpers/password';

// Local Strategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      // try {
      //   const user = await prisma.user.findUnique({ where: { email } });
      //   if (!user) return done(null, false, { message: 'Incorrect email.' });
      //   const isValid = await comparePassword(password, user.password);
      //   if (!isValid)
      //     return done(null, false, { message: 'Incorrect password.' });
      //   return done(null, user);
      // } catch (err) {
      //   return done(err);
      // }
    }
  )
);

// JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET!,
    },
    async (jwtPayload, done) => {
      // try {
      //   const user = await prisma.user.findUnique({
      //     where: { id: jwtPayload.id },
      //   });
      //   if (!user) return done(null, false);
      //   return done(null, user);
      // } catch (err) {
      //   return done(err, false);
      // }
    }
  )
);

// OAuth2 Strategy
passport.use(
  new OAuth2Strategy(
    {
      authorizationURL: 'https://provider.com/oauth2/authorize',
      tokenURL: 'https://provider.com/oauth2/token',
      clientID: process.env.OAUTH_CLIENT_ID!,
      clientSecret: process.env.OAUTH_CLIENT_SECRET!,
      callbackURL: '/auth/oauth2/callback',
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      // Implement user lookup/creation logic here
      // Example: find or create user in DB
      return done(null, { accessToken, profile });
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  // try {
  //   const user = await prisma.user.findUnique({ where: { id } });
  //   done(null, user);
  // } catch (err) {
  //   done(err);
  // }
});

export default passport;
