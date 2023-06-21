import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Checkbox,
  FormGroup,
  TextField,
  Typography,
  FormControlLabel,
  Alert,
} from "@mui/material";
import CentralModal from "src/components/modal/CentralModal";
import { connect } from "react-redux";
import { View } from "src/models/SharedModels";
import { listViewService } from "src/services/listView.service";
import { isSucc } from "src/models/ApiResponse";
import { ErrorConsts } from "src/constants/errorConstants";
import { useRouter } from "next/router";
import { PATH_MAIN } from "src/routes/paths";
type DuplicateViewProps = {
  open: boolean;
  handleClose: () => void;
  currentView: View
};

const DuplicateView = ({ open, handleClose, currentView }: DuplicateViewProps) => {
  const router = useRouter()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [submit, setSubmit] = useState<boolean>(false)


  const handleViewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleViewDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const onSubmit = async () => {
    setSubmit(true)
    if (!name) {
      setError('Name required')
      return;
    }
    var response = await listViewService.createView(currentView.listId, name, currentView.type, currentView.config, currentView.template,
      currentView.category, currentView.page, currentView.limit, currentView.order, currentView.query, description, currentView.conditions, currentView.fields)
    if (isSucc(response) && response.data && response.data.viewId) {
      await router.push(`${PATH_MAIN.views}/${response.data.viewId}`)
    }
    else {
      setError(response.message)
    }
  }
  return (
    <CentralModal open={open} handleClose={handleClose}>
      <Typography variant="h6">Duplicate View</Typography>
      <Divider sx={{ my: 2 }}></Divider>
      <Box>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
      <Box>
        <Typography variant="subtitle2">Name</Typography>
        <TextField
          fullWidth
          onChange={handleViewNameChange}
          value={name}
          placeholder="Name"
          required
          error={submit && !name}
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
          Duplicate
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
const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(DuplicateView);
