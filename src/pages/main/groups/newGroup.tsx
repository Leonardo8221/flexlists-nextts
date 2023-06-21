import React, { useState } from "react";
import MainLayout from "src/layouts/view/MainLayout";
import WysiwygEditor from "src/components/wysiwyg-editor/wysiwyg";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import IconUploadButton from "src/components/groups/UploadButton";
import { useRouter } from "next/router";
import { isSucc } from "src/models/ApiResponse";
import { PATH_MAIN } from "src/routes/paths";
import { groupService } from "src/services/group.service";
export default function NewGroup() {
  const router = useRouter();
  const [currentGroup, setCurrentGroup] = useState<{
    name: string;
    description: string;
  }>({ name: "", description: "" });
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newGroup = Object.assign({}, currentGroup);
    newGroup.name = event.target.value;
    setCurrentGroup(newGroup);
  };
  const onDescriptionChange = (newValue: string) => {
    var newGroup = Object.assign({}, currentGroup);
    newGroup.description = newValue;
    setCurrentGroup(newGroup);
  };
  const handleSubmit = async () => {
    var createListResponse = await groupService.createUserGroup(
      currentGroup.name,
      currentGroup.description
    );
    if (
      isSucc(createListResponse) &&
      createListResponse.data &&
      createListResponse.data.groupId
    ) {
      await router.push({
        pathname: `${PATH_MAIN.groups}/${createListResponse.data.groupId}`,
      });
    }
  };
  return (
    <MainLayout removeFooter={true} disableOverflow={false}>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#fff",
          overflow: "scroll",
        }}
      >
        <Box sx={{ py: 4, mx: 2, flexGrow: 1 }}>
          <Typography variant="h4">Create new group</Typography>
          <Divider sx={{ my: 2 }} light />
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" gutterBottom>
              Name
              <Typography component={"span"} sx={{ color: "red" }}>
                *
              </Typography>
            </Typography>
            <TextField
              required
              fullWidth
              id="fullWidth"
              value={currentGroup.name}
              onChange={onNameChange}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Description
            </Typography>
            <WysiwygEditor
              value={currentGroup.description}
              setValue={(newValue) => onDescriptionChange(newValue)}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" gutterBottom>
              Icon
            </Typography>
            <IconUploadButton />
          </Box>
          <Button
            variant="contained"
            sx={{ width: { xs: "100%", md: "auto" } }}
            type="submit"
            onClick={() => handleSubmit()}
          >
            Create Group
          </Button>
        </Box>
      </Box>
    </MainLayout>
  );
}
