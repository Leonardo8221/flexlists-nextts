import { useEffect, useState } from "react";
import { Box, TextField, Typography, Divider, Button, Alert, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import CentralModal from "src/components/modal/CentralModal";
import { connect } from "react-redux";
import { setCurrentView } from "src/redux/actions/viewActions";
import { View } from "src/models/SharedModels";
import { listViewService } from "src/services/listView.service";
import { FlexlistsError, isSucc } from "src/models/ApiResponse";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { FieldValidatorEnum, ModelValidatorEnum, frontendValidate, isFrontendError } from "src/utils/validatorHelper";
import { setFlashMessage } from "src/redux/actions/authAction";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";


type RenameViewProps = {
  open: boolean;
  translations: TranslationText[];
  handleClose: () => void;
  currentView: View;
  setCurrentView: (newView: View) => void;
  setFlashMessage: (message: FlashMessageModel) => void
};

const RenameView = ({
  open,
  translations,
  handleClose,
  currentView,
  setCurrentView,
  setFlashMessage
}: RenameViewProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const [windowHeight, setWindowHeight] = useState(0);
  const [view, setView] = useState<View>(currentView);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [updating, setUpdating] = useState(false);

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
  const setError = (message: string) => {
    setFlashMessage({ message: message, type: 'error' })
  }
  const onSubmit = async () => {
    setIsSubmit(true)
    let _errors: { [key: string]: string | boolean } = {}

    const _setErrors = (e: { [key: string]: string | boolean }) => {
      _errors = e
    }
    let newViewName = await frontendValidate(ModelValidatorEnum.TableView, FieldValidatorEnum.name, view.name, _errors, _setErrors, true)
    if (isFrontendError(FieldValidatorEnum.name, _errors, setErrors, setError)) return
    setUpdating(true);
    var response = await listViewService.renameView(view.id, newViewName, view.description);
    if (isSucc(response)) {
      setCurrentView(view);
      handleClose();
    }
    else {
      setError((response as FlexlistsError).message)
    }
    setUpdating(false);
  };
  return (
    <CentralModal open={open} handleClose={handleClose}>
      <Typography variant="h6">{t("Rename View")}</Typography>
      <Divider sx={{ my: 2 }}></Divider>
      {updating ? (<CircularProgress />) : (
        <>
          <Box>
            <Typography variant="subtitle2">{t("Name")}</Typography>
            <TextField
              fullWidth
              onChange={handleViewNameChange}
              value={view?.name}
              placeholder={t("Name")}
              required
              error={isSubmit && isFrontendError(FieldValidatorEnum.name, errors)}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ mt: 2 }}>
              {t("Description")}
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
            <Button disabled={!isUpdate} sx={{ mt: 2 }} variant="contained" onClick={() => onSubmit()}>
              {t("Update")}
            </Button>
            <Button
              onClick={handleClose}
              sx={{ mt: 2, ml: 2, color: "#666" }}
              variant="text"
            >
              {t("Cancel")}
            </Button>
          </Box>
        </>)}

    </CentralModal>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  setCurrentView,
  setFlashMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(RenameView);
