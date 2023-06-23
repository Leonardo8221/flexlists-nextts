import { JWT_SECRET,JWT_TOKEN_EXPIRED_IN,JWT_REFRESH_TOKEN_EXPIRED_IN } from "./secrets";
import * as jwt from "jsonwebtoken";
export async function createJwtToken(userId:string,userName:string,firstName:string,lastName:string):Promise<string>{
    return await jwt.sign(
        { userId: userId, username: userName,firstName:firstName,lastName:lastName },
        JWT_SECRET,
        { expiresIn: `${JWT_TOKEN_EXPIRED_IN}s` }
    )
}
export async function createJwtRefreshToken(userId:string,userName:string):Promise<string>{
    return jwt.sign(
        { userId: userId, username: userName },
        JWT_SECRET,
        { expiresIn: `${JWT_REFRESH_TOKEN_EXPIRED_IN}s` }
    )
}
export function getCookieValue(cookieName: string): string | null {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.startsWith(cookieName + '=')) {
        return cookie.substring(cookieName.length + 1);
      }
    }
    return null;
}   
export function getAuthValidatePayLoad():any{
    try{
        const cookieValue = getCookieValue('authValidate');
        
        if(!cookieValue)
        {
            return {isUserValidated:false,isKeyValidated:false};
        }
        return JSON.parse(decodeURIComponent(cookieValue));
    }
    catch(e){   
    }
    return  {isUserValidated:false,isKeyValidated:false};;
   
    
}