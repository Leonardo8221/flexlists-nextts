import { JWT_SECRET, JWT_TOKEN_EXPIRED_IN, JWT_REFRESH_TOKEN_EXPIRED_IN } from "./secrets";
import * as jwt from "jsonwebtoken";
export type TokenPayload = {
    user?: { userId: number, userName: string, email: string, systemRole: string, firstName: string, lastName: string };
    keys?: string[];
};
export async function createJwtToken(payload: TokenPayload): Promise<string> {
    return jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: `${JWT_TOKEN_EXPIRED_IN}s` }
    )
}
export async function createJwtRefreshToken(payload: TokenPayload): Promise<string> {
    return jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: `${JWT_REFRESH_TOKEN_EXPIRED_IN}s` }
    )
}