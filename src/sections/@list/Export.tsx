import { useEffect, useState } from "react";
import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import Modal from "@mui/material/Modal";
import { ExportType } from "src/enums/SharedEnums";
import { exportViewData } from "src/services/listView.service";
import { connect } from "react-redux";
import { View } from "src/models/SharedModels";
import { isSucc } from "src/models/ApiResponse";
import {
  getExportFileExtension,
  getExportMimeType,
} from "src/utils/flexlistHelper";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { setFlashMessage } from "src/redux/actions/authAction";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

const exports_all = [
  {
    name: ExportType.CSV,
    label: "CSV",
    icon: "toolbar/csv",
    isShow: true,
    isShowMore: false,
  },
  {
    name: ExportType.JSON,
    label: "JSON",
    icon: "toolbar/google_sheets",
    isShow: true,
    isShowMore: false,
  },
  {
    name: ExportType.XLSX,
    label: "Microsoft Excel",
    icon: "toolbar/microsoft_excel",
    isShow: false,
    isShowMore: true,
  },
  {
    name: ExportType.RSS,
    label: "RSS",
    icon: "toolbar/rss",
    isShow: false,
    isShowMore: true,
  },
  {
    name: ExportType.XML,
    label: "XML",
    icon: "toolbar/xml",
    isShow: false,
    isShowMore: true,
  },
  {
    name: ExportType.YML,
    label: "YML",
    icon: "toolbar/yaml",
    isShow: false,
    isShowMore: true,
  },
  {
    name: ExportType.HTML,
    label: "HTML",
    icon: "toolbar/html",
    isShow: false,
    isShowMore: true,
  },
];

const exports_currentView = [
  {
    name: ExportType.CSV,
    label: "CSV",
    icon: "toolbar/csv",
    isShow: true,
    isShowMore: false,
  },
  {
    name: ExportType.JSON,
    label: "JSON",
    icon: "toolbar/google_sheets",
    isShow: true,
    isShowMore: false,
  },
  {
    name: ExportType.XLSX,
    label: "Microsoft Excel",
    icon: "toolbar/microsoft_excel",
    isShow: false,
    isShowMore: true,
  },
  {
    name: ExportType.RSS,
    label: "RSS",
    icon: "toolbar/rss",
    isShow: false,
    isShowMore: true,
  },
  {
    name: ExportType.XML,
    label: "XML",
    icon: "toolbar/xml",
    isShow: false,
    isShowMore: true,
  },
  {
    name: ExportType.YML,
    label: "YML",
    icon: "toolbar/yaml",
    isShow: false,
    isShowMore: true,
  },
  {
    name: ExportType.HTML,
    label: "HTML",
    icon: "toolbar/html",
    isShow: false,
    isShowMore: true,
  },
];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "100%", md: "480px" },
  backgroundColor: "white",
  py: 2,
  px: { xs: 0.5, md: 2 },
  boxShadow: "0 0 10px 10px rgba(0, 0, 0, 0.05)",
  borderRadius: "5px",
  border: "none",
};
type ExportProps = {
  translations: TranslationText[];
  open: boolean;
  handleClose: () => void;
  currentView: View;
  setFlashMessage: (message: FlashMessageModel | undefined) => void;
};

const Export = ({
  translations,
  open,
  handleClose,
  currentView,
  setFlashMessage,
}: ExportProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const [windowHeight, setWindowHeight] = useState(0);
  const [isExportAllShowMore, setIsExportAllShowMore] = useState(false);
  const [isExportCurrentViewShowMore, setIsExportCurrentViewShowMore] =
    useState(false);
  const [exportAll, setExportAll] = useState(exports_all);
  const [exportCurrentView, setExportCurrentView] =
    useState(exports_currentView);
  const [screenMode, setScreenMode] = useState<"main" | "csv">("main");
  const [exportMode, setExportMode] = useState<"all" | "currentView">("all");
  const [delimiter, setDelimiter] = useState<string>(";");
  const csvDelimiters: string[] = [";", ","];

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  const download = (blob: Blob, fileName: string) => {
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element and simulate a click to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  };
  const handleExport = async (
    exportType: ExportType,
    isExportAll: boolean = true
  ) => {
    if (exportType === ExportType.CSV) {
      setExportMode(isExportAll ? "all" : "currentView");
      setScreenMode("csv");
    } else {
      await exportContent(exportType, isExportAll);
    }
  };
  const exportContent = async (
    exportType: ExportType,
    isExportAll: boolean = true,
    delimiter: string = ";"
  ) => {
    try {
      const response = await exportViewData(
        exportType,
        currentView.id,
        isExportAll ? undefined : currentView.page,
        isExportAll ? undefined : currentView.limit,
        isExportAll ? undefined : currentView.order,
        isExportAll ? undefined : currentView.query,
        isExportAll ? undefined : currentView.conditions,
        delimiter
      );
      if (isSucc(response) && response.data) {
        // Create a Blob object from the JSON data
        let blob: Blob;
        if (exportType !== ExportType.XLSX) {
          blob = new Blob([response.data], {
            type: getExportMimeType(exportType),
          });
        } else {
          const uintArray = new Uint8Array(response.data.data);
          blob = new Blob([uintArray], { type: getExportMimeType(exportType) });
        }
        download(
          blob,
          `${currentView.name}.${getExportFileExtension(exportType)}`
        );
      } else {
        setFlashMessage({ type: "error", message: response.message });
      }
    } catch (error) {
      setFlashMessage({ type: "error", message: "unknown error" });
    }
  };
  const toggleExportAllShowMore = () => {
    let newExportAll = exportAll.map((x) => {
      if (x.isShowMore) {
        return { ...x, isShow: !isExportAllShowMore };
      }
      return x;
    });
    setExportAll(newExportAll);
    setIsExportAllShowMore(!isExportAllShowMore);
  };
  const toggleExportCurrentViewShowMore = () => {
    let newExportCurrentView = exportCurrentView.map((x) => {
      if (x.isShowMore) {
        return { ...x, isShow: !isExportCurrentViewShowMore };
      }
      return x;
    });
    setExportCurrentView(newExportCurrentView);
    setIsExportCurrentViewShowMore(!isExportCurrentViewShowMore);
  };

  const onDelimiterChange = (event: SelectChangeEvent) => {
    setDelimiter(event.target.value);
  };
  const onClose = () => {
    resetExportScreen();
    handleClose();
  };
  const backMainScreen = () => {
    resetExportScreen();
  };
  const resetExportScreen = () => {
    setScreenMode("main");
    setExportMode("all");
    setDelimiter(";");
    setExportAll(exports_all);
    setExportCurrentView(exports_currentView);
    setIsExportAllShowMore(false);
    setIsExportCurrentViewShowMore(false);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
            paddingBottom: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle2">{t("Export")}</Typography>
          <Box
            component="span"
            className="svg-color add_choice"
            sx={{
              width: 18,
              height: 18,
              display: "inline-block",
              bgcolor: theme.palette.palette_style.text.primary,
              mask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
              cursor: "pointer",
            }}
            onClick={onClose}
          />
        </Box>
        {screenMode === "main" ? (
          <Box sx={{ maxHeight: `${windowHeight - 100}px`, overflow: "auto" }}>
            <Box
              sx={{
                borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
              }}
            >
              <Box sx={{ paddingTop: 2 }}>{t("All Data To")}:</Box>
              <Box
                sx={{
                  py: 2,
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                  },
                  gap: "30px",
                  rowGap: "12px",
                }}
              >
                {exportAll
                  .filter((x) => x.isShow)
                  .map((item: any, index) => (
                    <Box
                      key={index}
                      onClick={() => handleExport(item.name, true)}
                      sx={{
                        display: "flex",
                        border: `1px solid ${theme.palette.palette_style.border.default}`,
                        borderRadius: "5px",
                        px: 2,
                        py: 1,
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        component="img"
                        src={`/assets/icons/${item.icon}.svg`}
                        sx={{
                          width: 18,
                          height: 18,
                          marginRight: 1,
                          marginTop: 0.3,
                        }}
                      />
                      <Box>{item.label}</Box>
                    </Box>
                  ))}
              </Box>
              <Box
                sx={{
                  pb: 2,
                  cursor: "pointer",
                  textAlign: "center",
                  color: "#54A6FB",
                }}
                onClick={toggleExportAllShowMore}
              >
                {isExportAllShowMore
                  ? "View less options"
                  : "View more options"}
              </Box>
            </Box>
            <Box sx={{}}>
              <Box sx={{ paddingTop: 2 }}>{t("Current View")}:</Box>
              <Box
                sx={{
                  py: 2,
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                  },
                  gap: "30px",
                  rowGap: "12px",
                }}
              >
                {exportCurrentView
                  .filter((x) => x.isShow)
                  .map((item: any, index) => (
                    <Box
                      key={index}
                      onClick={() => handleExport(item.name, false)}
                      sx={{
                        display: "flex",
                        border: `1px solid ${theme.palette.palette_style.border.default}`,
                        borderRadius: "5px",
                        px: 2,
                        py: 1,
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        component="img"
                        src={`/assets/icons/${item.icon}.svg`}
                        sx={{
                          width: 18,
                          height: 18,
                          marginRight: 1,
                          marginTop: 0.3,
                        }}
                      />
                      <Box>{item.label}</Box>
                    </Box>
                  ))}
              </Box>
              <Box
                sx={{
                  pb: 2,
                  cursor: "pointer",
                  textAlign: "center",
                  color: "#54A6FB",
                }}
                onClick={toggleExportCurrentViewShowMore}
              >
                {isExportCurrentViewShowMore
                  ? t("View Less Options")
                  : t("View More Options")}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ maxHeight: `${windowHeight - 100}px`, overflow: "auto" }}>
            <Box sx={{ marginBottom: 5, marginTop: 5 }}>
              <Select
                fullWidth
                displayEmpty
                value={delimiter}
                onChange={onDelimiterChange}
              >
                {csvDelimiters.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                onClick={() =>
                  exportContent(ExportType.CSV, exportMode == "all", delimiter)
                }
              >
                {t("Download")}
              </Button>
              <Button onClick={() => backMainScreen()}>{t("Cancel")}</Button>
            </Box>
          </Box>
        )}
        <Box sx={{ pt: 2 }}><Button sx={{ float: "right" }} variant="outlined" onClick={handleClose}>Close</Button></Box>
      </Box>
    </Modal >
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  setFlashMessage,
};
export default connect(mapStateToProps, mapDispatchToProps)(Export);
