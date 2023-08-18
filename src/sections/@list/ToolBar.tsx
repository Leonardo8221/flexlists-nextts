import { useState } from "react";
import { Box, MenuItem, Popover, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import ActionItem from "../../components/toolbar/ActionItem";
import { connect } from "react-redux";
import Filter from "./Filter";
import Sort from "./Sort";
import Import from "./Import";
import Export from "./Export";
import ViewFields from "./ViewFields";
import { listViewService } from "src/services/listView.service";
import { View } from "src/models/SharedModels";
import { isSucc } from "src/models/ApiResponse";
import { hasPermission } from "src/utils/permissionHelper";
import { setFlashMessage } from "src/redux/actions/authAction";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import ListFields from "./ListFields";
import { set } from "lodash";
import SaveViewPreset from "./SaveViewPreset";
import ViewPresets from "./ViewPresets";
import TuneIcon from "@mui/icons-material/Tune";

type ToolbBarProps = {
  open: boolean;
  onOpen: (action: boolean) => void;
  currentView: View;
  setFlashMessage: (message: FlashMessageModel) => void;
};

const dos = [
  {
    title: "Undo",
    icon: "toolbar/undo",
    active: true,
    leftIcon: true,
  },
  {
    title: "Redo",
    icon: "toolbar/redo",
    active: false,
    leftIcon: false,
  },
];

const actions = [
  {
    // title: "Presets",
    icon: "toolbar/presetTest",
    active: true,
    leftIcon: true,
  },
  {
    title: "Filter",
    icon: "toolbar/filter",
    active: true,
    leftIcon: true,
  },
  {
    title: "Sort",
    icon: "toolbar/sort",
    active: true,
    leftIcon: true,
  },
  {
    title: "Fields",
    icon: "toolbar/fields",
    active: true,
    leftIcon: true,
  },
  {
    title: "Import",
    icon: "toolbar/import",
    active: true,
    leftIcon: true,
  },
  {
    title: "Export",
    icon: "toolbar/export",
    active: true,
    leftIcon: true,
  },
  {
    title: "Save",
    icon: "toolbar/save",
    active: true,
    leftIcon: true,
  },
];

const ToolbBar = ({
  open,
  onOpen,
  currentView,
  setFlashMessage,
}: ToolbBarProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "lg");
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [visibleSort, setVisibleSort] = useState(false);
  const [visibleImport, setVisibleImport] = useState(false);
  const [visibleExport, setVisibleExport] = useState(false);
  const [visibleFields, setVisibleFields] = useState(false);
  const [visibleListFields, setVisibleListFields] = useState(false);
  const [isSaveViewModalOpen, setIsSaveViewModalOpen] =
    useState<boolean>(false);
  const [saveViewMessage, setSaveViewMessage] = useState<string>("");
  const [saveViewPopoverOpen, setSaveViewPopoverOpen] = useState(null);
  const [viewPresetsPopoverOpen, setViewPresetsPopoverOpen] = useState(null);
  const [selectedPreset, setSelectedPreset] = useState<any>();
  const handleSaveViewPopoverClose = () => {
    setSaveViewPopoverOpen(null);
  };
  const handleSaveViewPopoverOpen = (event: any) => {
    setSaveViewPopoverOpen(event.currentTarget);
  };
  const handleViewPresetsPopoverClose = () => {
    setViewPresetsPopoverOpen(null);
  };
  const handleViewPresetsPopoverOpen = (event: any) => {
    setViewPresetsPopoverOpen(event.currentTarget);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        // borderBottom: {
        //   xs: `1px solid ${theme.palette.palette_style.border.default}`,
        //   lg: "none",
        // },
        position: "relative",
        // zIndex: 2,
        backgroundColor: theme.palette.palette_style.background.default,
        justifyContent: { xs: "space-between", md: "inherit" },
        height: "32px",
        width: "100%",
      }}
    >
      {/* <Snackbar
        // anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isSaveViewModalOpen}
        autoHideDuration={5000}
        onClose={() => setIsSaveViewModalOpen(false)}
        message={saveViewMessage}
        key={"top-center"}
      /> */}
      {/* <Box sx={{ display: "flex" }}> */}
      {/* <Box
          sx={{
            display: 'flex',
            p: 1
          }}
        >
          {dos.map((toolbar) => (
            <ToolBarItem key={toolbar.title} toolbar={toolbar} />
          ))}
        </Box> */}
      {/* {!isDesktop && <ViewUsersList />} */}
      {/* </Box> */}
      {/* <Collapse in={open} timeout="auto" unmountOnExit> */}
      <Box
        sx={{
          overflowY: "hidden",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "space-between", md: "center" },
          // paddingTop: 1.2,
          px: { xs: 1, md: "inherit" },
          // width: {xs: '100vw', md: '100%'},
          overflow: { xs: "auto", md: "inherit" },
          borderTop: {
            // xs: `1px solid ${theme.palette.palette_style.border.default}`,
            md: "none",
          },
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {hasPermission(currentView?.role, "Read") && (
          <Box
            sx={{
              position: "relative",
              alignItems: "center",
              marginRight: 2,
              display: "flex",
            }}
          >
            <ActionItem
              toolbar={actions[0]}
              onClick={handleViewPresetsPopoverOpen}
            />
            <Box
              // variant="body1"
              onClick={handleViewPresetsPopoverOpen}
              sx={{
                // mr: 1,
                color: theme.palette.palette_style.text.selected,
                cursor: "pointer",
              }}
            >
              {selectedPreset ? selectedPreset.name : "Default"}
            </Box>
            <Popover
              open={Boolean(viewPresetsPopoverOpen)}
              anchorEl={viewPresetsPopoverOpen}
              onClose={handleViewPresetsPopoverClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  p: 1,
                  mt: 1.5,
                  ml: 0.75,
                  width: 250,
                  "& .MuiMenuItem-root": {
                    px: 1,
                    typography: "body2",
                    borderRadius: 0.75,
                  },
                },
              }}
            >
              <Stack spacing={0.75}>
                <ViewPresets
                  selectedPreset={selectedPreset}
                  setSelectedPreset={(newPreset) => {
                    setSelectedPreset(newPreset);
                  }}
                  handleClose={handleViewPresetsPopoverClose}
                />
              </Stack>
            </Popover>
          </Box>
        )}
        {hasPermission(currentView?.role, "Read") && (
          <Box
            sx={{
              position: "relative",
              alignItems: "center",
              marginRight: 2,
              display: "flex",
            }}
          >
            <ActionItem
              toolbar={actions[1]}
              onClick={(e) => {
                setVisibleFilter(!visibleFilter);
              }}
            />
            <Filter
              open={visibleFilter}
              handleClose={() => {
                setVisibleFilter(false);
              }}
            />
          </Box>
        )}
        {hasPermission(currentView?.role, "Read") && (
          <Box
            sx={{ position: "relative", alignItems: "center", marginRight: 2 }}
          >
            <ActionItem
              toolbar={actions[2]}
              onClick={(e) => {
                setVisibleSort(!visibleSort);
              }}
            />
            <Sort
              open={visibleSort}
              handleClose={() => {
                setVisibleSort(false);
              }}
            />
          </Box>
        )}
        {hasPermission(currentView?.role, "All") && (
          <Box
            sx={{ position: "relative", alignItems: "center", marginRight: 2 }}
          >
            <ActionItem
              toolbar={actions[3]}
              onClick={(e) => {
                if (currentView.isDefaultView) {
                  setVisibleListFields(!visibleListFields);
                } else {
                  setVisibleFields(!visibleFields);
                }
              }}
            />
            <ViewFields
              open={visibleFields}
              handleClose={() => {
                setVisibleFields(false);
              }}
            />
            <ListFields
              open={visibleListFields}
              onClose={() => {
                setVisibleListFields(false);
              }}
            />
          </Box>
        )}
        {hasPermission(currentView?.role, "Update") && (
          <Box
            sx={{ position: "relative", alignItems: "center", marginRight: 2 }}
          >
            <ActionItem
              toolbar={actions[4]}
              onClick={(e) => {
                setVisibleImport(!visibleImport);
              }}
            />
            <Import
              open={visibleImport}
              handleClose={() => {
                setVisibleImport(false);
              }}
            />
          </Box>
        )}
        {hasPermission(currentView?.role, "Read") && (
          <Box
            sx={{ position: "relative", alignItems: "center", marginRight: 2 }}
          >
            <ActionItem
              toolbar={actions[5]}
              onClick={(e) => {
                setVisibleExport(!visibleExport);
              }}
            />
            <Export
              open={visibleExport}
              handleClose={() => {
                setVisibleExport(false);
              }}
            />
          </Box>
        )}
        {hasPermission(currentView?.role, "All") && (
          <Box
            sx={{ position: "relative", alignItems: "center", marginRight: 2 }}
          >
            <ActionItem
              toolbar={actions[6]}
              onClick={handleSaveViewPopoverOpen}
            />
            <Popover
              open={Boolean(saveViewPopoverOpen)}
              anchorEl={saveViewPopoverOpen}
              onClose={handleSaveViewPopoverClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  p: 1,
                  mt: 1.5,
                  ml: 0.75,
                  width: 400,
                  "& .MuiMenuItem-root": {
                    px: 1,
                    typography: "body2",
                    borderRadius: 0.75,
                  },
                },
              }}
            >
              <Stack spacing={0.75}>
                <SaveViewPreset handleClose={handleSaveViewPopoverClose} />
              </Stack>
            </Popover>
          </Box>
        )}
      </Box>
      {/* </Collapse> */}
      {/* {!isDesktop && (
        <Box
          sx={{ position: "absolute", right: "10px", top: "12px" }}
          onClick={() => {
            onOpen(!open);
          }}
        >
          <Box
            component="span"
            className="svg-color"
            sx={{
              width: 24,
              height: 24,
              display: "inline-block",
              bgcolor: theme.palette.palette_style.text.primary,
              mask: `url(/assets/icons/angle_down.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/angle_down.svg) no-repeat center / contain`,
              transform: open ? "rotate(180deg)" : "inherit",
              transition: "transform 0.3s",
            }}
          />
        </Box>
      )} */}
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  setFlashMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolbBar);
