// material
import { styled } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Typography } from '@mui/material';
// hooks
import useOffSetTop from 'src/hooks/useOffSetTop';
// components
import Logo from 'src/components/logo';
import { MHidden } from 'src/components/@material-extend';
//
import MenuDesktop from './MenuDesktop';
// import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import { useRouter } from 'next/router';
import Link from 'next/link';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.shadows[8]
}));

const LogoStyle = styled('span')(({ theme }) => ({
  display: '-webkit-inline-box',
  textDecoration: 'none',
  fontFamily: 'system-ui',
  fontWeight: 600,
  fontSize: '30px',
  lineHeight: '40px',
  color: '#333333'
}));

const LogoTitleStyle = styled('span')(({ theme }) => ({
  color: '#54A6FB'
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const isOffset = useOffSetTop(100);
  const router = useRouter();
  var pathname = router.pathname;
  const isHome = pathname === '/';
  const gotoSignin = async () => {
    await router.push({
      pathname: '/auth/login'
    })
  }
  const gotoSignup = async () => {
    await router.push({
      pathname: '/auth/register'
    })
  }
  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'white' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: 'background.default',
            height: { md: APP_BAR_DESKTOP - 16 }
          })
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Link href="/">
            <LogoStyle><Logo /><LogoTitleStyle>flex</LogoTitleStyle>lists</LogoStyle>
          </Link>

          <MHidden width="mdDown">
            <MenuDesktop isOffset={isOffset} isHome={isHome} navConfig={navConfig} />

            <Box sx={{ flexGrow: 1 }} />

            <Button variant="contained" onClick={() => gotoSignup()}>
              Sign up, it is free
            </Button>

            <Typography sx={{ ml: 1, color: 'text.secondary', cursor: 'pointer' }} onClick={() => gotoSignin()}>
              Sign in
            </Typography>
          </MHidden>

          {/* <MHidden width="mdUp">
            <MenuMobile isOffset={isOffset} isHome={isHome} navConfig={navConfig} />
          </MHidden> */}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
