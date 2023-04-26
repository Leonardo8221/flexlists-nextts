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