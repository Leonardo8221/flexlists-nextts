import { styled, useTheme } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import Logo from '../../../components/logo';
import AccountPopover from './AccountPopover';
import NotificationsPopover from './NotificationsPopover';
import SearchBarContainer from '../../../components/search-bar/SearchBarContainer';
import SearchBarMin from "../../../components/search-bar/SearchBarMin";
import useResponsive from '../../../hooks/useResponsive';
import Link from 'next/link';

const HEADER_MOBILE = 48;
const HEADER_DESKTOP = 48;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.palette_style.background.default,
  boxShadow: 'none'
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({  
  [theme.breakpoints.up('xs')]: {
    height: HEADER_MOBILE,
    padding: theme.spacing(1, 1),
  },
  [theme.breakpoints.up('lg')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(1, 3),
  },
  minHeight: 'inherit !important'
}));

type HeaderProps = {
  onOpenNav: (value:any)=>void,
};

export default function Header({ onOpenNav }:HeaderProps) {
  const theme = useTheme();
  const isMobile = useResponsive('down', 'sm');

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: {md: 1},
            color: theme.palette.palette_style.text.primary,
          }}
        >
          <Box
            component="span"
            className="svg-color"
            sx={{
              width: 32,
              height: 32,
              display: 'inline-block',
              bgcolor: '#54A6FB',
              mask: `url(/assets/icons/navbar/menu.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/navbar/menu.svg) no-repeat center / contain`,
            }}
          />
        </IconButton>

        <Link href="/">
          <Box sx={{ px: {xs: 1, md: 2.5}, display: 'inline-flex', marginLeft: { lg: 2 } }}>
            <Logo />
          </Box>
        </Link>

        {isMobile ? <SearchBarContainer /> : <SearchBarMin />}

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
