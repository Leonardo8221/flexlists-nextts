import React, { useEffect } from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import MainLayout from "src/layouts/view/MainLayout";
import GroupCard from "src/components/groups/groupCard";
import { GetUserGroupsOutputDto } from "src/models/ApiOutputModels";
import { useRouter } from "next/router";
import { fetchGroups } from "src/redux/actions/groupAction";
import { connect } from "react-redux";
import { PATH_MAIN } from "src/routes/paths";

type allGroupsProps = {
   groups:GetUserGroupsOutputDto[],
   fetchGroups:()=>void
}

const AllGroups =({groups,fetchGroups}:allGroupsProps) => {
  const router = useRouter();
  useEffect(()=>{
    if(router.isReady)
    {
      fetchGroups();
    }
  },[router.isReady])
  return (
    <>
      <MainLayout>
        <Container
          sx={{
            py: 3,
            maxWidth: "inherit !important",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">All groups.</Typography>
            <Button size="medium" variant="contained" onClick={()=>{router.push(PATH_MAIN.newGroup)}}>
              Create new group
            </Button>
          </Box>
          <Grid
            container
            spacing={3}
            sx={{
              pt: 3,
            }}
          >
            {groups && groups.map((group) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={2}
                  key={"/assets/home/heroimg.png"}
                >
                  <GroupCard
                    icon={<></>}
                    title={group.name}
                    description={group.description}
                  ></GroupCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </MainLayout>
    </>
  );
}
const mapStateToProps = (state: any) => ({
  groups : state.group.groups,
});

const mapDispatchToProps = {
  fetchGroups
};

export default connect(mapStateToProps, mapDispatchToProps)(AllGroups);

