import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Modal,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  Alert,
} from "@mui/material";
import AddViewCard from "src/components/add-view/AddViewCard";
import WysiwygEditor from "src/components/wysiwyg/wysiwygEditor";
import { FieldUIType, View } from "src/models/SharedModels";
import { connect } from "react-redux";
import { FieldType, FieldUiTypeEnum, ViewType } from "src/enums/SharedEnums";
import { ViewField } from "src/models/ViewField";
import { convertToInteger } from "src/utils/convertUtils";
import ViewFieldsConfig from "./CreateFieldModal";
import { listViewService } from "src/services/listView.service";
import { isSucc } from "src/models/ApiResponse";
import { ErrorConsts } from "src/constants/errorConstants";
import { useRouter } from "next/router";
import { PATH_MAIN } from "src/routes/paths";
import KanbanViewConfig from "./KanbanViewConfig";
import CalendarViewConfig from "./CalendarViewConfig";
import GalleryViewConfig from "./GalleryViewConfig";
import TimelineViewConfig from "./TimelineViewConfig";
import HTMLEditor from "src/components/rowedit/HTMLEditor";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "80vh",
  backgroundColor: "white",
  border: "none",
  boxShadow: 24,
  overflow: "scroll",
};

const AddViewCards = [
  {
    type: ViewType.List,
    icon: "/assets/icons/tour/ic_tick.svg",
    title: "List View",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    type: ViewType.Calendar,
    icon: "/assets/icons/CalendarSVG.svg",
    title: "Calendar View",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    type: ViewType.Gallery,
    icon: "/assets/icons/GallerySVG.svg",
    title: "Gallery View",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    type: ViewType.KanBan,
    icon: "/assets/icons/KanbanSVG.svg",
    title: "Kanban View",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    type: ViewType.TimeLine,
    icon: "/assets/icons/TimelineSVG.svg",
    title: "Timeline View",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    type: ViewType.Gantt,
    icon: "/assets/icons/GanttSVG.svg",
    title: "Gantt View",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
  {
    type: ViewType.Map,
    icon: "/assets/icons/MapSVG.svg",
    title: "Map View",
    description: "Lorem ipsum dolor sit amet consectetur.",
  },
];

type ListViewFormProps = {
  currentView: View;
  columns: ViewField[];
  open: boolean;
  handleClose: () => void;
  availableFieldUiTypes: FieldUIType[];
};

const ListViewForm = ({
  open,
  handleClose,
  currentView,
  columns,
  availableFieldUiTypes,
}: ListViewFormProps) => {
  const router = useRouter();
  const [steps, setSteps] = useState(0);
  const [viewType, setViewType] = useState<ViewType>(ViewType.List);
  const [viewName, setViewName] = useState<string>("");
  const [viewDescription, setViewDescription] = useState<string>("");
  const [config, setConfig] = useState<any>({});
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState<string>("");

  const goPrevious = () => {
    setSteps(steps - 1);
  };

  const goNext = () => {
    setSteps(steps + 1);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    if (!viewName) {
      setError("Name required");
      return;
    }

    if (!validateConfig()) {
      return;
    }
    var createViewResponse = await listViewService.createView(
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
      // setSteps(0);
      // setViewType(ViewType.List);
      closeModal();
    } else {
      setError(ErrorConsts.InternalServerError);
    }
  };

  const validateConfig = (): boolean => {
    let isValidConfig: boolean = true;
    switch (viewType) {
      case ViewType.Calendar:
        if (!config) {
          setError("Config invalid");
          isValidConfig = false;
        }
        if (!config.dateFieldId || config.dateFieldId === 0) {
          setError("Date field required");
          isValidConfig = false;
        }
        if (!config.titleId || config.titleId === 0) {
          setError("Title field required");
          isValidConfig = false;
        }
        break;
      case ViewType.Gallery:
        if (!config) {
          setError("Config invalid");
          isValidConfig = false;
        }
        if (!config.avatarId || config.avatarId === 0) {
          setError("Avatar field required");
          isValidConfig = false;
        }
        if (!config.nameId || config.nameId === 0) {
          setError("Task Name field required");
          isValidConfig = false;
        }
        if (!config.importanceId || config.importanceId === 0) {
          setError("Importance field required");
          isValidConfig = false;
        }
        if (!config.descriptionId || config.descriptionId === 0) {
          setError("Task Description field required");
          isValidConfig = false;
        }
        break;
      case ViewType.KanBan:
        if (!config) {
          setError("Config invalid");
          isValidConfig = false;
        }
        if (!config.boardColumnId || config.boardColumnId === 0) {
          setError("Board field required");
          isValidConfig = false;
        }
        if (!config.orderColumnId || config.orderColumnId === 0) {
          setError("Order field required");
          isValidConfig = false;
        }
        if (!config.titleId || config.titleId === 0) {
          setError("Title field required");
          isValidConfig = false;
        }
        break;
      case ViewType.TimeLine:
        if (!config) {
          setError("Config invalid");
          isValidConfig = false;
        }
        if (!config.titleId || config.titleId === 0) {
          setError("Title field required");
          isValidConfig = false;
        }
        if (!config.colorId || config.colorId === 0) {
          setError("Color field required");
          isValidConfig = false;
        }
        if (!config.levelId || config.levelId === 0) {
          setError("Level field required");
          isValidConfig = false;
        }
        if (!config.fromId || config.fromId === 0) {
          setError("From field required");
          isValidConfig = false;
        }
        if (!config.toId || config.toId === 0) {
          setError("To field required");
          isValidConfig = false;
        }
      default:
        break;
    }
    return isValidConfig;
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
    setViewType(type);
    setSteps(1);
    //  reloadColumns(type)
  };

  const updateConfig = (newConfig: any) => {
    setConfig(newConfig);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "scroll" }}
      >
        <Box sx={style}>
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
                ? "Choose View"
                : steps === 1
                ? "View details"
                : "View Created"}
            </Typography>
          </Box>

          {steps === 0 && (
            <Grid container spacing={3} sx={{ p: 4 }}>
              {AddViewCards.map((card: any) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={3}
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
              <Box>{error && <Alert severity="error">{error}</Alert>}</Box>
              <Box>
                {/* <Typography variant="subtitle2" gutterBottom>
                  View Name
                </Typography> */}
                <TextField
                  label="View name"
                  fullWidth
                  id="fullWidth"
                  value={viewName}
                  onChange={onNameChange}
                  required
                  error={submit && !viewName}
                />
              </Box>
              {/* <Typography variant="subtitle2" gutterBottom>
                  View Description
                </Typography> */}
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
                  View description
                </Typography>
                <WysiwygEditor
                  value={viewDescription}
                  setValue={(newValue) => onDescriptionChange(newValue)}
                />
              </Box>
              <Box>
                {currentView && viewType === ViewType.Calendar && (
                  <CalendarViewConfig
                    submit={submit}
                    availableFieldUiTypes={availableFieldUiTypes}
                    updateConfig={(newConfig) => updateConfig(newConfig)}
                  />
                )}
                {currentView && viewType === ViewType.Gallery && (
                  <GalleryViewConfig
                    submit={submit}
                    availableFieldUiTypes={availableFieldUiTypes}
                    updateConfig={(newConfig) => updateConfig(newConfig)}
                  />
                )}
                {currentView && viewType === ViewType.TimeLine && (
                  <TimelineViewConfig
                    submit={submit}
                    availableFieldUiTypes={availableFieldUiTypes}
                    updateConfig={(newConfig) => updateConfig(newConfig)}
                  />
                )}
                {currentView && viewType === ViewType.KanBan && (
                  <KanbanViewConfig
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
            <Box>
              {steps === 0 ? (
                <Button
                  variant="outlined"
                  size="small"
                  sx={{ display: "none" }}
                >
                  Skip
                </Button>
              ) : (
                <Button variant="contained" size="small" onClick={goPrevious}>
                  Previous
                </Button>
              )}
            </Box>
            <Box>
              {steps === 1 ? (
                <Button variant="outlined" size="small" onClick={handleSubmit}>
                  Finish
                </Button>
              ) : (
                <Button variant="contained" size="small" onClick={goNext}>
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
  columns: state.view.columns,
  availableFieldUiTypes: state.view.availableFieldUiTypes,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ListViewForm);
