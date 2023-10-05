import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Button,
  Drawer
} from "@mui/material";
import AddViewCard from "src/components/add-view/AddViewCard";
import WysiwygEditor from "src/components/wysiwyg/wysiwygEditor";
import { FieldUIType, View } from "src/models/SharedModels";
import { connect } from "react-redux";
import { ViewType } from "src/enums/SharedEnums";
import { listViewService } from "src/services/listView.service";
import { isSucc } from "src/models/ApiResponse";
import { useRouter } from "next/router";
import { PATH_MAIN } from "src/routes/paths";
import KanbanViewConfig from "./KanbanViewConfig";
import CalendarViewConfig from "./CalendarViewConfig";
import GalleryViewConfig from "./GalleryViewConfig";
import TimelineViewConfig from "./TimelineViewConfig";
import GanttViewConfig from "./GanttViewConfig";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { validateViewConfig, enabledViewCards } from "src/utils/flexlistHelper";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";
import { useTheme } from "@mui/material/styles";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { setFlashMessage } from "src/redux/actions/authAction";

const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

type ListViewFormProps = {
  currentView: View;
  open: boolean;
  availableFieldUiTypes: FieldUIType[];
  translations: TranslationText[];
  handleClose: () => void;
  setFlashMessage: (message: FlashMessageModel) => void;
};

const ListViewForm = ({
  open,
  currentView,
  availableFieldUiTypes,
  translations,
  handleClose,
  setFlashMessage
}: ListViewFormProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const theme = useTheme();
  const router = useRouter();
  const [steps, setSteps] = useState(0);
  const [viewType, setViewType] = useState<ViewType>(ViewType.List);
  const [viewName, setViewName] = useState<string>("");
  const [viewDescription, setViewDescription] = useState<string>("");
  const [config, setConfig] = useState<any>({});
  const [submit, setSubmit] = useState(false);

  const AddViewCards = [
    {
      type: ViewType.List,
      icon: "/assets/icons/tour/ic_tick.svg",
      title: t("List View"),
      description: t("List Description"),
    },
    {
      type: ViewType.Calendar,
      icon: "/assets/icons/CalendarSVG.svg",
      title: t("Calendar View"),
      description: t("Calendar Description"),
    },
    {
      type: ViewType.Gallery,
      icon: "/assets/icons/GallerySVG.svg",
      title: t("Gallery View"),
      description: t("Gallery Description"),
    },
    {
      type: ViewType.KanBan,
      icon: "/assets/icons/KanbanSVG.svg",
      title: t("Kanban View"),
      description: t("Kanban Description"),
    },
    {
      type: ViewType.TimeLine,
      icon: "/assets/icons/TimelineSVG.svg",
      title: t("Timeline View"),
      description: t("Timeline Description"),
    },
    {
      type: ViewType.Gantt,
      icon: "/assets/icons/GanttSVG.svg",
      title: t("Gantt View"),
      description: t("Gantt Description"),
    },
    {
      type: ViewType.Map,
      icon: "/assets/icons/MapSVG.svg",
      title: t("Map View"),
      description: t("Map Description"),
    },
  ];

  useEffect(() => {
    clearView();
    setSteps(0);
    setViewType(ViewType.List);
  }, [open]);

  const goPrevious = () => {
    setViewType(ViewType.List);
    setSteps(steps - 1);
  };

  const goNext = () => {
    clearView();
    setSteps(steps + 1);
  };

  const setError = (message: string) => {
    setFlashMessage({ type: "error", message: message });
  };

  const handleSubmit = async () => {
    setSubmit(true);

    if (!viewName) {
      setError("Name required");
      return;
    }

    if (!validateViewConfig(viewType, config, setError)) {
      return;
    }

    const createViewResponse = await listViewService.createView(
      currentView.listId,
      viewName,
      viewType,
      config
    );

    if (
      isSucc(createViewResponse) &&
      createViewResponse.data &&
      createViewResponse.data.viewId
    ) {
      await router.push(`${PATH_MAIN.views}/${createViewResponse.data.viewId}`);
      router.reload();
      closeModal();
    } else {
      setError(createViewResponse.message);
    }
  };

  const closeModal = () => {
    setSteps(0);
    handleClose();
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setViewName(event.target.value);
  };

  const onDescriptionChange = (newValue: string) => {
    setViewDescription(newValue);
  };

  const onTypeSelect = (type: ViewType) => {
    clearView();
    setViewType(type);
    setSteps(1);
  };

  const updateConfig = (newConfig: any) => {
    setConfig(newConfig);
  };

  const clearView = () => {
    setSubmit(false);
    setViewName("");
    setViewDescription("");
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", lg: "500px" },
          border: "none",
          // height: `${windowHeight}px`,
          backgroundColor: theme.palette.palette_style.background.default,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            py: 2,
            px: 4,
            position: "sticky",
            top: "0",
            zIndex: "10",
            backgroundColor: "#fff",
            boxShadow: "0 2px 24px 0 rgba(0,0,0,0.05)",
            width: "100%",
          }}
        >
          <Typography variant="h5">
            {steps === 0
              ? t("Choose View")
              : steps === 1
                ? t("View Details")
                : t("View Created")}
          </Typography>
        </Box>

        {steps === 0 && (
          <Grid container spacing={3} sx={{ p: 4 }}>
            {enabledViewCards(AddViewCards).map((card: any) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={card.icon}
                  onClick={() => onTypeSelect(card.type)}
                >
                  <AddViewCard
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                  ></AddViewCard>
                </Grid>
              );
            })}
          </Grid>
        )}

        {steps === 1 && (
          <Box
            sx={{ p: 4, display: "flex", flexDirection: "column", gap: 4 }}
          >
            {/* <Box>{error && <Alert severity="error">{error}</Alert>}</Box> */}
            <Box>
              <TextField
                label={t("View Name")}
                fullWidth
                id="fullWidth"
                value={viewName}
                onChange={onNameChange}
                required
                error={submit && !viewName}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <Typography
                variant="body2"
                component={"label"}
                sx={{
                  textTransform: "capitalize",
                  fontSize: 12,
                  position: "absolute",
                  top: "-10px",
                  left: "10px",
                  background: "#fff",
                  zIndex: 2,
                  px: 0.5,
                  color: "rgba(0, 0, 0, 0.6)",
                }}
              >
                {t("View Description")}
              </Typography>
              <WysiwygEditor
                value={viewDescription}
                setValue={(newValue) => onDescriptionChange(newValue)}
              />
            </Box>
            <Box>
              {currentView && viewType === ViewType.Calendar && (
                <CalendarViewConfig
                  translations={translations}
                  submit={submit}
                  availableFieldUiTypes={availableFieldUiTypes}
                  updateConfig={(newConfig) => updateConfig(newConfig)}
                />
              )}
              {currentView && viewType === ViewType.Gallery && (
                <GalleryViewConfig
                  translations={translations}
                  submit={submit}
                  availableFieldUiTypes={availableFieldUiTypes}
                  updateConfig={(newConfig) => updateConfig(newConfig)}
                />
              )}
              {currentView && viewType === ViewType.KanBan && (
                <KanbanViewConfig
                  translations={translations}
                  submit={submit}
                  availableFieldUiTypes={availableFieldUiTypes}
                  updateConfig={(newConfig) => updateConfig(newConfig)}
                />
              )}
              {currentView && viewType === ViewType.TimeLine && (
                <TimelineViewConfig
                  translations={translations}
                  submit={submit}
                  availableFieldUiTypes={availableFieldUiTypes}
                  updateConfig={(newConfig) => updateConfig(newConfig)}
                />
              )}
              {currentView && viewType === ViewType.Gantt && (
                <GanttViewConfig
                  translations={translations}
                  submit={submit}
                  availableFieldUiTypes={availableFieldUiTypes}
                  updateConfig={(newConfig) => updateConfig(newConfig)}
                />
              )}
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 4,
            py: 2,
            background: "#fff",
            position: "sticky",
            width: "100%",
            bottom: "0",
          }}
        >
          <Box sx={{ width: "100%" }}>
            {steps === 1 ? (
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <Button variant="outlined" onClick={goPrevious}>
                  {t("Back")}
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                  {t("Finish")}
                </Button>
              </Box>
            ) : (
              <Button variant="outlined" onClick={handleClose}>Close</Button>
            )}
          </Box>
        </Box>
      </Box>
    </Drawer >
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
  availableFieldUiTypes: state.view.availableFieldUiTypes,
});
const mapDispatchToProps = {
  setFlashMessage
};
export default connect(mapStateToProps, mapDispatchToProps)(ListViewForm);
