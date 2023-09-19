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
import { GalleryConfig } from "src/models/ViewConfig";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

type GalleryViewConfigProps = {
  translations: TranslationText[];
  submit: boolean;
  updateConfig: (config: GalleryConfig) => void;
  columns: ViewField[];
  availableFieldUiTypes: FieldUIType[];
};

function GalleryViewConfig({
  translations,
  submit,
  updateConfig,
  columns,
  availableFieldUiTypes,
}: GalleryViewConfigProps) {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const [avatarFieldId, setAvatarFieldId] = useState<number>(0);
  const [nameFieldId, setNameFieldId] = useState<number>(0);
  const [importanceFieldId, setImportanceFieldId] = useState<number>(0);
  const [descriptionFieldId, setDescriptionFieldId] = useState<number>(0);
  const [isOpenAvatarFieldModal, setIsOpenAvatarFieldModal] =
    useState<boolean>(false);
  const [isOpenNameFieldModal, setIsOpenNameFieldModal] =
    useState<boolean>(false);
  const [isOpenImportanceFieldModal, setIsOpenImportanceFieldModal] =
    useState<boolean>(false);
  const [isOpenDescriptionFieldModal, setIsOpenDescriptionFieldModal] =
    useState<boolean>(false);
  const avatarFieldUiTypes: FieldUIType[] = availableFieldUiTypes.filter(
    (uiType) => uiType.name === FieldUiTypeEnum.Image
  );
  const nameFieldUiTypes: FieldUIType[] = availableFieldUiTypes.filter(
    (uiType) => uiType.name === FieldUiTypeEnum.Text
  );
  const importanceFieldUiTypes: FieldUIType[] = availableFieldUiTypes.filter(
    (uiType) => uiType.name === FieldUiTypeEnum.Choice
  );
  const descriptionFieldUiTypes: FieldUIType[] = availableFieldUiTypes.filter(
    (uiType) => uiType.name === FieldUiTypeEnum.LongText
  );

  const getAvatarFields = (): ViewField[] => {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Image);
  };

  const getNameFields = (): ViewField[] => {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Text);
  };

  const getImportanceFields = (): ViewField[] => {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Choice);
  };

  const getDescriptionFields = (): ViewField[] => {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.LongText);
  };

  const [avatarFields, setAvatarFields] = useState<ViewField[]>(
    getAvatarFields()
  );
  const [nameFields, setNameFields] = useState<ViewField[]>(getNameFields());
  const [importanceFields, setImportanceFields] = useState<ViewField[]>(
    getImportanceFields()
  );
  const [descriptionFields, setDescriptionFields] = useState<ViewField[]>(
    getDescriptionFields()
  );

  const newAvatarField: any = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.Image,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: "",
  };
  // const newNameField : any  = {
  //   name: "",
  //   required: true,
  //   uiField: FieldUiTypeEnum.Text,
  //   description: "",
  //   detailsOnly: false,
  //   icon: "",
  //   config: {},
  //   defaultValue: ""
  // };
  // const newImportanceField : any  = {
  //   name: "",
  //   required: true,
  //   uiField: FieldUiTypeEnum.Choice,
  //   description: "",
  //   detailsOnly: false,
  //   icon: "",
  //   config: {},
  //   defaultValue: ""
  // };
  // const newDescriptionField : any  = {
  //   name: "",
  //   required: true,
  //   uiField: FieldUiTypeEnum.LongText,
  //   description: "",
  //   detailsOnly: false,
  //   icon: "",
  //   config: {},
  //   defaultValue: ""
  // };

  const reloadColumns = () => {
    const newAvatarFields: ViewField[] = getAvatarFields();
    const newNameFields: ViewField[] = getNameFields();
    const newImportanceFields: ViewField[] = getImportanceFields();
    const newDescriptionFields: ViewField[] = getDescriptionFields();

    if (newAvatarFields.length > 0) {
      setAvatarFieldId(newAvatarFields[0].id);
    }

    if (newNameFields.length > 0) {
      setNameFieldId(newNameFields[0].id);
    }

    if (newImportanceFields.length > 0) {
      setImportanceFieldId(newImportanceFields[0].id);
    }

    if (newDescriptionFields.length > 0) {
      setDescriptionFieldId(newDescriptionFields[0].id);
    }

    setAvatarFields(newAvatarFields);
    setNameFields(newNameFields);
    setImportanceFields(newImportanceFields);
    setDescriptionFields(newDescriptionFields);
    updateGalleryConfig(
      newAvatarFields.length > 0 ? newAvatarFields[0].id : 0,
      newNameFields.length > 0 ? newNameFields[0].id : 0,
      newImportanceFields.length > 0 ? newImportanceFields[0].id : 0,
      newDescriptionFields.length > 0 ? newDescriptionFields[0].id : 0
    );
  };

  useEffect(() => {
    reloadColumns();
  }, [columns]);

  const onAvatarFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if (value === "-1") {
      setIsOpenAvatarFieldModal(true);
      return;
    }

    setAvatarFieldId(convertToInteger(value));
    updateGalleryConfig(
      convertToInteger(value),
      nameFieldId,
      importanceFieldId,
      descriptionFieldId
    );
  };

  const onNameFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if (value === "-1") {
      setIsOpenNameFieldModal(true);
      return;
    }

    setNameFieldId(convertToInteger(value));
    updateGalleryConfig(
      avatarFieldId,
      convertToInteger(value),
      importanceFieldId,
      descriptionFieldId
    );
  };

  const onImportanceFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if (value === "-1") {
      setIsOpenImportanceFieldModal(true);
      return;
    }

    setImportanceFieldId(convertToInteger(value));
    updateGalleryConfig(
      avatarFieldId,
      nameFieldId,
      convertToInteger(value),
      descriptionFieldId
    );
  };

  const onDescriptionFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if (value === "-1") {
      setIsOpenDescriptionFieldModal(true);
      return;
    }

    setDescriptionFieldId(convertToInteger(value));
    updateGalleryConfig(
      avatarFieldId,
      nameFieldId,
      importanceFieldId,
      convertToInteger(value)
    );
  };

  const updateGalleryConfig = (
    newDateFieldId: number,
    newNameId: number,
    newImportanceId: number,
    newDescriptionId: number
  ) => {
    updateConfig({
      avatarId: newDateFieldId,
      nameId: newNameId,
      importanceId: newImportanceId,
      descriptionId: newDescriptionId,
    });
  };

  return (
    <Box sx={{ pt: 2 }}>
      <FormControl fullWidth>
        {/* <Typography variant="subtitle2" gutterBottom>
          Avatar
        </Typography> */}
        <InputLabel required id="select-image-label">
          {t("Image")}
        </InputLabel>
        <Select
          label={t("Image")}
          labelId="select-image-label"
          value={`${avatarFieldId}`}
          onChange={onAvatarFieldChange}
          required
          error={submit && (!avatarFieldId || avatarFieldId === 0)}
          fullWidth
          // sx={{ width: { md: "168px" }, marginLeft: { xs: "8px", md: "30px" } }}
        >
          {avatarFields.map((viewColumn: ViewField) => (
            <MenuItem key={`${viewColumn.id}`} value={`${viewColumn.id}`}>
              {viewColumn.name}
            </MenuItem>
          ))}
          <MenuItem key={"-1"} value={"-1"}>
            {t("Create New Field")}
          </MenuItem>
        </Select>
      </FormControl>
      {/* <Box sx={{ pt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Task Name
        </Typography>
        <Select
          value={`${nameFieldId}`}
          required
          error={submit && (!nameFieldId || nameFieldId === 0)}
          onChange={onNameFieldChange}
          fullWidth
          sx={{ width: { md: "168px" }, marginLeft: { xs: "8px", md: "30px" } }}
        >
          {nameFields.map((nameColumn: ViewField) => (
            <MenuItem key={`${nameColumn.id}`} value={`${nameColumn.id}`}>
              {nameColumn.name}
            </MenuItem>
          ))}
          <MenuItem key={"-1"} value={"-1"}>
            create a new field
          </MenuItem>
        </Select>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Importance
        </Typography>
        <Select
          value={`${importanceFieldId}`}
          required
          error={submit && (!importanceFieldId || importanceFieldId === 0)}
          onChange={onImportanceFieldChange}
          fullWidth
          sx={{ width: { md: "168px" }, marginLeft: { xs: "8px", md: "30px" } }}
        >
          {importanceFields.map((importanceColumn: ViewField) => (
            <MenuItem
              key={`${importanceColumn.id}`}
              value={`${importanceColumn.id}`}
            >
              {importanceColumn.name}
            </MenuItem>
          ))}
          <MenuItem key={"-1"} value={"-1"}>
            create a new field
          </MenuItem>
        </Select>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>
          Task Description
        </Typography>
        <Select
          value={`${descriptionFieldId}`}
          required
          error={submit && (!descriptionFieldId || descriptionFieldId === 0)}
          onChange={onDescriptionFieldChange}
          fullWidth
          sx={{ width: { md: "168px" }, marginLeft: { xs: "8px", md: "30px" } }}
        >
          {descriptionFields.map((descriptionColumn: ViewField) => (
            <MenuItem
              key={`${descriptionColumn.id}`}
              value={`${descriptionColumn.id}`}
            >
              {descriptionColumn.name}
            </MenuItem>
          ))}
          <MenuItem key={"-1"} value={"-1"}>
            create a new field
          </MenuItem>
        </Select>
      </Box> */}
      {isOpenAvatarFieldModal && (
        <CreateFieldModal
          translations={translations}
          field={newAvatarField}
          fieldUiTypes={avatarFieldUiTypes}
          open={isOpenAvatarFieldModal}
          handleClose={() => setIsOpenAvatarFieldModal(false)}
        />
      )}
      {/* {isOpenNameFieldModal && (
        <CreateFieldModal
          translations={translations}
          field={newNameField}
          fieldUiTypes={nameFieldUiTypes}
          open={isOpenNameFieldModal}
          handleClose={() => setIsOpenNameFieldModal(false)}
        />
      )}
      {isOpenImportanceFieldModal && (
        <CreateFieldModal
          translations={translations}
          field={newImportanceField}
          fieldUiTypes={importanceFieldUiTypes}
          open={isOpenImportanceFieldModal}
          handleClose={() => setIsOpenImportanceFieldModal(false)}
        />
      )}
      {isOpenDescriptionFieldModal && (
        <CreateFieldModal
          translations={translations}
          field={newDescriptionField}
          fieldUiTypes={descriptionFieldUiTypes}
          open={isOpenDescriptionFieldModal}
          handleClose={() => setIsOpenDescriptionFieldModal(false)}
        />
      )} */}
    </Box>
  );
}

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryViewConfig);
