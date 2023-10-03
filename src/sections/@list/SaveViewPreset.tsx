import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { cloneDeep, set } from "lodash";
import { useState } from "react";
import { connect } from "react-redux";
import { PresetType } from "src/enums/SharedEnums";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { View } from "src/models/SharedModels";
import { setFlashMessage } from "src/redux/actions/authAction";
import {
  getCurrentView,
  setCurrentView,
  setDefaultPreset,
} from "src/redux/actions/viewActions";
import { saveViewPreset } from "src/services/listView.service";
import { FlexlistsError, isSucc } from "src/utils/responses";
import {
  FieldValidatorEnum,
  ModelValidatorEnum,
  frontendValidate,
  isFrontendError,
} from "src/utils/validatorHelper";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

type SaveViewPresetProps = {
  translations: TranslationText[];
  currentView: View;
  setCurrentView: (view: View) => void;
  handleClose: () => void;
  setFlashMessage: (message: FlashMessageModel) => void;
  setDefaultPreset: (preset: any) => void;
  getCurrentView: (viewId: number) => void;
};
function SaveViewPreset({
  translations,
  currentView,
  getCurrentView,
  setCurrentView,
  setDefaultPreset,
  handleClose,
  setFlashMessage,
}: SaveViewPresetProps) {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const [type, setType] = useState<PresetType>(PresetType.View);
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType((event.target as HTMLInputElement).value as PresetType);
  };
  const handleViewNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setIsNameValid(true);
  };
  const setError = (message: string) => {
    setFlashMessage({ message: message, type: "error" });
  };
  const onSubmit = async () => {
    setIsSubmit(true);
    let _errors: { [key: string]: string | boolean } = {};

    const _setErrors = (e: { [key: string]: string | boolean }) => {
      _errors = e;
    };
    let newName: string = "";
    if (type !== PresetType.View) {
      newName = await frontendValidate(
        ModelValidatorEnum.TableView,
        FieldValidatorEnum.name,
        name,
        _errors,
        _setErrors,
        true
      );
      if (
        isFrontendError(FieldValidatorEnum.name, _errors, setErrors, setError)
      )
        return;
      if (
        newName?.trim().toLowerCase() === "default" ||
        newName?.trim().toLowerCase() === "show all" ||
        newName?.trim().toLowerCase() === "archived" ||
        newName?.trim().toLowerCase() === "unarchived"
      ) {
        setIsNameValid(false);
        setFlashMessage({ message: t("Name Already Exist"), type: "error" });
        return;
      }
      if (
        currentView &&
        currentView.presets &&
        currentView.presets.length > 0
      ) {
        const isExist = currentView.presets.find(
          (p) => p.name.toLowerCase() === newName?.toLowerCase()
        );
        if (isExist) {
          setFlashMessage({ message: t("Name Already Exist"), type: "error" });
          return;
        }
      }
    }
    var response = await saveViewPreset(
      currentView.id,
      type,
      newName,
      currentView.page,
      currentView.limit,
      currentView.order,
      currentView.query,
      currentView.conditions,
      currentView.fields
    );
    if (isSucc(response)) {
      let newView = cloneDeep(currentView);
      if (type === PresetType.View) {
        setDefaultPreset({
          name: t("Default"),
          type: type,
          page: newView.page,
          limit: newView.limit,
          order: newView.order,
          query: currentView.query,
          conditions: newView.conditions,
          fields: newView.fields,
        });
      } else {
        if (!newView.presets) {
          newView.presets = [];
        }
        let cloneView = cloneDeep(currentView);
        newView.presets.push({
          name: newName,
          type: type,
          page: cloneView.page,
          limit: cloneView.limit,
          order: cloneView.order,
          query: cloneView.query,
          conditions: cloneView.conditions,
          fields: cloneView.fields,
        });
        setCurrentView(newView);
      }
      // if(type === PresetType.View)
      // {
      //   setDefaultPreset({
      //     name:'Default',
      //     type:cloneDeep(type),
      //     page:cloneDeep(currentView.page),
      //     limit:cloneDeep(currentView.limit),
      //     order:cloneDeep(currentView.order),
      //     query:cloneDeep(currentView.query),
      //     conditions:cloneDeep(currentView.conditions),
      //     fields:cloneDeep(currentView.fields)
      //   })
      // }
      // else
      // {
      //     let newView = cloneDeep(currentView)

      //     if(!newView.presets)
      //     {
      //       newView.presets = []
      //     }
      //     newView.presets.push({
      //         name:newName,
      //         type:cloneDeep(type),
      //         page:cloneDeep(currentView.page),
      //         limit:cloneDeep(currentView.limit),
      //         order:cloneDeep(currentView.order),
      //         query:cloneDeep(currentView.query),
      //         conditions:cloneDeep(currentView.conditions),
      //         fields:cloneDeep(currentView.fields)
      //     });
      //     setCurrentView(newView)
      // }

      setFlashMessage({
        message: t("Save View Preset"),
        type: "success",
      });
      handleClose();
    } else {
      setError((response as FlexlistsError).message);
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <FormControl sx={{ gap: 1 }}>
        <FormLabel id="demo-row-radio-buttons-group-label">
          {t("Preset Types")}
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={type}
          onChange={handleTypeChange}
        >
          {
            !currentView?.isDefaultView &&
            <FormControlLabel
              value={t("View")}
              control={<Radio />}
              label={PresetType.View}
            />
          }

          <FormControlLabel
            value={t("Yourself")}
            control={<Radio />}
            label={PresetType.Yourself}
          />
          <FormControlLabel
            value={t("Everyone")}
            control={<Radio />}
            label={PresetType.Everyone}
          />
        </RadioGroup>
      </FormControl>
      {(type === PresetType.Everyone || type === PresetType.Yourself) && (
        <TextField
          fullWidth
          onChange={handleViewNameChange}
          value={name}
          label={t("Preset Name")}
          InputLabelProps={{
            shrink: true,
          }}
          // placeholder="Name"
          required
          error={
            isSubmit &&
            (!isNameValid || isFrontendError(FieldValidatorEnum.name, errors))
          }
        />
      )}
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
        >
          {t("Cancel")}
        </Button>
        <Button variant="contained" onClick={() => onSubmit()}>
          {t("Save")}
        </Button>

      </Box>
    </Box>
  );
}

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  setCurrentView,
  setFlashMessage,
  setDefaultPreset,
  getCurrentView,
};

export default connect(mapStateToProps, mapDispatchToProps)(SaveViewPreset);
