import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from "@coreui/react";
import { Box, FormControl, FormLabel, TextField, useTheme } from "@mui/material";
import { ChoiceModel } from "src/models/ChoiceModel";
import {
  Field,
  View
} from "src/models/SharedModels";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { getDefaultListViews } from "src/services/listView.service";
import { isSucc } from "src/models/ApiResponse";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { fieldService } from 'src/services/field.service';

interface RelationConfigProps {
  values : number[],
  currentView: View,
  updateRelations : (newRelation: number[]) => void
};

const RelationConfig = ({
  values,
  currentView,
  updateRelations
}: RelationConfigProps) => {
  const theme = useTheme();
  const [views, setViews] = useState<View[]>([]);
  const [view, setView] = useState<number>(0);
  const [fields, setFields] = useState<Field[]>([]);
  const [field, setField] = useState<number>(0);

  useEffect(() => {
    if (values.length > 1) {
      setView(values[0]);
      setField(values[1]);
      fetchFields(values[1]);
    }

    async function fetchLists() {
      const response = await await getDefaultListViews();
      if (isSucc(response) && response.data && response.data.length > 0) {
        setViews(response.data);
      }
    }

    if (currentView) {
      fetchLists();
    }
  }, [currentView]);

  const fetchFields = async (newView: number) => {
    try {
      const response = await fieldService.getFields(newView);

      if (isSucc(response)) {
        setFields(response.data.filter((field: Field) => !field.system));
        if (!field) setField(0);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleView = (event: SelectChangeEvent) => {
    setView(parseInt(event.target.value));

    fetchFields(parseInt(event.target.value));
  };

  const handleField = async (event: SelectChangeEvent) => {
    setField(parseInt(event.target.value));

    if (view && event.target.value) {
      updateRelations([view, parseInt(event.target.value)]);
    }
  };
  
  return (
    <>
      <FormControl required>
        <FormLabel sx={{ my: 1 }}>List</FormLabel>
        <Box>
          <Select
            value={view.toString()}
            onChange={handleView}
            size="small"
            sx={{
              width: '100%'
            }}
          >
            {views.map((view: View) => (
              <MenuItem key={view.id} value={view.id}>
                {view.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </FormControl>
      {view !== 0 && <FormControl required>
        <FormLabel sx={{ my: 1 }}>Field</FormLabel>
        <Box>
          <Select
            value={field.toString()}
            onChange={handleField}
            size="small"
            sx={{
              width: '100%'
            }}
          >
            {fields.map((field: Field) => (
              <MenuItem key={field.id} value={field.id}>
                {field.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </FormControl>}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

export default connect(mapStateToProps)(RelationConfig);