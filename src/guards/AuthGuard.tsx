import { useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authService } from 'src/services/auth.service';
import { isSucc } from 'src/models/ApiResponse';
import { PATH_MAIN } from 'src/routes/paths';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const url = router.asPath;
  useEffect(() => {
    async function initialize() {
      // if(!process.env.NEXT_PUBLIC_USE_DUMMY_DATA||process.env.NEXT_PUBLIC_USE_DUMMY_DATA == 'true')
      // {
      //   return;
      // }
      const path = url.split('/')[1];
      var isValidated: Boolean = false;
      try {
        var verifyTokenResponse = await authService.verifyToken();
        isValidated = isSucc(verifyTokenResponse) && verifyTokenResponse.data && verifyTokenResponse.data.isValidated;
      }
      catch (error) {
        console.log('unauthorize')
      }

      if (path == 'auth' || path == '') {
        if (isValidated) {
          await router.push({
            pathname: PATH_MAIN.views
          });
        }
      }
      else {
        if (!isValidated) {
          await router.push({
            pathname: '/'
          });
        }
      }
    }

    initialize();
  }, [router, url]);
  return <>{children}</>;
}
