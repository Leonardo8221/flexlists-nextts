import { useEffect, useState } from "react";
import { Box, TextField, Typography, Divider, Button, Alert, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CentralModal from "src/components/modal/CentralModal";
import { connect } from "react-redux";
import { FlexlistsError, isSucc } from "src/models/ApiResponse";
import { contentManagementService } from "src/services/admin/contentManagement.service";
import { TranslationKeyDto } from "src/models/TranslationKeyDto";
import { translationKeyService } from "src/services/admin/translationKey.service";
import { AuthValidate } from "src/models/AuthValidate";
import { TranslationKeyType } from "src/enums/SharedEnums";

type TranslationKeyFormProps = {
  open: boolean;
  handleClose: () => void;
  currentTranslationKey: TranslationKeyDto;
  onAdd: (newTranslationKey: TranslationKeyDto) => void;
  onUpdate: (editTranslationKey: TranslationKeyDto) => void;
  authValidate : AuthValidate
};

const TranslationKeyForm = ({
  open,
  handleClose,
  currentTranslationKey,
  onAdd,
  onUpdate,
  authValidate
}: TranslationKeyFormProps) => {
  const theme = useTheme();
  const isCreating = currentTranslationKey.id === 0;
  const [translationKey, setTranslationKey] = useState<TranslationKeyDto>(currentTranslationKey);
  const [isUpdate,setIsUpdate] = useState<boolean>(false);
  const [error,setError] = useState<string>('');
  const [submit,setSubmit] = useState<boolean>(false)
  const translationKeyTypes = Object.keys(TranslationKeyType).filter((item) => {
    return isNaN(Number(item));
  });
  useEffect(() => {
    setTranslationKey(currentTranslationKey);
  }, [currentTranslationKey]);
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newTranslationKey = Object.assign({}, translationKey);
    newTranslationKey.name = event.target.value;
    setIsUpdate(true)
    setTranslationKey(newTranslationKey);
  };
  const onSubmit = async () => {
    setSubmit(true)
    if(!translationKey.name)
    {
      setError('Name required')
      return;
    }
    if(isCreating)
    {
      let response = await contentManagementService.addTranslationKeyToContentManagement(
        translationKey.name,
        translationKey.type,
        translationKey.contentManagementId,
        translationKey.config
      );
      if (isSucc(response)) {
        translationKey.id = (response.data as any).id;
        onAdd(translationKey);
        handleClose();
      }
      else
      {
        setError((response as FlexlistsError).message)
      }
    }
    else
    {
      let response = await translationKeyService.updateTranslationKey(translationKey.id,translationKey.name,translationKey.type,authValidate.user?authValidate.user.userId:0,translationKey.config);
      if (isSucc(response)) {
        onUpdate(translationKey);
        handleClose();
      }
      else
      {
        setError((response as FlexlistsError).message)
      }
    }
  };
  const onTypeChange = (event: SelectChangeEvent) => {
    var newTranslationKey = Object.assign({}, translationKey);
    newTranslationKey.type = event.target.value as TranslationKeyType;
    setIsUpdate(true)
    setTranslationKey(newTranslationKey);
  }
  return (
    <CentralModal open={open} handleClose={handleClose}>
      {
        translationKey &&
        <>
          <Typography variant="h6">{isCreating?'Add':'Edit'}</Typography>
            <Divider sx={{ my: 2 }}></Divider>
            <Box>
                {error && <Alert severity="error">{error}</Alert>}
            </Box>
            <Box>
              <Typography variant="subtitle2">Name</Typography>
              <TextField
                fullWidth
                onChange={handleNameChange}
                value={translationKey?.name}
                placeholder="Name"
                required
                error = {submit && !translationKey?.name}
              />
            </Box>
            <Box>
               <Typography variant="subtitle2">Type</Typography>
               <Select
                  id="select-translation-key-type"
                  value={translationKey.type}
                  onChange={(e)=>{onTypeChange(e)}}
                  sx={{
                    fontSize: 14,
                    "&::before": { borderBottom: "none" },
                    "&:focused": { backgroundColor: "transparent !important" },
                  }}
                >
                  {translationKeyTypes &&
                    translationKeyTypes.map((translationKeyType, index) => {
                      return (
                        <MenuItem key={index} value={translationKeyType}>
                          {translationKeyType}
                        </MenuItem>
                      );
                    })}
                </Select>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {/* DISABLED BUTTON UNTIL CHANGE IS MADE */}
              <Button disabled={!isUpdate} sx={{ mt: 2 }} variant="contained" onClick={()=>onSubmit()}>
                 {isCreating?'Add':'Edit'}
              </Button>
              <Button
                onClick={handleClose}
                sx={{ mt: 2, ml: 2, color: "#666" }}
                variant="text"
              >
                Cancel
              </Button>
            </Box>
        </>
      }
      
    </CentralModal>
  );
};

const mapStateToProps = (state: any) => ({
  authValidate : state.admin.authValidate
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TranslationKeyForm);
