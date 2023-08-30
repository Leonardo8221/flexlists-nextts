import { Box, Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "@coreui/coreui/dist/css/coreui.min.css";
import { connect } from "react-redux";
import { getViewUserGroups, getViewUsers } from "src/redux/actions/viewActions";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { convertToInteger } from "src/utils/convertUtils";
import { downloadFileUrl } from "src/utils/flexlistHelper";
import { View } from "src/models/SharedModels";

type ViewUsersProps = {
  users: any[];
  userGroups: any[];
  getViewUsers: (viewId: number) => void;
  getViewUserGroups: (viewId: number) => void;
  currentView: View;
};

const ViewUsersList = ({
  users,
  getViewUsers,
  userGroups,
  getViewUserGroups,
  currentView,
}: ViewUsersProps) => {
  const theme = useTheme();
  const router = useRouter();
  useEffect(() => {
    getViewUsers(currentView.id);
  }, [router.isReady, getViewUsers]);
  useEffect(() => {
    getViewUserGroups(currentView.id);
  }, [router.isReady, getViewUserGroups]);
  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.5,
        width: "max-content",
      }}
    >
      {users &&
        users.map(
          (user: any, index: number) =>
            index < 2 && (
              <Tooltip key={user.name} title={user.name}>
                <Box
                  component="img"
                  src={downloadFileUrl(user.avatarUrl)}
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
              </Tooltip>
            )
        )}
      <Tooltip title="other users names">
        <Box
          sx={{
            minWidth: 32,
            maxWidth: 32,
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
      </Tooltip>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  users: state.view.users,
  userGroups: state.view.userGroups,
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  getViewUsers,
  getViewUserGroups,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewUsersList);
