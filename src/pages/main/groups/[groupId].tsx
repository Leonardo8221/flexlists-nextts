import React, { useEffect, useState } from "react";
import MainLayout from "src/layouts/view/MainLayout";
import {
  Grid,
  Box,
  Button,
  Avatar,
  Typography,
  Divider,
  OutlinedInput,
  InputAdornment,
  Select,
  MenuItem,
  TextField,
  Alert,
} from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import SearchIcon from "@mui/icons-material/Search";
import { SelectChangeEvent } from "@mui/material/Select";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import GroupMembers from "src/sections/groups/groupMembers";
import ViewCard from "src/sections/@view/ViewCard";
import { useRouter } from "next/router";
import {
  GetGroupViewsOutputDto,
  GetUserGroupsOutputDto,
} from "src/models/ApiOutputModels";
import { groupService } from "src/services/group.service";
import { convertToInteger } from "src/utils/convertUtils";
import { isSucc } from "src/models/ApiResponse";
import { connect } from "react-redux";
import CentralModal from "src/components/modal/CentralModal";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { FieldValidatorEnum, ModelValidatorEnum, frontendValidate, isFrontendError } from "src/utils/validatorHelper";
import { setFlashMessage } from "src/redux/actions/authAction";

const activeButtonStyle: React.CSSProperties = {
  border: "1px solid #eee",
  background: "#eee",
  width: "40px",
  height: "40px",
  color: "#54A6FB",
  borderRadius: "4px",
  transition: "all ease .2s ",
};

const inactiveButtonStyle: React.CSSProperties = {
  border: "1px solid #eee",
  width: "40px",
  height: "40px",
  color: "#000",
  borderRadius: "4px",
  transition: "all ease .2s ",
};

const GridViewButton = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      style={active ? activeButtonStyle : inactiveButtonStyle}
      onClick={onClick}
    >
      <GridViewIcon />
    </Box>
  );
};

const ListViewButton = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      style={active ? activeButtonStyle : inactiveButtonStyle}
      onClick={onClick}
    >
      <ViewListIcon />
    </Box>
  );
};
type GroupDetailProps = {
  setFlashMessage: (flashMessage: FlashMessageModel) => void;
};
function GroupDetail({ setFlashMessage }: GroupDetailProps) {
  const router = useRouter();
  const [groupViews, setGroupViews] = useState<GetGroupViewsOutputDto[]>([]);
  const [sort, setSort] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<GetUserGroupsOutputDto>();
  const [isRenameGroupOpenModal, setIsRenameGroupOpenModal] =
    useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      if (router.query.groupId) {
        let getGroupViewsResponse = await groupService.getGroupViews(
          convertToInteger(router.query.groupId)
        );
        if (isSucc(getGroupViewsResponse) && getGroupViewsResponse.data) {
          setGroupViews(getGroupViewsResponse.data);
        }
        let groupsResponse = await groupService.getUserGroups();
        if (isSucc(groupsResponse) && groupsResponse.data) {
          let group = groupsResponse.data.find(
            (x: any) => x.groupId === convertToInteger(router.query.groupId)
          );
          setCurrentGroup(group);
        }
      }
    }
    if (router.isReady) {
      fetchData();
    }
  }, [router.isReady]);

  const handleChange = (event: SelectChangeEvent) => {};

  const [isGrid, setIsGrid] = useState<boolean>(false);

  const handleGridView = () => {
    setIsGrid(true);
  };

  const handleListView = () => {
    setIsGrid(false);
  };
  const onOpenRenameModal = () => {
    setIsRenameGroupOpenModal(true);
  };
  const handleUpdateGroup = (newGroup: GetUserGroupsOutputDto) => {
    setCurrentGroup(newGroup);
  };
  return (
    <MainLayout>
      <Grid container>
        <Grid item xs={10} sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="h6">{currentGroup?.name}</Typography>
            </Box>
            <Button variant="contained" onClick={() => onOpenRenameModal()}>
              Rename Group
            </Button>
          </Box>
          <Typography component={"div"} variant="body1" sx={{ mt: 2 }}>
            {currentGroup?.description}
          </Typography>
          <Divider light sx={{ my: 2 }}></Divider>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <OutlinedInput
                id="outlined-adornment"
                placeholder="Search views"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
              <Select
                value={sort}
                variant="standard"
                defaultValue="1"
                onChange={handleChange}
                sx={{ minWidth: 120, ml: 3 }}
              >
                <MenuItem value="1">Sort by date modifed down</MenuItem>
                <MenuItem value="2">Sort by date modifed up</MenuItem>
                <MenuItem value="3">Sort by 3</MenuItem>
              </Select>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <GridViewButton active={isGrid} onClick={handleGridView} />
              <ListViewButton active={!isGrid} onClick={handleListView} />
            </Box>
          </Box>
          <Divider light sx={{ my: 2 }}></Divider>

          {isGrid ? (
            <Grid container spacing={2} sx={{ my: 2 }}>
              {groupViews &&
                groupViews.map((view, index) => {
                  return (
                    <Grid item md={2} key={index}>
                      <ViewCard
                        id={view.tableViewId}
                        viewName={view.tableViewName}
                        viewDesc={""}
                        bgImage={"/assets/home/heroimg.png"}
                      />
                    </Grid>
                  );
                })}
            </Grid>
          ) : (
            <Grid container spacing={2} sx={{ my: 2 }}>
              {groupViews.map((view, index) => {
                return (
                  <Grid item md={12} key={index}>
                    <ViewCard
                      id={view.tableViewId}
                      viewName={view.tableViewName}
                      viewDesc={""}
                      bgImage={"/assets/home/heroimg.png"}
                    />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Grid>
        <Grid
          item
          xs={2}
          sx={{ p: 2, height: "calc(100vh - 91px)", background: "#fafafa" }}
        >
          <GroupMembers />
        </Grid>
      </Grid>
      {currentGroup && (
        <RenameGroup
          group={currentGroup}
          handleClose={() => setIsRenameGroupOpenModal(false)}
          open={isRenameGroupOpenModal}
          onUpdate={(newGroup) => handleUpdateGroup(newGroup)}
          setFlashMessage={setFlashMessage}
        />
      )}
    </MainLayout>
  );
}
const mapStateToProps = (state: any) => ({
  groups: state.group.groups,
});

const mapDispatchToProps = {
  setFlashMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail);

type RenameGroupProps = {
  open: boolean;
  handleClose: () => void;
  group: GetUserGroupsOutputDto;
  onUpdate: (newGroup: GetUserGroupsOutputDto) => void;
  setFlashMessage:(message:FlashMessageModel)=>void
};

const RenameGroup = ({
  open,
  handleClose,
  group,
  onUpdate,
  setFlashMessage
}: RenameGroupProps) => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [currentGroup, setCurrentGroup] =
    useState<GetUserGroupsOutputDto>(group);
  const [errors, setErrors] = useState<{ [key: string]: string|boolean }>({});
  const [isSubmit,setIsSubmit] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    var newGroup = Object.assign({}, currentGroup);
    newGroup.name = event.target.value;
    setIsUpdate(true);
    setCurrentGroup(newGroup);
  };
  const handleGroupDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    var newGroup = Object.assign({}, currentGroup);
    newGroup.description = event.target.value;
    setIsUpdate(true);
    setCurrentGroup(newGroup);
  };
  const setError = (message:string)=>{
    setFlashMessage({message:message,type:'error'})
  }
  const onSubmit = async () => {
    setIsSubmit(true)
    let _errors: { [key: string]: string|boolean } = {}

    const _setErrors = (e: { [key: string]: string|boolean }) => { 
      _errors = e
    } 
    let newGroupName = await frontendValidate(ModelValidatorEnum.Group,FieldValidatorEnum.name,currentGroup.name,_errors,_setErrors,true)
        if(isFrontendError(FieldValidatorEnum.name,_errors,setErrors,setError)) return

    var response = await groupService.updateUserGroup(
      currentGroup.groupId,
      currentGroup.name,
      currentGroup.description
    );
    if (isSucc(response)) {
      setIsUpdate(false);
      onUpdate(currentGroup);
      handleClose();
    }
  };
  return (
    <CentralModal open={open} handleClose={handleClose}>
      <Typography variant="h6">Rename Group</Typography>
      <Divider sx={{ my: 2 }}></Divider>
      <Box>
        <Typography variant="subtitle2">Name</Typography>
        <TextField
          fullWidth
          onChange={handleGroupNameChange}
          value={currentGroup?.name}
          placeholder="Name"
          required
          error = {isSubmit && isFrontendError(FieldValidatorEnum.name,errors)}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          Description
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          value={currentGroup?.description}
          onChange={handleGroupDescriptionChange}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          disabled={!isUpdate}
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() => onSubmit()}
        >
          Update
        </Button>
        <Button
          onClick={handleClose}
          sx={{ mt: 2, ml: 2, color: "#666" }}
          variant="text"
        >
          Cancel
        </Button>
      </Box>
    </CentralModal>
  );
};
