import { FormControl, TextField, useTheme, Autocomplete } from "@mui/material";
import { styled, lighten, darken } from "@mui/system";
import { View } from "src/models/SharedModels";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { listViewService } from "src/services/listView.service";
import { isSucc } from "src/models/ApiResponse";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { fieldService } from 'src/services/field.service';
import { ViewField } from "src/models/ViewField";
import InputLabel from "@mui/material/InputLabel";

type PresetType = {
  viewID: number,
  viewName: string,
  presetName: string
};

type RelationConfigParams = {
  viewId: number,
  preset: string,
  rightFieldId: number
};

interface RelationConfigProps {
  isSubmit: boolean,
  values : RelationConfigParams,
  currentView: View,
  defaultPreset: any;
  updateRelations : (newRelation: RelationConfigParams) => void;
};

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

const RelationConfig = ({
  isSubmit,
  values,
  currentView,
  defaultPreset,
  updateRelations
}: RelationConfigProps) => {
  const theme = useTheme();
  const [views, setViews] = useState<PresetType[]>([]);
  const [view, setView] = useState<PresetType>();
  const [fields, setFields] = useState<ViewField[]>([]);
  const [field, setField] = useState<number>();

  useEffect(() => {
    const fetchLists = async () => {
      const response = await listViewService.getViews();

      if (isSucc(response) && response.data && response.data.length > 0) {
        const viewPresets: any[] = [];

        response.data.map((view: any) => {
          if (currentView.listId !== view.listId) {
            viewPresets.push({viewID: view.id, viewName: view.name, presetName: defaultPreset.name});
            view.presets.map((preset: any) => {
              const newView = {viewID: view.id, viewName: view.name, presetName: preset.name};
              viewPresets.push(newView);
              if (values && values.viewId && values.viewId === view.id) setView(newView);
            });
          }
        });
        
        setViews(viewPresets);
      }
    }

    if (currentView) fetchLists();
  }, [currentView]);

  useEffect(() => {
    if (values && views.length) {
      const oldView = views.filter((view: PresetType) => view.presetName === values.preset && view.viewID === values.viewId);
      if (oldView.length) setView(oldView[0]);
    }
  }, [values, views]);

  useEffect(() => {
    const fetchColumns = async (view: PresetType) => {
      const response = await fieldService.getFields(view.viewID);

      if (isSucc(response)) {
        const allFields = response.data.filter((field: ViewField) => !field.system && field.viewFieldVisible);

        setFields(allFields);
        setField(allFields[0].id);

        if (values) {
          const oldField = allFields.find((field: ViewField) => field.id === values.rightFieldId);
          
          if (oldField) setField(oldField.id);
        }
      }
    }

    if (view) fetchColumns(view);
  }, [view]);

  useEffect(() => {
    if (view && field) updateRelations({viewId: view.viewID, preset: view.presetName, rightFieldId: field});
  }, [field]);

  const handleField = async (event: SelectChangeEvent) => {
    setField(parseInt(event.target.value));
  };

  const handleViewPresetChange = (newTypeInput?: PresetType | null) => {
    if (!newTypeInput) {
      return;
    }

    setView(newTypeInput);
  };
  
  return (
    <>
      <FormControl required sx={{ marginTop: 3 }}>
        <Autocomplete
          id="view_preset"
          filterSelectedOptions={false}
          options={views}
          groupBy={(option) => option.viewName}
          getOptionLabel={(option) => option.presetName}
          fullWidth
          value={view || null}
          onChange={(event, newInputValue) => {
            handleViewPresetChange(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="View/Preset"
              error={isSubmit && !view}
            />
          )}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
        />
      </FormControl>
      {fields.length > 0 ? <FormControl required>
        <InputLabel id="fieldList" sx={{ top: "-2px" }}>Field</InputLabel>
        <Select
          id="fieldList"
          label="Field"
          value={(field || 0).toString()}
          onChange={handleField}
          size="medium"
          sx={{
            width: '100%'
          }}
          required
          error={isSubmit && !field}
        >
          {fields.map((field: ViewField) => (
            <MenuItem key={field.id} value={field.id}>
              {field.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> : <></>}
    </>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
  defaultPreset: state.view.defaultPreset
});

export default connect(mapStateToProps)(RelationConfig);