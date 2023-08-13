import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
  FormControl,
} from "@mui/material";
import { connect } from "react-redux";
import { FieldUiTypeEnum } from "src/enums/SharedEnums";
import { ViewField } from "src/models/ViewField";
import { convertToInteger } from "src/utils/convertUtils";
import { FieldUIType } from "src/models/SharedModels";
import CreateFieldModal from "./CreateFieldModal";
import { CalendarConfig } from "src/models/ViewConfig";

type CalendarViewConfigProps = {
  submit: boolean;
  updateConfig: (config: CalendarConfig) => void;
  columns: ViewField[];
  availableFieldUiTypes: FieldUIType[];
};

function CalendarViewConfig({
  submit,
  updateConfig,
  columns,
  availableFieldUiTypes,
}: CalendarViewConfigProps) {
  const [dateFieldId, setDateFieldId] = useState<number>(0);
  const [titleFieldId, setTitleFieldId] = useState<number>(0);
  const [isOpenDateFieldModal, setIsOpenDateFieldModal] = useState<boolean>(false);
  const [isOpenTitleFieldModal, setIsOpenTitleFieldModal] = useState<boolean>(false);
  const dateFieldUiTypes: FieldUIType[] = availableFieldUiTypes.filter((uiType) => uiType.name === FieldUiTypeEnum.DateTime);
  const titleFieldUiTypes: FieldUIType[] = availableFieldUiTypes.filter((uiType) => uiType.name === FieldUiTypeEnum.Text);
  const getDateFields = (): ViewField[] => { return columns.filter((x) => x.uiField === FieldUiTypeEnum.DateTime); };
  const getTitleFields = (): ViewField[] => { return columns.filter((x) => x.uiField === FieldUiTypeEnum.Text); };
  const [dateFields, setDateFields] = useState<ViewField[]>(getDateFields());
  const [titleFields, setTitleFields] = useState<ViewField[]>(getTitleFields());
  const newDateField: any = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.DateTime,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: "",
  };
  const newTitleField: any = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.Text,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: "",
  };

  const reloadColumns = () => {
    const newDateFields: ViewField[] = getDateFields();
    const newTitleFields: ViewField[] = getTitleFields();

    if (newDateFields.length > 0) {
      setDateFieldId(newDateFields[0].id);
    }

    if (newTitleFields.length > 0) {
      setTitleFieldId(newTitleFields[0].id);
    }

    setDateFields(newDateFields);
    setTitleFields(newTitleFields);
    updateCalendarConfig(
      newDateFields.length > 0 ? newDateFields[0].id : 0,
      newTitleFields.length > 0 ? newTitleFields[0].id : 0
    );
  };

  useEffect(() => {
    reloadColumns();
  }, [columns]);

  const onDateFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if (value === "-1") {
      setIsOpenDateFieldModal(true);
      return;
    }

    setDateFieldId(convertToInteger(value));
    updateCalendarConfig(convertToInteger(value), titleFieldId);
  };

  const onTitleFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if (value === "-1") {
      setIsOpenTitleFieldModal(true);
      return;
    }

    setTitleFieldId(convertToInteger(value));
    updateCalendarConfig(dateFieldId, convertToInteger(value));
  };

  const updateCalendarConfig = (newDateFieldId: number, newTitleId: number) => {
    updateConfig({ dateFieldId: newDateFieldId, titleId: newTitleId });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <FormControl fullWidth>
          {/* <Typography variant="subtitle2" gutterBottom>
          Field
        </Typography> */}
          <InputLabel required id="select-field-label">
            DateTime
          </InputLabel>
          <Select
            labelId="select-field-label"
            label="Field"
            value={`${dateFieldId}`}
            onChange={onDateFieldChange}
            required
            error={submit && (!dateFieldId || dateFieldId === 0)}
            fullWidth
            // sx={{ width: { md: "168px" }, marginLeft: { xs: "8px", md: "30px" } }}
          >
            {dateFields.map((viewColumn: ViewField) => (
              <MenuItem key={`${viewColumn.id}`} value={`${viewColumn.id}`}>
                {viewColumn.name}
              </MenuItem>
            ))}
            <MenuItem key={"-1"} value={"-1"}>
              create a new field
            </MenuItem>
          </Select>
        </FormControl>
        {/* <Typography variant="subtitle2" gutterBottom>
          Title
        </Typography> */}
        <FormControl fullWidth>
          <InputLabel required id="select-title-label">
            Title
          </InputLabel>
          <Select
            labelId="select-title-label"
            label="Title"
            value={`${titleFieldId}`}
            required
            error={submit && (!titleFieldId || titleFieldId === 0)}
            onChange={onTitleFieldChange}
            fullWidth
            // sx={{
            //   width: { md: "168px" },
            //   marginLeft: { xs: "8px", md: "30px" },
            // }}
          >
            {titleFields.map((titleColumn: ViewField) => (
              <MenuItem key={`${titleColumn.id}`} value={`${titleColumn.id}`}>
                {titleColumn.name}
              </MenuItem>
            ))}
            <MenuItem key={"-1"} value={"-1"}>
              create a new field
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      {isOpenDateFieldModal && (
        <CreateFieldModal
          field={newDateField}
          fieldUiTypes={dateFieldUiTypes}
          open={isOpenDateFieldModal}
          handleClose={() => setIsOpenDateFieldModal(false)}
        />
      )}
      {isOpenTitleFieldModal && (
        <CreateFieldModal
          field={newTitleField}
          fieldUiTypes={titleFieldUiTypes}
          open={isOpenTitleFieldModal}
          handleClose={() => setIsOpenTitleFieldModal(false)}
        />
      )}
    </>
  );
}

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
});

export default connect(mapStateToProps)(CalendarViewConfig);
