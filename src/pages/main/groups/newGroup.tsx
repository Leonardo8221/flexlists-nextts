import React, { useState } from "react";
import MainLayout from "src/layouts/view/MainLayout";
import WysiwygEditor from "src/components/wysiwyg/wysiwygEditor";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import IconUploadButton from "src/sections/groups/UploadButton";
import { useRouter } from "next/router";
import { isSucc } from "src/models/ApiResponse";
import { PATH_MAIN } from "src/routes/paths";
import { groupService } from "src/services/group.service";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { FieldValidatorEnum, ModelValidatorEnum, frontendValidate, isFrontendError } from "src/utils/validatorHelper";
import { setFlashMessage } from "src/redux/actions/authAction";
import { connect } from "react-redux";
type NewGroupProps = {
  setFlashMessage: (message: FlashMessageModel) => void;
};
 function NewGroup({ setFlashMessage }: NewGroupProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string|boolean }>({});
  const [isSubmit,setIsSubmit] = useState<boolean>(false);
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
  const setError = (message:string)=>{
    setFlashMessage({message:message,type:'error'})
  }
  const handleSubmit = async () => {
    setIsSubmit(true)
    let _errors: { [key: string]: string|boolean } = {}

    const _setErrors = (e: { [key: string]: string|boolean }) => { 
      _errors = e
    } 
    let newGroupName = await frontendValidate(ModelValidatorEnum.Group,FieldValidatorEnum.name,currentGroup.name,_errors,_setErrors,true)
        if(isFrontendError(FieldValidatorEnum.name,_errors,setErrors,setError)) return
    var createListResponse = await groupService.createUserGroup(
      newGroupName,
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
          overflow: "auto",
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
              error = {isSubmit && isFrontendError(FieldValidatorEnum.name,errors)}
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
const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = {
  setFlashMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(NewGroup);