import React from "react";
import {
  Box,
  Typography,
  Avatar,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { setViewUsers } from "src/redux/actions/viewActions";
import { connect } from "react-redux";
import { listViewService } from "src/services/listView.service";
import { View } from "src/models/SharedModels";
import { Role } from "src/enums/SharedEnums";
import { isSucc } from "src/models/ApiResponse";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";
import { downloadFileUrl } from "src/utils/flexlistHelper";
import { UserProfile } from "src/models/UserProfile";

type UserListAccessProps = {
  currentView: View;
  users: any[];
  roles: { name: string; label: string }[];
  translations: TranslationText[];
  setViewUsers: (users: any[]) => void;
  userProfile:UserProfile
};
function UserListAccess({
  currentView,
  users,
  roles,
  translations,
  setViewUsers,
  userProfile
}: UserListAccessProps) {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const [role, setRole] = useState("");
  const onRoleChange = async (userId: number, event: SelectChangeEvent) => {
    let response = await listViewService.updateUserRoleForView(
      currentView.id,
      userId,
      event.target.value as Role
    );
    if (isSucc(response)) {
      var newUsers: any[] = Object.assign([], users);
      setViewUsers(
        newUsers.map((x: any) => {
          if (x.userId === userId) {
            x.role = event.target.value;
            return x;
          }
          return x;
        })
      );
    }
  };
  const onDeleteViewUser = async (userId: number) => {
    let response = await listViewService.deleteUserFromView(
      currentView.id,
      userId
    );
    if (isSucc(response)) {
      var newUsers: any[] = Object.assign([], users);
      setViewUsers(
        newUsers.filter((x: any) => {
          return x.userId != userId;
        })
      );
    }
  };
  return (
    <>
      {users &&
        users.filter((x)=>x.userId !== userProfile.id).map((user) => {
          return (
            <>
              <Box
                sx={{ my: 2, display: "flex", alignItems: "center", gap: 1 }}
              >
                <Box
                  key={user.name}
                  component="img"
                  // src={user.avatar??'/assets/images/avatars/avatar_1.jpg'}
                  src={downloadFileUrl(user.avatarUrl)}
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 50,
                    border: "1px solid #C92929",
                    cursor: "pointer",
                  }}
                />
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{
                        maxWidth: { xs: "64px", sm: "unset" },
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        maxWidth: { xs: "64px", sm: "unset" },
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.email}
                    </Typography>
                  </Box>
                  <FormControl
                    variant="standard"
                    sx={{
                      m: 1,
                      minWidth: "auto",
                    }}
                  >
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={user.role}
                      onChange={(e) => {
                        onRoleChange(user.userId, e);
                      }}
                      sx={{
                        fontSize: 14,
                        "&::before": { borderBottom: "none" },
                        "&:focused": {
                          backgroundColor: "transparent !important",
                        },
                      }}
                    >
                      {roles &&
                        roles.map((role, index) => {
                          return (
                            <MenuItem key={index} value={role.name}>
                              {role.label}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      alignItems: "center",
                      cursor: "pointer",
                      color: "#eb2027",
                      fontWeight: 500,
                    }}
                    onClick={() => {
                      onDeleteViewUser(user.userId);
                    }}
                  >
                    <DeleteIcon />
                    <Typography
                      variant="subtitle2"
                      component={"span"}
                      sx={{
                        display: {
                          xs: "none",
                          md: "block",
                        },
                      }}
                    >
                      {t("Delete")}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </>
          );
        })}
    </>
  );
}
const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
  userProfile: state.user.userProfile
});

const mapDispatchToProps = {
  setViewUsers,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserListAccess);
