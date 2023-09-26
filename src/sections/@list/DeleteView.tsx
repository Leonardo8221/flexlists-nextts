import React from "react";
import {
  Box,
  Button,
  Divider,
  Checkbox,
  FormGroup,
  TextField,
  Typography,
  FormControlLabel,
} from "@mui/material";
import CentralModal from "src/components/modal/CentralModal";
import { useRouter } from "next/router";
import { listViewService } from "src/services/listView.service";
import { isSucc } from "src/models/ApiResponse";
import { PATH_MAIN } from "src/routes/paths";
import { TranslationText, View } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";
import { connect } from "react-redux";
import { setCurrentListViews } from "src/redux/actions/viewActions";

type DeleteViewProps = {
  viewId: number;
  open: boolean;
  translations: TranslationText[];
  handleClose: () => void;
  currentListViews:View[];
};

const DeleteView = ({ viewId, open, translations, handleClose ,currentListViews}: DeleteViewProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const router = useRouter();
  const onSubmit = async () => {
    let response = await listViewService.softDeleteView(viewId)
    if (isSucc(response)) {
      let defaultView = currentListViews.find(x=>x.isDefaultView);
      if(defaultView)
      {
        await router.push(`${PATH_MAIN.lists}/${defaultView.id}`)
      }
      else
      {
        await router.push(PATH_MAIN.views)
      }
      
    }
  }
  return (
    <CentralModal open={open} handleClose={handleClose}>
      <Typography variant="h6">{t("Delete View")}</Typography>
      <Divider sx={{ my: 2 }}></Divider>
      <Box>
        <Typography variant="body1">
          {t("Sure Delete")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button sx={{ mt: 2 }} variant="contained" onClick={() => onSubmit()}>
          {t("Delete")}
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
const mapStateToProps = (state: any) => ({
  currentListViews: state.view.currentListViews,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteView);
