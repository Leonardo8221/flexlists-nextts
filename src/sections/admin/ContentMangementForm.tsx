import { useEffect, useState } from "react";
import { Box, TextField, Typography, Divider, Button, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CentralModal from "src/components/modal/CentralModal";
import { connect } from "react-redux";
import { FlexlistsError, isSucc } from "src/models/ApiResponse";
import { contentManagementService } from "src/services/admin/contentManagement.service";
import { ContentManagementDto } from "src/models/ContentManagementDto";

type ContentManagementFormProps = {
  open: boolean;
  handleClose: () => void;
  currentContentManagement: ContentManagementDto;
  onAdd: (newContentManagement: ContentManagementDto) => void;
  onUpdate: (editContentManagement: ContentManagementDto) => void;
};

const ContentManagementForm = ({
  open,
  handleClose,
  currentContentManagement,
  onAdd,
  onUpdate,
}: ContentManagementFormProps) => {
  const theme = useTheme();
  const isCreating = currentContentManagement.id === 0;
  const [contentManagement, setContentManagement] = useState<{id:number,name:string,ownerId:number}>(currentContentManagement);
  const [isUpdate,setIsUpdate] = useState<boolean>(false);
  const [error,setError] = useState<string>('');
  const [submit,setSubmit] = useState<boolean>(false)

  useEffect(() => {
    setContentManagement(currentContentManagement);
  }, [currentContentManagement]);
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newContentManagement = Object.assign({}, contentManagement);
    newContentManagement.name = event.target.value;
    setIsUpdate(true)
    setContentManagement(newContentManagement);
  };
  const onSubmit = async () => {
    setSubmit(true)
    if(!contentManagement.name)
    {
      setError('Name required')
      return;
    }
    if(isCreating)
    {
      let response = await contentManagementService.createContentManagement(contentManagement.name,currentContentManagement.ownerId);
      if (isSucc(response)) {
        contentManagement.id = (response.data as any).id;
        onAdd(contentManagement);
        handleClose();
      }
      else
      {
        setError((response as FlexlistsError).message)
      }
    }
    else
    {
      let response = await contentManagementService.updateContentManagement(contentManagement.id,contentManagement.name,currentContentManagement.ownerId);
      if (isSucc(response)) {
        onUpdate(contentManagement);
        handleClose();
      }
      else
      {
        setError((response as FlexlistsError).message)
      }
    }
  };
  return (
    <CentralModal open={open} handleClose={handleClose}>
      {
        contentManagement &&
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
                value={contentManagement?.name}
                placeholder="Name"
                required
                error = {submit && !contentManagement?.name}
              />
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
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentManagementForm);
