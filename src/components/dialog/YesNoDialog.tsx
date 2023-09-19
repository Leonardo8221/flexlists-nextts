import React from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import CentralModal from "src/components/modal/CentralModal";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

type YesNoDialogProps = {
  translations: TranslationText[];
  title:string;
  submitText:string;
  message: string;
  open: boolean;
  onSubmit: () => void;
  handleClose: () => void;
};

const YesNoDialog = ({title,submitText, message, open, translations, handleClose,onSubmit }: YesNoDialogProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const handleSubmit = async () => {
    onSubmit()
    handleClose()
  }
  return (
    <CentralModal open={open} handleClose={handleClose}>
      <Typography variant="h6">{title}</Typography>
      <Divider sx={{ my: 2 }}></Divider>
      <Box>
        <Typography variant="body1">
          {message}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => handleSubmit()}>
          {submitText}
        </Button>
        <Button
          onClick={handleClose}
          sx={{ mt: 2, ml: 2, color: "#666" }}
          variant="text"
        >
          {t("Cancel")}
        </Button>
      </Box>
    </CentralModal>
  );
};
export default YesNoDialog;
