import { useState, useEffect } from "react";
import {
  Button,
  Stack,
  TextField,
  Box,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { styled, lighten, darken } from "@mui/system";
import { FormControl } from "@mui/material";
import { Field, FieldUIType } from "src/models/SharedModels";
import { FieldType, FieldUiTypeEnum } from "src/enums/SharedEnums";
import ChoiceConfig from "./fieldConfig/ChoiceConfig";
import RelationConfig from "./fieldConfig/RelationConfig";
import { fieldService } from "src/services/field.service";
import { FlexlistsError, isSucc } from "src/models/ApiResponse";
import { CreateFieldOutputDto } from "src/models/ApiOutputModels";
import { connect } from "react-redux";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import {
  FieldValidatorEnum,
  ModelValidatorEnum,
  frontendValidate,
  isFrontendError,
} from "src/utils/validatorHelper";
import { setFlashMessage } from "src/redux/actions/authAction";
import { getDefaultFieldIcon, getFieldIcons } from "src/utils/flexlistHelper";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

type FieldFormPanelProps = {
  translations: TranslationText[];
  viewId: number;
  field: Field;
  fieldUiTypes: FieldUIType[];
  onAdd: (field: Field) => void;
  onUpdate: (field: Field) => void;
  onDelete: (id: number) => void;
  onClose: () => void;
  setFlashMessage: (message: FlashMessageModel) => void;
}

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

const FieldFormPanel = ({
  translations,
  viewId,
  field,
  fieldUiTypes,
  onAdd,
  onUpdate,
  onDelete,
  onClose,
  setFlashMessage,
}: FieldFormPanelProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const theme = useTheme();
  const isCreating: boolean = !field.id || field.id == 0;
  const [currentField, setCurrentField] = useState<Field>(field);
  const [currentFieldType, setCurrentFieldType] = useState<
    FieldUIType | undefined
  >(fieldUiTypes.find((x) => x.name === field.uiField));
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [visibleIconList, setVisibleIconList] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    setIsSubmit(false);
    setVisibleIconList(false);
    if (field) {
      setCurrentField(field);
      setCurrentFieldType(fieldUiTypes.find((x) => x.name === field.uiField));
    }
  }, [field]);

  const setError = (message: string) => {
    setFlashMessage({ message: message, type: "error" });
  };

  const handleSubmit = async () => {
    setIsSubmit(true);

    let _errors: { [key: string]: string | boolean } = {};

    const _setErrors = (e: { [key: string]: string | boolean }) => {
      _errors = e;
    };
    let newGroupName = await frontendValidate(
      ModelValidatorEnum.FieldDefinition,
      FieldValidatorEnum.name,
      currentField.name,
      _errors,
      _setErrors,
      true
    );
    if (isFrontendError(FieldValidatorEnum.name, _errors, setErrors, setError))
      return;
    if (!currentField.icon) {
      currentField.icon = getDefaultFieldIcon(
        currentField.uiField as FieldUiTypeEnum
      );
    }
    if (
      currentField.name && !currentField.system &&
      (currentField.name.toLowerCase() === "id" ||
        currentField.name.toLowerCase() === "createdat" ||
        currentField.name.toLowerCase() === "updatedat" ||
        currentField.name.toLowerCase() === "___archived")
    ) {
      setError(`Field name cannot be ${currentField.name}`);
      return;
    }
    if (currentField.uiField == FieldUiTypeEnum.Lookup || currentField.uiField == FieldUiTypeEnum.Sublist) {
      if (!currentField.config.values) {
        setError(`Empty field config`);
        return;
      }
    }
    if (currentField.uiField == FieldUiTypeEnum.Choice) {
      if (!currentField.config||!currentField.config.values||currentField.config.values.length==0) {
        setError(`Empty choice field config`);
        return;
      }
    }
    if (isCreating) {
      
      
      var createFieldResponse = await fieldService.createUIField(
        viewId,
        currentField.name,
        currentField.uiField,
        currentField.required,
        currentField.detailsOnly,
        currentField.description,
        currentField.config,
        currentField.icon,
        currentField.defaultValue
      );
      if (isSucc(createFieldResponse) && createFieldResponse.data) {
        currentField.id = (
          createFieldResponse.data as CreateFieldOutputDto
        ).fieldId;
        onAdd(currentField);
      } else {
        setFlashMessage({
          message: createFieldResponse.message,
          type: "error",
        });
        return;
      }
    } else {
      var updateFieldResponse = await fieldService.updateUiField(
        viewId,
        field.id,
        currentField.name,
        currentField.uiField,
        currentField.required,
        currentField.detailsOnly,
        currentField.description,
        currentField.config,
        currentField.icon,
        currentField.defaultValue
      );
      console.log(updateFieldResponse);
      if (isSucc(updateFieldResponse)) {
        onUpdate(currentField);
      } else {
        setFlashMessage({
          message: (updateFieldResponse as FlexlistsError).message,
          type: "error",
        });
        return;
      }
    }

    onClose();
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newField = Object.assign({}, currentField);
    newField.name = event.target.value;
    setCurrentField(newField);
  };

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newField = Object.assign({}, currentField);
    newField.description = event.target.value;
    setCurrentField(newField);
  };

  const handleFieldTypeChange = (newTypeInput?: FieldUIType | null) => {
    if (!newTypeInput) {
      return;
    }
    var newField = Object.assign({}, currentField);
    if (newTypeInput.baseType) {
      newField.type = newTypeInput.baseType;
    }
    if (newTypeInput.name) {
      newField.uiField = newTypeInput.name;
    }

    setCurrentFieldType(newTypeInput);
    setCurrentField(newField);
  };

  const onIconChange = (newIcon: string) => {
    var newField = Object.assign({}, currentField);
    newField.icon = newIcon;
    setCurrentField(newField);
    setVisibleIconList(false);
  };

  const onRequiredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newField = Object.assign({}, currentField);
    newField.required = event.target.checked;
    setCurrentField(newField);
  };

  const onDetailsOnlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var newField = Object.assign({}, currentField);
    newField.detailsOnly = event.target.checked;
    setCurrentField(newField);
  };
  
  const updateConfig = (newConfig: any) => {
    var newField = Object.assign({}, currentField);
    if (!newField.config) {
      newField.config = { values: [] };
    }

    newField.config.values = newConfig;
    setCurrentField(newField);
  };
  const renderFieldConfigSwitch = (field: Field) => {
    var uiType = field.uiField;
    switch (uiType) {
      case FieldUiTypeEnum.Choice:
        return (
          <ChoiceConfig
            choices={field.config?.values ?? []}
            updateChoices={(newChoices) => updateConfig(newChoices)}
          />
        );

      case FieldUiTypeEnum.Lookup:
        return (
          <RelationConfig
            isSubmit={isSubmit}
            values={field.config?.values ?? null}
            updateRelations={(newRelation) => updateConfig(newRelation)}
          />
        );

      case FieldUiTypeEnum.Sublist:
        return (
          <RelationConfig
            isSubmit={isSubmit}
            values={field.config?.values ?? null}
            updateRelations={(newRelation) => updateConfig(newRelation)}
          />
        );

      default:
        return <></>;
        break;
    }
  };

  return (
    // <Drawer
    //   anchor="right"
    //   open={open}
    //   onClose={onClose}
    //   PaperProps={{
    //     sx: {
    //       width: {xs: '100%', lg: '500px'},
    //       border: 'none',
    //       height: `${windowHeight}px`,
    //       backgroundColor: theme.palette.palette_style.background.default,
    //     },
    //   }}
    //   // onClick={handleModalClick}
    // >
    //   <DialogTitle textAlign="center" sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>Create New Field</DialogTitle>
    //   <DialogContent>
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack></Stack>
      <Stack
        sx={{
          width: "100%",
          minWidth: { xs: "300px", sm: "360px", md: "400px" },
          gap: "1.5rem",
          paddingTop: 2,
        }}
      >
        <TextField
          label={t("Name")}
          name="name"
          size="small"
          value={currentField.name}
          onChange={onNameChange}
          required
          disabled={!isCreating && field.system}
          error={isSubmit && isFrontendError(FieldValidatorEnum.name, errors)}
        />
        <TextField
          label={t("Description")}
          name="name"
          size="small"
          value={currentField.description}
          onChange={onDescriptionChange}
          disabled={!isCreating && field.system}
        />
        <FormControl sx={{ marginTop: 2 }} required>
          <Autocomplete
            id="grouped-types"
            filterSelectedOptions={false}
            options={fieldUiTypes}
            groupBy={(option) => option.group}
            getOptionLabel={(option) => option.name}
            disabled={!isCreating && field.system}
            disableClearable={true}
            fullWidth
            // inputValue={currentField.type}
            value={currentFieldType}
            onChange={(event, newInputValue) => {
              handleFieldTypeChange(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("Field Type")}
                error={isSubmit && !currentField.uiField}
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
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={currentField.required}
                onChange={onRequiredChange}
                name="required"
                disabled={!isCreating && field.system}
              />
            }
            label={t("Required")}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={currentField.detailsOnly}
                onChange={onDetailsOnlyChange}
                name="required"
              />
            }
            label={t("DetailsOnly")}
          />
        </FormGroup>
        <FormControl sx={{ marginTop: 2 }} required>
          <TextField
            type="text"
            className="add_icon"
            label={t("Select Icon")}
            value={
              currentField.icon
                ? currentField.icon
                : getDefaultFieldIcon(currentField.uiField as FieldUiTypeEnum)
            }
            name="icon"
            size="small"
            onFocus={() => {
              setVisibleIconList(true);
            }}
            required
            InputLabelProps={{ shrink: true }}
            disabled={!isCreating && field.system}
            // error={submit && !currentField.icon}
          />
          {visibleIconList && (
            <Box sx={{ py: 1 }}>
              {getFieldIcons().map((icon: string, index: number) => (
                <Box
                  key={icon + index}
                  component="span"
                  className="svg-color add_icon"
                  title={icon}
                  sx={{
                    width: 18,
                    height: 18,
                    display: "inline-block",
                    bgcolor: theme.palette.palette_style.text.primary,
                    mask: `url(/assets/icons/table/${icon}.svg) no-repeat center / contain`,
                    WebkitMask: `url(/assets/icons/table/${icon}.svg) no-repeat center / contain`,
                    mx: 1.7,
                    my: 1.5,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    onIconChange(icon);
                  }}
                />
              ))}
            </Box>
          )}

          {/* <TextField
                  label="Default Value"
                  name="DefaultValue"
                  size="small"
                  type='string'
                  value={currentField.defaultValue}
                  onChange={onMinimumChange}
                  /> */}
        </FormControl>
        {renderFieldConfigSwitch(currentField)}
      </Stack>
      <Box
        sx={{
          my: 2,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Button variant="outlined" onClick={onClose}>
          {t("Cancel")}
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isCreating ? t("Create Field") : t("Update Field")}
        </Button>
      </Box>
    </form>
    //   </DialogContent>
    //   <DialogActions sx={{ p: '1.25rem' }}>
    //     <Button onClick={onClose}>Cancel</Button>
    //     <Button color="secondary" onClick={handleSubmit} variant="contained">
    //       Create New Field
    //     </Button>
    //   </DialogActions>
    // </Drawer>
  );
}
// const mapStateToProps = (state: any) => ({
// });

// const mapDispatchToProps = {

// };

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  setFlashMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldFormPanel);
