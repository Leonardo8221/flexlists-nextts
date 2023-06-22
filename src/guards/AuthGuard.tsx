import { useState, ReactNode, useEffect } from 'react';
import  { Router, useRouter } from 'next/router';
import { authService } from 'src/services/auth.service';
import { isSucc } from 'src/models/ApiResponse';
import { PATH_MAIN } from 'src/routes/paths';
import { setLoading } from 'src/redux/actions/adminAction';
import { connect } from 'react-redux';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

export function AuthGuard({ children,isLoading,setLoading }: AuthGuardProps) {
  const router = useRouter();
  const url = router.asPath;
  useEffect(() => {
    async function initialize() {
      const path = url.split('/')[1];
     

      if (path == 'auth' || path == '') {
        var isValidated: Boolean = false;
        try {
          var verifyTokenResponse = await authService.verifyToken();
          isValidated = isSucc(verifyTokenResponse) && verifyTokenResponse.data && verifyTokenResponse.data.isValidated;
        }
        catch (error) {
          console.log('unauthorize')
        }
        if (isValidated) {
          await router.push({
            pathname: PATH_MAIN.views
          });
        }
      }
      // else {
      //   if (!isValidated) {
      //     await router.push({
      //       pathname: '/'
      //     });
      //   }
      // }

      
    }
    
    initialize();
  }, [router, url]);
  useEffect(() => {
    const startLoading = () => {
      setLoading(true);
    };

    const stopLoading = () => {
      setLoading(false);
    };
    
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);
    Router.events.on('routeChangeError', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
      Router.events.off('routeChangeError', stopLoading);
    };
  }, []);

  return <>{children}</>;
}

const mapStateToProps = (state: any) => ({
  isLoading: state.admin.isLoading
});
const mapDispatchToProps = { 
  setLoading
};
export default connect(mapStateToProps, mapDispatchToProps)(AuthGuard);

