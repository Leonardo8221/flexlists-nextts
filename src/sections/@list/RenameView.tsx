import { useEffect, useState } from "react";
import { Box, TextField, Typography, Divider, Button, Alert } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import CentralModal from "src/components/modal/CentralModal";
import { connect } from "react-redux";
import { setCurrentView } from "src/redux/actions/viewActions";
import { View } from "src/models/SharedModels";
import { listViewService } from "src/services/listView.service";
import { isSucc } from "src/models/ApiResponse";

type RenameViewProps = {
  open: boolean;
  handleClose: () => void;
  currentView: View;
  setCurrentView: (newView: View) => void;
};

const RenameView = ({
  open,
  handleClose,
  currentView,
  setCurrentView,
}: RenameViewProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const [windowHeight, setWindowHeight] = useState(0);
  const [view, setView] = useState<View>(currentView);
  const [isUpdate,setIsUpdate] = useState<boolean>(false);
  const [error,setError] = useState<string>('');
  const [submit,setSubmit] = useState<boolean>(false)
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  useEffect(() => {
    setView(currentView);
  }, [currentView]);
  const handleViewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newView = Object.assign({}, view);
    newView.name = event.target.value;
    setIsUpdate(true)
    setView(newView);
  };
  const handleViewDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newView = Object.assign({}, view);
    newView.description = event.target.value;
    setIsUpdate(true)
    setView(newView);
  };
  const onSubmit = async () => {
    setSubmit(true)
    if(!view.name)
    {
      setError('Name required')
      return;
    }
    var response = await listViewService.renameView(view.id, view.name,view.description);
    if (isSucc(response)) {
      setCurrentView(view);
      handleClose();
    }
  };
  return (
    <CentralModal open={open} handleClose={handleClose}>
      <Typography variant="h6">Rename View</Typography>
      <Divider sx={{ my: 2 }}></Divider>
      <Box>
          {error && <Alert severity="error">{error}</Alert>}
      </Box>
      <Box>
        <Typography variant="subtitle2">Name</Typography>
        <TextField
          fullWidth
          onChange={handleViewNameChange}
          value={view?.name}
          placeholder="Name"
          required
          error = {submit && !view?.name}
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
          value={view?.description}
          onChange={handleViewDescriptionChange}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {/* DISABLED BUTTON UNTIL CHANGE IS MADE */}
        <Button disabled={!isUpdate} sx={{ mt: 2 }} variant="contained" onClick={()=>onSubmit()}>
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

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  setCurrentView,
};

export default connect(mapStateToProps, mapDispatchToProps)(RenameView);
