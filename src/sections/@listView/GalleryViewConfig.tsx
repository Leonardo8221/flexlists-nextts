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
  columns: ViewField[];
  availableFieldUiTypes: FieldUIType[];
  updateConfig: (config: GalleryConfig) => void;
};

function GalleryViewConfig({
  translations,
  submit,
  columns,
  availableFieldUiTypes,
  updateConfig,
}: GalleryViewConfigProps) {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const [imageFieldId, setImageFieldId] = useState<number>(0);
  const [titleFieldId, setTitleFieldId] = useState<number>(0);
  const [isOpenImageFieldModal, setIsOpenImageFieldModal] = useState<boolean>(false);
  const [isOpenTitleFieldModal, setIsOpenTitleFieldModal] = useState<boolean>(false);
  const imageFieldUiTypes: FieldUIType[] = availableFieldUiTypes.filter(
    (uiType) => uiType.name === FieldUiTypeEnum.Image
  );
  const titleFieldUiTypes: FieldUIType[] = availableFieldUiTypes.filter(
    (uiType) => uiType.name === FieldUiTypeEnum.Text
  );

  const getImageFields = (): ViewField[] => {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Image);
  };

  const getTitleFields = (): ViewField[] => {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Text);
  };

  const [imageFields, setImageFields] = useState<ViewField[]>(getImageFields());
  const [titleFields, setTitleFields] = useState<ViewField[]>(getTitleFields());

  const newImageField: any = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.Image,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: "",
  };
  const newTitleField : any  = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.Text,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: ""
  };

  const reloadColumns = () => {
    const newImageFields: ViewField[] = getImageFields();
    const newTitleFields: ViewField[] = getTitleFields();

    if (newImageFields.length > 0) {
      setImageFieldId(newImageFields[0].id);
    }

    if (newTitleFields.length > 0) {
      setTitleFieldId(newTitleFields[0].id);
    }

    setImageFields(newImageFields);
    setTitleFields(newTitleFields);
    
    updateGalleryConfig(
      newImageFields.length > 0 ? newImageFields[0].id : 0,
      newTitleFields.length > 0 ? newTitleFields[0].id : 0
    );
  };

  useEffect(() => {
    reloadColumns();
  }, [columns]);

  const onImageFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if (value === "-1") {
      setIsOpenImageFieldModal(true);
      return;
    }

    setImageFieldId(convertToInteger(value));
    updateGalleryConfig(
      convertToInteger(value),
      titleFieldId
    );
  };

  const onTitleFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if (value === "-1") {
      setIsOpenTitleFieldModal(true);
      return;
    }

    setTitleFieldId(convertToInteger(value));
    updateGalleryConfig(
      titleFieldId,
      convertToInteger(value)
    );
  };

  const updateGalleryConfig = (
    newImageFieldId: number,
    newTitleId: number
  ) => {
    updateConfig({
      imageId: newImageFieldId,
      titleId: newTitleId
    });
  };

  return (
    <Box sx={{ pt: 2 }}>
      <FormControl fullWidth>
        <InputLabel required id="select-image-label">
          {t("Image")}
        </InputLabel>
        <Select
          label={t("Image")}
          labelId="select-image-label"
          value={`${imageFieldId}`}
          onChange={onImageFieldChange}
          required
          error={submit && (!imageFieldId || imageFieldId === 0)}
          fullWidth
        >
          {imageFields.map((viewColumn: ViewField) => (
            <MenuItem key={`${viewColumn.id}`} value={`${viewColumn.id}`}>
              {viewColumn.name}
            </MenuItem>
          ))}
          <MenuItem key={"-1"} value={"-1"}>
            {t("Create New Field")}
          </MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ pt: 2, width: '100%' }}>
        <Typography variant="subtitle2" gutterBottom>
          {t("Title")}
        </Typography>
        <Select
          value={`${titleFieldId}`}
          required
          error={submit && (!titleFieldId || titleFieldId === 0)}
          onChange={onTitleFieldChange}
          fullWidth
          sx={{ marginLeft: 0 }}
        >
          {titleFields.map((nameColumn: ViewField) => (
            <MenuItem key={`${nameColumn.id}`} value={`${nameColumn.id}`}>
              {nameColumn.name}
            </MenuItem>
          ))}
          <MenuItem key={"-1"} value={"-1"}>
            {t("Create New Field")}
          </MenuItem>
        </Select>
      </Box>
      {isOpenImageFieldModal && (
        <CreateFieldModal
          translations={translations}
          field={newImageField}
          fieldUiTypes={imageFieldUiTypes}
          open={isOpenImageFieldModal}
          handleClose={() => setIsOpenImageFieldModal(false)}
        />
      )}
      {isOpenTitleFieldModal && (
        <CreateFieldModal
          translations={translations}
          field={newTitleField}
          fieldUiTypes={titleFieldUiTypes}
          open={isOpenTitleFieldModal}
          handleClose={() => setIsOpenTitleFieldModal(false)}
        />
      )}
    </Box>
  );
}

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryViewConfig);
