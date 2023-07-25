import { UserProfile } from "src/models/UserProfile";

export const setUserProfile = (userProfile: UserProfile|undefined) => ({
    type: 'SET_USER_PROFILE',
    payload: userProfile
  });