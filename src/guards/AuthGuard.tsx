import { useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authService } from 'src/services/auth.service';
import { isSucc } from 'src/models/ApiResponse';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const url = router.asPath;
  useEffect(() => {
    async function initialize() {
      const path = url.split('/')[1];
      var isValidated:Boolean = false;
      try
      {
       var verifyTokenResponse = await authService.verifyToken();
       isValidated = isSucc(verifyTokenResponse);
      }
      catch(error)
      {
        console.log('unauthorize')
      }
      
      if(path == 'auth'||path == '')
      {
         if(isValidated)
         {
          router.push({
            pathname: '/dashboard'
          });
         }
      }
      else
      {
         if(!isValidated)
         {
          router.push({
            pathname: '/'
          });
         }
      }
    }

    initialize();
  }, [router, url]);
  return <>{children}</>;
}
