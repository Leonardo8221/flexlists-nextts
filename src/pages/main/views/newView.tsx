import React, { useEffect, useState } from "react";
import MainLayout from "src/layouts/view/MainLayout";
import WysiwygEditor from "src/components/wysiwyg/wysiwygEditor";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Divider,
  Link,
  SelectChangeEvent,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { ListCategory, ViewType } from "src/enums/SharedEnums";
import { ListCategoryLabel } from "src/enums/ShareEnumLabels";
import { useRouter } from "next/router";
import { listService } from "src/services/list.service";
import { isSucc } from "src/models/ApiResponse";
import { PATH_MAIN } from "src/routes/paths";
import { setMessage } from "src/redux/actions/viewActions";
import { connect } from "react-redux";
import { createCoreView } from "src/services/listView.service";
import { FieldValidatorEnum, ModelValidatorEnum, frontendValidate, isFrontendError } from "src/utils/validatorHelper";

interface NewListProps {
  message: any;
  setMessage: (message: any) => void;
  viewTemplate:any
}

function NewList({ message, setMessage,viewTemplate }: NewListProps) {
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string|boolean }>({});
  const [isSubmit,setIsSubmit] = useState<boolean>(false);
  var categories: { key: string; name: string }[] = [];
  Object.keys(ListCategory).forEach((x) => {
    categories.push({ key: x, name: ListCategoryLabel.get(x) ?? "" });
  });
  const [currentList, setCurrentList] = useState<{
    name: string;
    description: string;
    category: string;
  }>({ name: "", description: "", category: categories[0].key });

  // error handling
  const [flash, setFlash] = useState<
    { message: string; type: string } | undefined
  >(undefined);

  useEffect(() => {
    function checkMessage() {
      if (message?.message) {
        setFlash(message);
      }
    }
    checkMessage();
  }, [message]);

  const flashHandleClose = () => {
    setFlash(undefined);
    setMessage(null);
  };
  function setError(message: string) {
    setFlashMessage(message);
  }
  function setFlashMessage(message: string, type: string = "error") {
    setFlash({ message: message, type: type });
    setMessage({ message: message, type: type });
  }

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newList = Object.assign({}, currentList);
    newList.name = event.target.value;
    setCurrentList(newList);
  };
  const onDescriptionChange = (newValue: string) => {
    var newList = Object.assign({}, currentList);
    newList.description = newValue;
    setCurrentList(newList);
  };
  const onCategoryChange = (event: SelectChangeEvent) => {
    var newList = Object.assign({}, currentList);
    newList.category = event.target.value;
    setCurrentList(newList);
  };
  const handleSubmit = async () => {
    setIsSubmit(true);
    let _errors: { [key: string]: string|boolean } = {}

    const _setErrors = (e: { [key: string]: string|boolean }) => { 
      _errors = e
    } 
    let newViewName = await frontendValidate(ModelValidatorEnum.TableDefinition,FieldValidatorEnum.name,currentList.name,_errors,_setErrors,true)
        if(isFrontendError(FieldValidatorEnum.name,_errors,setErrors,setError)) return
    let createListResponse : any;
    if(!viewTemplate || !viewTemplate.id|| viewTemplate.id == 0){
      createListResponse= await listService.createList(
        newViewName,
        currentList.description,
        currentList.category as ListCategory,
        ViewType.List
      );
    }
    else{
      createListResponse= await createCoreView(
        viewTemplate.id,
        newViewName,
        currentList.description,
      )
    }
    if (
      isSucc(createListResponse) &&
      createListResponse.data &&
      createListResponse.data.listId
    ) {
      await router.push({
        pathname: `${PATH_MAIN.views}/${createListResponse.data.viewId}`,
      });
    }
  };
  return (
    <MainLayout removeFooter={true}>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Snackbar
          open={flash !== undefined}
          autoHideDuration={6000}
          onClose={flashHandleClose}
        >
          <Alert
            onClose={flashHandleClose}
            severity={flash?.type as AlertColor}
            sx={{ width: "100%" }}
          >
            {flash?.message}
          </Alert>
        </Snackbar>
        <Box sx={{ py: 4, mx: 2, flexGrow: 1 }}>
          <Typography variant="h4">Create list</Typography>
          <Divider sx={{ my: 2 }} light />
          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle2" gutterBottom>
              Name
            </Typography>
            <TextField
              required
              fullWidth
              id="fullWidth"
              value={currentList.name}
              onChange={onNameChange}
              error = {isSubmit && isFrontendError(FieldValidatorEnum.name,errors)} 
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Description
            </Typography>
            <WysiwygEditor
              value={currentList.description}
              setValue={(newValue) => onDescriptionChange(newValue)}
            />
          </Box>
          {
            (!viewTemplate || !viewTemplate.id|| viewTemplate.id == 0) &&
            <Box>
            <Typography variant="subtitle2" gutterBottom>
              Category
            </Typography>
            <Select
              fullWidth
              displayEmpty
              value={currentList.category}
              onChange={onCategoryChange}
            >
              {categories.map((option) => (
                <MenuItem key={option.key} value={option.key}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          }
          
          <Button
            variant="contained"
            sx={{ width: { xs: "100%", md: "auto" },mt:4 }}
            type="submit"
            onClick={() => handleSubmit()}
          >
            Create list
          </Button>
        </Box>
        {/* <Box sx={{ borderLeft: "solid 1px #ccc", p: 2 }}>
          <Typography variant="h4">List details</Typography>
          <Typography variant="body1">
            Color picker, users and their permissions
          </Typography>
        </Box> */}
      </Box>
    </MainLayout>
  );
}

const mapStateToProps = (state: any) => ({
  message: state.view.message,
  viewTemplate:state.view.viewTemplate
});

const mapDispatchToProps = {
  setMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewList);
