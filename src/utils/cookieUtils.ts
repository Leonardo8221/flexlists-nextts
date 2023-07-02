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