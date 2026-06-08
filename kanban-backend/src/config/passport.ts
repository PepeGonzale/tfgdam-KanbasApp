import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from './config';
import { findOrCreateGoogleUser } from '../services/user.service';

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID!,
            clientSecret: config.GOOGLE_CLIENT_SECRET!,
            callbackURL: config.GOOGLE_CALLBACK_URL!,
        },
        async (_accessToken, _refreshToken, profile, done) => {
            try {
                const user = await findOrCreateGoogleUser(profile);
                return done(null, user as any);
            } catch (err) {
                return done(err as Error, undefined);
            }
        }
    )
);

export default passport;
