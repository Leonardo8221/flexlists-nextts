import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth2";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../utils/secrets";
import { createUser, getUser } from "src/repositories/userRepository";
import { createJwtRefreshToken, createJwtToken } from "src/utils/tokenUtils";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const existUser = await getUser({ where: { userName: { equals: profile.email } } });
            if (!existUser) {
              // create new user
              var firstName : string = '';
              var lastName : string = ''
              var displayName = profile.displayName as string;
              if(displayName)
              {
                 var space = displayName.indexOf(" ");
                 firstName = displayName.substring(0, space);
                 lastName = displayName.substring(space + 1);
              }
              var newUser = await createUser(profile.email,firstName,lastName,"","","",1);
              const token = await createJwtToken(newUser.id.toString(),newUser.userName,firstName,lastName);
              const refressToken = await createJwtRefreshToken(newUser.id.toString(),newUser.userName);
              done(null, {userId:newUser.id,firstName:firstName,lastName:lastName,token:token,refressToken:refressToken}, { message: "Auth successful" });
            } else {
              // login existing user
              const token = await createJwtToken(existUser.id.toString(),existUser.userName,existUser.firstName,existUser.lastName);
              const refressToken = await createJwtRefreshToken(existUser.id.toString(),existUser.userName);
              done(null, {userId:existUser.id,firstName:existUser.firstName,lastName:existUser.lastName,token:token,refressToken:refressToken}, { message: "Auth successful" });
            }
          } catch (err) {
            console.error(err);
            done(err, false, { message: "Internal server error" });
          }
    }
  )
);