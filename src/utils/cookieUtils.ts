import { setCookie , deleteCookie, getCookie} from "cookies-next";

export function setCookieToken(token:string,req:any,res:any)
{
    setCookie("token", token, {
        req,
        res,
      });
}
export function getCookieToken(req:any,res:any) : string
{
    return getCookie("token", {
        req,
        res,
      }) as string;
}
export function setCookieRefreshToken(refreshToken:string,req:any,res:any)
{
    setCookie("refreshToken", refreshToken, {
        req,
        res,
      });
}
export function getCookieRefreshToken(req:any,res:any) : string
{
    return getCookie("refreshToken", {
        req,
        res,
      }) as string;
}
export function removeCookie(key:string,req:any,res:any)
{
    deleteCookie(key,{
        req,
        res,
      });
}