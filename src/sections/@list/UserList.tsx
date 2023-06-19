import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "@coreui/coreui/dist/css/coreui.min.css";
import { connect } from "react-redux";
import { getViewUserGroups, getViewUsers } from "src/redux/actions/viewActions";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { convertToInteger } from "src/utils/convertUtils";

type ViewUsersProps = {
  users: any[];
  userGroups : any[];
  getViewUsers:(viewId:number)=>void
  getViewUserGroups:(viewId:number)=>void
};

const ViewUsersList = ({ users,getViewUsers,userGroups,getViewUserGroups }: ViewUsersProps) => {
  const theme = useTheme();
  const router = useRouter()
  useEffect(()=>{
     if(router.query.viewId)
     {
        getViewUsers(convertToInteger(router.query.viewId))
     }
  },[router.query.viewId,getViewUsers])
  useEffect(()=>{
    if(router.query.viewId)
    {
       getViewUserGroups(convertToInteger(router.query.viewId))
    }
 },[router.query.viewId,getViewUserGroups])
  return (
    <Box
      sx={{
        display: "flex",
        paddingTop: { xs: 0.5, md: 1 },
      }}
    >
      {users && users.map(
        (user: any, index: number) =>
          index < 2 && (
            <Box
              key={user.name}
              component="img"
              src={user.avatar??'/assets/images/avatars/avatar_1.jpg'}
              sx={{
                width: 32,
                height: 32,
                borderRadius: 50,
                border: "1px solid #C92929",
                marginLeft: index ? "-7px" : "inherit",
                zIndex: users.length - index,
                cursor: "pointer",
              }}
            />
          )
      )}
      <Box
        sx={{
          width: 32,
          height: 32,
          marginLeft: "-7px",
          borderRadius: 50,
          border: `1px solid ${theme.palette.palette_style.text.primary}`,
          position: "relative",
          cursor: "pointer",
        }}
      >
        <Box
          component="span"
          className="svg-color"
          sx={{
            position: "absolute",
            left: 7,
            top: 3,
            width: 12,
            height: 10,
            display: "inline-block",
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/header/users.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/header/users.svg) no-repeat center / contain`,
            cursor: "pointer",
          }}
        />
        <Box
          sx={{ fontSize: "12px", position: "absolute", right: 6, bottom: 0 }}
        >
          +{users ? users.length - 2 : 0}
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  users : state.view.users,
  userGroups: state.view.userGroups
});

const mapDispatchToProps = {
  getViewUsers,
  getViewUserGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewUsersList);
