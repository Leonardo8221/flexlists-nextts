import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import CentralModal from "src/components/modal/CentralModal";
import { connect } from "react-redux";
import { View } from "src/models/SharedModels";
import { listViewService } from "src/services/listView.service";
import { isSucc } from "src/models/ApiResponse";
import { useRouter } from "next/router";
import { PATH_MAIN } from "src/routes/paths";
import { FieldValidatorEnum, ModelValidatorEnum, frontendValidate, isFrontendError } from "src/utils/validatorHelper";
import { setFlashMessage } from "src/redux/actions/authAction";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

type DuplicateViewProps = {
  open: boolean;
  translations: TranslationText[];
  handleClose: () => void;
  currentView: View,
  setFlashMessage : (message:FlashMessageModel)=>void
};

const DuplicateView = ({ open, translations, handleClose, currentView,setFlashMessage }: DuplicateViewProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [errors, setErrors] = useState<{ [key: string]: string|boolean }>({});
  const [isSubmit,setIsSubmit] = useState<boolean>(false);

  const setError = (message:string)=>{
    setFlashMessage({message:message,type:'error'})
  }
  const handleViewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleViewDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const onSubmit = async () => {
    setIsSubmit(true)
    let _errors: { [key: string]: string|boolean } = {}

    const _setErrors = (e: { [key: string]: string|boolean }) => { 
      _errors = e
    } 
    let newViewName = await frontendValidate(ModelValidatorEnum.TableView,FieldValidatorEnum.name,name,_errors,_setErrors,true)
        if(isFrontendError(FieldValidatorEnum.name,_errors,setErrors,setError)) return
    var response = await listViewService.createView(currentView.listId, newViewName, currentView.type, currentView.config, currentView.template,
      currentView.category, currentView.page, currentView.limit, currentView.order, currentView.query, description, currentView.conditions, currentView.fields)
    if (isSucc(response) && response.data && response.data.viewId) {
      await router.push(`${PATH_MAIN.views}/${response.data.viewId}`)
      router.reload();
      handleClose()
    }
    else {
      setError(response.message)
    }

  }
  return (
    <CentralModal open={open} handleClose={handleClose} zIndex={1200}>
      <Typography variant="h6">{t("Duplicate View")}</Typography>
      <Divider sx={{ my: 2 }}></Divider>
      <Box>
        <Typography variant="subtitle2">{t("Name")}</Typography>
        <TextField
          fullWidth
          onChange={handleViewNameChange}
          value={name}
          placeholder={t("Name")}
          required
          error = {isSubmit && isFrontendError(FieldValidatorEnum.name,errors)}
        />
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ mt: 2 }}>
          {t("Description")}
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={handleViewDescriptionChange}
        />
      </Box>
      {/* <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Copy content"
        />
      </FormGroup> */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => onSubmit()}>
          {t("Duplicate")}
        </Button>
        <Button
          onClick={handleClose}
          sx={{ mt: 2, ml: 2, color: "#666" }}
          variant="text"
        >
          {t("Cancel")}
        </Button>
      </Box>
    </CentralModal>
  );
};
const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  setFlashMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateView);
