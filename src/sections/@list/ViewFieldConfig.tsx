import { useEffect, useState } from "react";
import { Box, TextField, Typography, Divider, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import CentralModal from "src/components/modal/CentralModal";
import { connect } from "react-redux";
import { setCurrentView } from "src/redux/actions/viewActions";
import { Field, View } from "src/models/SharedModels";
import { listViewService } from "src/services/listView.service";
import { isSucc } from "src/models/ApiResponse";
import { FieldUiType, ViewType } from "src/enums/SharedEnums";
import { ViewField } from "src/models/ViewField";
import { fieldService } from "src/services/field.service";

type ViewFieldConfigProps = {
  open: boolean;
  handleClose: () => void;
  viewType: ViewType;
  type:'field'|'title',
  currentView:View
};

const ViewFieldConfig = ({
  open,
  handleClose,
  viewType,
  type,
  currentView
}: ViewFieldConfigProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const [windowHeight, setWindowHeight] = useState(0);
  var fieldUiType = FieldUiType.Text
  switch (viewType) {
    case ViewType.Calendar:
      fieldUiType = FieldUiType.DateTime
      break;
  
    default:
      break;
  }
  const newField : any = {
    listId: currentView.listId,
    name: "",
    required: false,
    uiField: FieldUiType.Text,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: "",
  };
  const [currentField,setCurrentField] = useState<Field>(newField)
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const handleViewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newView = Object.assign({}, viewFields);
    newView.name = event.target.value;
    setViewFields(newView);
  };
  const onSubmit = async () => {
    var createFieldResponse = await fieldService.createUIField(currentView.id,currentField.name,currentField.uiField,currentField.required,currentField.detailsOnly,
      currentField.description,currentField.config,currentField.icon,currentField.defaultValue);
    if (isSucc(createFieldResponse) && createFieldResponse.data) {
      currentField.id = (
        createFieldResponse.data as CreateFieldOutputDto
      ).fieldId;
      onAdd(currentField);
    }
  };
  return (
    <CentralModal open={open} handleClose={handleClose}>
      <Typography variant="h6">Rename View</Typography>
      <Divider sx={{ my: 2 }}></Divider>
      <Box>
        <Typography variant="subtitle2">Name</Typography>
        <TextField
          fullWidth
          onChange={handleViewNameChange}
          value={viewFields?.name}
          placeholder="List Name"
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
          defaultValue="Base description"
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button disabled sx={{ mt: 2 }} variant="contained" onClick={()=>onSubmit()}>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewFieldConfig);
