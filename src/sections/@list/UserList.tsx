import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "@coreui/coreui/dist/css/coreui.min.css";
import { connect } from "react-redux";
import { getViewUserGroups, getViewUsers } from "src/redux/actions/viewActions";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { convertToInteger } from "src/utils/convertUtils";

type ViewUsersProps = {
  users: any[];
  userGroups: any[];
  getViewUsers: (viewId: number) => void;
  getViewUserGroups: (viewId: number) => void;
};

const ViewUsersList = ({
  users,
  getViewUsers,
  userGroups,
  getViewUserGroups,
}: ViewUsersProps) => {
  const theme = useTheme();
  const router = useRouter();
  useEffect(() => {
    if (router.query.viewId) {
      getViewUsers(convertToInteger(router.query.viewId));
    }
  }, [router.query.viewId, getViewUsers]);
  useEffect(() => {
    if (router.query.viewId) {
      getViewUserGroups(convertToInteger(router.query.viewId));
    }
  }, [router.query.viewId, getViewUserGroups]);
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {users &&
        users.map(
          (user: any, index: number) =>
            index < 2 && (
              <Box
                key={user.name}
                component="img"
                src={user.avatar ?? "/assets/images/avatars/avatar_1.jpg"}
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
          borderRadius: 50,
          border: `1px solid ${theme.palette.palette_style.text.primary}`,
          position: "relative",
          cursor: "pointer",
          display: "grid",
          placeContent: "center",
        }}
      >
        <Box sx={{ fontSize: "12px" }}>+{users ? users.length - 2 : 0}</Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  users: state.view.users,
  userGroups: state.view.userGroups,
});

const mapDispatchToProps = {
  getViewUsers,
  getViewUserGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewUsersList);
