import { useEffect, useState } from "react";
import {
  Box,
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
  config?: CalendarConfig
};

function CalendarViewConfig({
  submit,
  updateConfig,
  columns,
  availableFieldUiTypes,
  config
}: CalendarViewConfigProps) {
  const [titleFieldId, setTitleFieldId] = useState<number>(0);
  const [beginDateTimeId, setBeginDateTimeId] = useState<number>(0);
  const [endDateTimeId, setEndDateTimeId] = useState<number>(0);
  const [colorId, setColorId] = useState<number>(0);

  const [isOpenTitleFieldModal, setIsOpenTitleFieldModal] =
    useState<boolean>(false);
  const [isOpenBeginDateTimeModal, setIsOpenBeginDateTimeModal] =
    useState<boolean>(false);
  const [isOpenEndDateTimeModal, setIsOpenEndDateTimeModal] =
    useState<boolean>(false);
  const [isOpenColorModal, setIsOpenColorModal] = useState<boolean>(false);

  const titleFieldUiTypes: FieldUIType[] = availableFieldUiTypes.filter(
    (uiType) => uiType.name === FieldUiTypeEnum.Text
  );
  const dateTimeUiTypes: FieldUIType[] = availableFieldUiTypes.filter(
    (uiType) => uiType.name === FieldUiTypeEnum.DateTime
  );
  const colorUiTypes: FieldUIType[] = availableFieldUiTypes.filter(
    (uiType) => uiType.name === FieldUiTypeEnum.Text
  );

  const getTitleFields = (): ViewField[] => {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Text);
  };
  const getDateTimeFields = (): ViewField[] => {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.DateTime);
  };
  const getColorFields = (): ViewField[] => {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Text);
  };

  const [titleFields, setTitleFields] = useState<ViewField[]>(getTitleFields());
  const [beginDateTimeFields, setBeginDateTimeFields] = useState<ViewField[]>(
    getDateTimeFields()
  );
  const [endDateTimeFields, setEndDateTimeFields] = useState<ViewField[]>(
    getDateTimeFields()
  );
  const [colorFields, setColorFields] = useState<ViewField[]>(getColorFields());

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
  const newBeginDateTimeField: any = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.DateTime,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: "",
  };
  const newEndDateTimeField: any = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.DateTime,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: "",
  };
  const newColorField: any = {
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
    const newTitleFields: ViewField[] = getTitleFields();
    const newDateTimeFields: ViewField[] = getDateTimeFields();
    const newColorFields: ViewField[] = getColorFields();
    const defaultTitleId = config && config.titleId? config.titleId:(newTitleFields.length > 0 ? newTitleFields[0].id : 0);
    const defaultBeginDateTimeId = config && config.beginDateTimeId? config.beginDateTimeId:(newDateTimeFields.length > 0 ? newDateTimeFields[0].id : 0);
    const defaultEndDateTimeId = config && config.endDateTimeId? config.endDateTimeId:(newDateTimeFields.length > 1 ? newDateTimeFields[1].id : 0);
    const defaultColorId = config && config.colorId? config.colorId:(newColorFields.length > 0 ? newColorFields[0].id : 0);
    if (newTitleFields.length > 0) {
      setTitleFieldId(defaultTitleId);
    }

    if (newDateTimeFields.length > 0) {
      setBeginDateTimeId(defaultBeginDateTimeId);
    }

    if (newDateTimeFields.length > 1) {
      setEndDateTimeId(defaultEndDateTimeId);
    }

    if (newColorFields.length > 0) {
      setColorId(defaultColorId);
    }

    setTitleFields(newTitleFields);
    setBeginDateTimeFields(newDateTimeFields);
    setEndDateTimeFields(
      newDateTimeFields.length > 1 ? newDateTimeFields.slice(1) : []
    );
    setColorFields(newColorFields);

    updateCalendarConfig(
      defaultTitleId,
      defaultBeginDateTimeId,
      defaultEndDateTimeId,
      defaultColorId
    );
  };

  useEffect(() => {
    reloadColumns();
  }, [columns]);

  const onTitleFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if (value === "-1") {
      setIsOpenTitleFieldModal(true);
      return;
    }

    setTitleFieldId(convertToInteger(value));
    updateCalendarConfig(
      convertToInteger(value),
      beginDateTimeId,
      endDateTimeId,
      colorId
    );
  };

  const onBeginDateTimeChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    const newEndDateTimeFields = getDateTimeFields().filter(
      (dateTimeField: ViewField) => dateTimeField.id !== convertToInteger(value)
    );

    if (value === "-1") {
      setIsOpenBeginDateTimeModal(true);
      return;
    }

    setBeginDateTimeId(convertToInteger(value));
    setEndDateTimeFields(newEndDateTimeFields);

    if (convertToInteger(value) === endDateTimeId) {
      setEndDateTimeId(
        newEndDateTimeFields.length ? newEndDateTimeFields[0].id : 0
      );
    }

    updateCalendarConfig(
      titleFieldId,
      convertToInteger(value),
      endDateTimeId,
      colorId
    );
  };

  const onEndDateTimeChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if (value === "-1") {
      setIsOpenEndDateTimeModal(true);
      return;
    }

    setEndDateTimeId(convertToInteger(value));
    updateCalendarConfig(
      titleFieldId,
      beginDateTimeId,
      convertToInteger(value),
      colorId
    );
  };

  const onColorChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if (value === "-1") {
      setIsOpenColorModal(true);
      return;
    }

    setColorId(convertToInteger(value));
    updateCalendarConfig(
      titleFieldId,
      beginDateTimeId,
      endDateTimeId,
      convertToInteger(value)
    );
  };

  const updateCalendarConfig = (
    newTitleId: number,
    newBeginDateTimeId: number,
    newEndDateTimeId: number,
    newColorId: number
  ) => {
    updateConfig({
      titleId: newTitleId,
      beginDateTimeId: newBeginDateTimeId,
      endDateTimeId: newEndDateTimeId,
      colorId: newColorId,
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <FormControl fullWidth>
          <InputLabel required id="calendar_title_label">
            Title
          </InputLabel>
          <Select
            labelId="calendar_title_label"
            label="Title"
            value={`${titleFieldId}`}
            required
            error={submit && (!titleFieldId || titleFieldId === 0)}
            onChange={onTitleFieldChange}
            fullWidth
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
        <FormControl fullWidth>
          <InputLabel required id="calendar_begindatetime_label">
            Begin Date
          </InputLabel>
          <Select
            labelId="calendar_begindatetime_label"
            label="Begin Date"
            value={`${beginDateTimeId}`}
            onChange={onBeginDateTimeChange}
            required
            error={submit && (!beginDateTimeId || beginDateTimeId === 0)}
            fullWidth
          >
            {beginDateTimeFields.map((dateTimeField: ViewField) => (
              <MenuItem
                key={`${dateTimeField.id}`}
                value={`${dateTimeField.id}`}
              >
                {dateTimeField.name}
              </MenuItem>
            ))}
            <MenuItem key={"-1"} value={"-1"}>
              create a new field
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel required id="calendar_enddatetime_label">
            End Date
          </InputLabel>
          <Select
            labelId="calendar_enddatetime_label"
            label="End Date"
            value={`${endDateTimeId}`}
            onChange={onEndDateTimeChange}
            error={submit && (!endDateTimeId || endDateTimeId === 0)}
            fullWidth
          >
            {endDateTimeFields.map((dateTimeField: ViewField) => (
              <MenuItem
                key={`${dateTimeField.id}`}
                value={`${dateTimeField.id}`}
              >
                {dateTimeField.name}
              </MenuItem>
            ))}
            <MenuItem key={"-1"} value={"-1"}>
              create a new field
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel required id="calendar_color_label">
            Color
          </InputLabel>
          <Select
            labelId="calendar_color_label"
            label="Color"
            value={`${colorId}`}
            onChange={onColorChange}
            error={submit && (!colorId || colorId === 0)}
            fullWidth
          >
            {colorFields.map((colorField: ViewField) => (
              <MenuItem key={`${colorField.id}`} value={`${colorField.id}`}>
                {colorField.name}
              </MenuItem>
            ))}
            <MenuItem key={"-1"} value={"-1"}>
              create a new field
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      {isOpenTitleFieldModal && (
        <CreateFieldModal
          field={newTitleField}
          fieldUiTypes={titleFieldUiTypes}
          open={isOpenTitleFieldModal}
          handleClose={() => setIsOpenTitleFieldModal(false)}
        />
      )}
      {isOpenBeginDateTimeModal && (
        <CreateFieldModal
          field={newBeginDateTimeField}
          fieldUiTypes={dateTimeUiTypes}
          open={isOpenBeginDateTimeModal}
          handleClose={() => setIsOpenBeginDateTimeModal(false)}
        />
      )}
      {isOpenEndDateTimeModal && (
        <CreateFieldModal
          field={newEndDateTimeField}
          fieldUiTypes={dateTimeUiTypes}
          open={isOpenEndDateTimeModal}
          handleClose={() => setIsOpenEndDateTimeModal(false)}
        />
      )}
      {isOpenColorModal && (
        <CreateFieldModal
          field={newColorField}
          fieldUiTypes={colorUiTypes}
          open={isOpenColorModal}
          handleClose={() => setIsOpenColorModal(false)}
        />
      )}
    </>
  );
}

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
});

export default connect(mapStateToProps)(CalendarViewConfig);
