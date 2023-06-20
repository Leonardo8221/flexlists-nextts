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
} from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import SearchIcon from "@mui/icons-material/Search";
import { SelectChangeEvent } from "@mui/material/Select";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import GroupMembers from "src/components/groups/groupMembers";
import ViewCard from "src/sections/@view/ViewCard";
import { useRouter } from "next/router";
import { GetGroupViewsOutputDto, GetUserGroupsOutputDto } from "src/models/ApiOutputModels";
import { groupService } from "src/services/group.service";
import { convertToInteger } from "src/utils/convertUtils";
import { isSucc } from "src/models/ApiResponse";
import { connect } from "react-redux";


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
  groups : GetUserGroupsOutputDto[]
}
function GroupDetail() {
  const router = useRouter();
  const [groupViews,setGroupViews] = useState<GetGroupViewsOutputDto[]>([]) 
  const [sort,setSort] = useState<string>('')
  const [currentGroup,setCurrentGroup] = useState<GetUserGroupsOutputDto>()
  useEffect(()=>{
    async function fetchData()
    {
       if(router.query.groupId)
       {
        let getGroupViewsResponse = await groupService.getGroupViews(convertToInteger(router.query.groupId))
        if(isSucc(getGroupViewsResponse) && getGroupViewsResponse.data)
        {
           setGroupViews(getGroupViewsResponse.data)
        }
        let groupsResponse = await groupService.getUserGroups();
        if(isSucc(groupsResponse) && groupsResponse.data)
        {
          console.log(groupsResponse.data)
          let group = groupsResponse.data.find((x:any)=>x.groupId ===  convertToInteger(router.query.groupId))
          console.log(group)
          setCurrentGroup(group)
        }
        
       }
       
    }
    if(router.isReady)
    {
      fetchData()
    }
  },[router.isReady])
  
  const handleChange = (event: SelectChangeEvent) => {
  };

  const [isGrid, setIsGrid] = useState<boolean>(false);

  const handleGridView = () => {
    setIsGrid(true);
  };

  const handleListView = () => {
    setIsGrid(false);
  };
  return (
    <MainLayout>
      <Grid container>
        <Grid item xs={10} sx={{ p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              
              <Typography variant="h6">{currentGroup?.name}</Typography>
            </Box>
            <Button variant="contained" >
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
              {groupViews && groupViews.map((view,index) => {
                return (
                  <Grid item md={2} key={index}>
                    <ViewCard
                      id = {view.tableViewId}
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
              {groupViews.map((view,index) => {
                return (
                  <Grid item md={12} key={index}>
                    <ViewCard
                       id = {view.tableViewId}
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
    </MainLayout>
  );
}
const mapStateToProps = (state: any) => ({
  groups:state.group.groups
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetail);
