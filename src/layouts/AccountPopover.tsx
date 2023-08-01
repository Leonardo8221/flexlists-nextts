import { useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  Avatar,
  IconButton,
  Popover,
} from "@mui/material";
import { useRouter } from "next/router";
import { authService } from "src/services/auth.service";
import { connect } from "react-redux";
import { PATH_MAIN } from "src/routes/paths";
import { getProfile } from "src/services/account.service";
import { isSucc } from "src/models/ApiResponse";
import { setUserProfile } from "src/redux/actions/userActions";
import { UserProfile } from "src/models/UserProfile";
import { getAvatarUrl } from "src/utils/flexlistHelper";

const MENU_OPTIONS = [
  // {
  //   label: 'Profile',
  //   icon: 'eva:person-fill',
  // },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    path: PATH_MAIN.settings
  },
];
type AccountPopoverProps = {
  userProfile?:UserProfile;
  setUserProfile: (userProfile: UserProfile|undefined) => void;
}
const AccountPopover = ({userProfile,setUserProfile} : AccountPopoverProps) => {
  const [open, setOpen] = useState(null);
  const router = useRouter();
  useEffect(() => {
    async function getUserProfile() {
      const response = await getProfile();
      if(isSucc(response)&& response.data)
      {
        setUserProfile(response.data)
      }
    }
   getUserProfile()
  }, []);
  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const selectMenu = (path:string) => {
    setOpen(null);
    router.push(path);
  };
  const handleClose = () => {
    setOpen(null);
  };
  const logout = async () => {
    handleClose();
    await authService.logout();
    await router.push({
      pathname: "/",
    });
  };

  const style = open && {
    "&:before": {
      zIndex: 1,
      content: "''",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      position: "absolute",
      bgcolor: (theme: any) => alpha(theme.palette.grey[900], 0.8),
    },
  };

  return userProfile? (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          style,
        }}
      >
        <Avatar
          sx={{ width: 30, height: 30 }}
          src={getAvatarUrl(userProfile?.avatarUrl)}
          alt="photoURL"
        />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
           {userProfile?.firstName} {userProfile?.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {userProfile?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={()=>selectMenu(option.path)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={logout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  ):
  (<></>)
}

const mapStateToProps = (state: any) => ({
  userProfile : state.user.userProfile
});

const mapDispatchToProps = {
  setUserProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPopover);
