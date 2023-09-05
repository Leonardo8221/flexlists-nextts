import { useEffect, useState } from "react";
import {
  TextField,
  Box,
  FormControlLabel,
  Typography,
  Link,
  Switch,
  FormGroup,
} from "@mui/material";
import { connect } from "react-redux";
import { fetchRows, setCurrentView } from "../../redux/actions/viewActions";
import useResponsive from "../../hooks/useResponsive";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ViewField } from "src/models/ViewField";
import { FieldUiTypeEnum } from "src/enums/SharedEnums";
import {
  downloadFileUrl,
  getChoiceField,
  getDataColumnId,
} from "src/utils/flexlistHelper";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { getAmPm, getDateFromTimeString, getLocalDateTimeFromString, getLocalDateFromString } from "src/utils/convertUtils";
import { DatePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import MarkdownEditor from "src/components/rowedit/MarkdownEditor";
import HTMLEditor from "src/components/rowedit/HTMLEditor";
import UploadButton from "src/components/upload/UploadButton";
import ReactPlayer from "react-player";
import ColorPicker from "src/components/color-picker/ColorPicker";
import { listContentService } from "src/services/listContent.service";
import { isSucc } from "src/models/ApiResponse";

type RenderFieldProps = {
  column: ViewField;
  isPrint?: boolean;
  currentMode: string;
  values: any;
  submit: boolean;
  dateFormat: string;
  columns: any[];
  setValues: (values: any[]) => void;
  setDateValue: (value: any, x: any) => void;
  setTimeValue: (value: any, x: any) => void;
};

const RenderField = ({
  column,
  isPrint = false,
  currentMode,
  values,
  submit,
  dateFormat,
  columns,
  setValues,
  setDateValue,
  setTimeValue
}: RenderFieldProps) => {
  const isDesktop = useResponsive("up", "md");
  const [relationValues, setRelationValues] = useState<any[]>([]);

  useEffect(() => {
    const getFieldValues = async () => {
     if (column.uiField === 'Lookup') {
      const response = await listContentService.searchContents(
        column.config.values.viewId
      );
      const contents: any[] = [];
  
      if (isSucc(response) && response.data && response.data.content) {
        for (const row of response.data.content) {
          contents.push(Object.fromEntries(row))
        }
        
        setRelationValues(contents);
      }
     }
    };

    getFieldValues();

    if (column.uiField === FieldUiTypeEnum.Lookup && values['___extra']) values[column.id] = values['___extra'];
  }, []);

  switch (column.uiField) {
    case FieldUiTypeEnum.Text:
      return currentMode !== "view" && !isPrint ? (
        <TextField
          key={column.id}
          style={{ width: "100%" }}
          label={column.name}
          InputLabelProps={{ shrink: true }}
          name={`${column.id}`}
          size="small"
          type={"text"}
          onChange={(e) => {
            setValues({ ...values, [column.id]: e.target.value });
          }}
          value={values ? values[column.id] : ""}
          rows={4}
          required={column.required}
          error={submit && column.required && !values[column.id]}
        />
      ) : (
        <div key={column.id}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            label={column.name}
            value={values ? values[column.id]?.toString() : ""}
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(158, 158, 158, 0.32) !important",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(158, 158, 158, 0.32) !important",
                borderWidth: "1px !important",
              },
              "& .Mui-focused.MuiFormLabel-root": {
                color: "rgba(0, 0, 0, 0.6) !important",
              },
            }}
          />
        </div>
      );
    case FieldUiTypeEnum.LongText:
      return currentMode !== "view" && !isPrint ? (
        <TextField
          key={column.id}
          label={column.name}
          name={`${column.id}`}
          InputLabelProps={{ shrink: true }}
          size="small"
          type={"text"}
          onChange={(e) => {
            setValues({ ...values, [column.id]: e.target.value });
          }}
          value={values ? values[column.id] : ""}
          minRows={4}
          maxRows={Infinity}
          multiline={true}
          required={column.required}
          error={submit && column.required && !values[column.id]}
        />
      ) : (
        <div key={column.id}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{ shrink: true }}
            label={column.name}
            value={values ? values[column.id] : ""}
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(158, 158, 158, 0.32) !important",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(158, 158, 158, 0.32) !important",
                borderWidth: "1px !important",
              },
              "& .Mui-focused.MuiFormLabel-root": {
                color: "rgba(0, 0, 0, 0.6) !important",
              },
            }}
          />
        </div>
      );
    case FieldUiTypeEnum.Integer:
    case FieldUiTypeEnum.Double:
    case FieldUiTypeEnum.Decimal:
    case FieldUiTypeEnum.Float:
    case FieldUiTypeEnum.Percentage:
    case FieldUiTypeEnum.Money:
      return currentMode !== "view" && !isPrint ? (
        <TextField
          key={column.id}
          label={column.name}
          InputLabelProps={{ shrink: true }}
          name={`${column.id}`}
          size="small"
          type={"number"}
          onChange={(e) =>
            setValues({ ...values, [column.id]: e.target.value })
          }
          value={values[column.id]}
          rows={4}
          required={column.required}
          error={submit && column.required && !values[column.id]}
        />
      ) : (
        <div key={column.id}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{ shrink: true }}
            label={column.name}
            value={values ? values[getDataColumnId(column.id, columns)] : ""}
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(158, 158, 158, 0.32) !important",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(158, 158, 158, 0.32) !important",
                borderWidth: "1px !important",
              },
              "& .Mui-focused.MuiFormLabel-root": {
                color: "rgba(0, 0, 0, 0.6) !important",
              },
            }}
          />
        </div>
      );
    case FieldUiTypeEnum.DateTime:
      return currentMode !== "view" && !isPrint ? (
        <LocalizationProvider dateAdapter={AdapterDayjs} key={column.id}>
          <DateTimePicker
            value={
              values[column.id] && values[column.id] != null
                ? dayjs(values[column.id])
                : null
            }
            label={column.name}
            onChange={(x) => {
              setDateValue(column.id, x);
            }}
            className={
              submit && column.required && !values[column.id]
                ? "Mui-error"
                : ""
            }
            ampm={getAmPm()}
            format={`${dateFormat} ${getAmPm() ? 'hh' : 'HH'}:mm:ss${getAmPm() ? ' a' : ''}`}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
        </LocalizationProvider>
      ) : (
        <div key={column.id}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{ shrink: true }}
            label={column.name}
            value={
              values && values[getDataColumnId(column.id, columns)]
                ? getLocalDateTimeFromString(values[getDataColumnId(column.id, columns)])
                : ""
            }
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(158, 158, 158, 0.32) !important",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(158, 158, 158, 0.32) !important",
                borderWidth: "1px !important",
              },
              "& .Mui-focused.MuiFormLabel-root": {
                color: "rgba(0, 0, 0, 0.6) !important",
              },
            }}
          />
        </div>
      );
    case FieldUiTypeEnum.Date:
      return currentMode !== "view" && !isPrint ? (
        <LocalizationProvider dateAdapter={AdapterDayjs} key={column.id}>
          <DatePicker
            value={dayjs(values[column.id])}
            label={column.name}
            onChange={(x) => {
              setDateValue(column.id, x);
            }}
            className={
              submit && column.required && !values[column.id]
                ? "Mui-error"
                : ""
            }
            format={dateFormat}
          />
        </LocalizationProvider>
      ) : (
        <div key={column.id}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{ shrink: true }}
            label={column.name}
            value={
              values && values[getDataColumnId(column.id, columns)]
                ? getLocalDateFromString(values[getDataColumnId(column.id, columns)])
                : ""
            }
            sx={{
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(158, 158, 158, 0.32) !important",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(158, 158, 158, 0.32) !important",
                borderWidth: "1px !important",
              },
              ".MuiFormLabel-root": {
                color: "rgba(0, 0, 0, 0.6) !important",
              },
            }}
          />
        </div>
      );
    case FieldUiTypeEnum.Time:
      return currentMode !== "view" && !isPrint ? (
        <LocalizationProvider dateAdapter={AdapterDayjs} key={column.id}>
          <TimePicker
            value={
              values[column.id]
                ? dayjs(getDateFromTimeString(values[column.id]))
                : null
            }
            label={column.name}
            onChange={(x) => {
              setTimeValue(column.id, x);
            }}
            className={
              submit && column.required && !values[column.id]
                ? "Mui-error"
                : ""
            }
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            ampm={getAmPm()}
          />
        </LocalizationProvider>
      ) : (
        <>
          <LocalizationProvider dateAdapter={AdapterDayjs} key={column.id}>
            <TimePicker
              readOnly={true}
              value={
                values[column.id]
                  ? dayjs(getDateFromTimeString(values[column.id]))
                  : null
              }
              label={column.name}
              onChange={(x) => {
                setTimeValue(column.id, x);
              }}
              className={
                submit && column.required && !values[column.id]
                  ? "Mui-error"
                  : ""
              }
              ampm={getAmPm()}
              sx={{
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(158, 158, 158, 0.32) !important",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(158, 158, 158, 0.32) !important",
                  borderWidth: "1px !important",
                },
                ".MuiFormLabel-root": {
                  color: "rgba(0, 0, 0, 0.6) !important",
                },
              }}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
            />
          </LocalizationProvider>

        </>
      );
    case FieldUiTypeEnum.Choice:
      if (currentMode !== "view" && !isPrint) {
        return (
          <FormControl key={column.id} required={column.required}>
            <InputLabel id={`${column.id}`} sx={{ top: "-5px" }}>
              {column.name}
            </InputLabel>
            <Select
              key={column.id}
              label={column.name}
              id={`${column.id}`}
              value={values[column.id]}
              onChange={(e) =>
                setValues({ ...values, [column.id]: e.target.value })
              }
              size="small"
              error={submit && column.required && !values[column.id]}
            >
              {column?.config?.values &&
                column.config.values.map((choice: any) => (
                  <MenuItem
                    key={choice.id}
                    value={choice.id}
                    sx={{
                      backgroundColor: choice.color?.bg ?? "white",
                      color: choice.color?.fill ?? "black",
                      "&:hover": {
                        backgroundColor: choice.color?.bg ?? "white",
                      },
                    }}
                  >
                    {choice.label}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        );
      } else {
        const choice = getChoiceField(values[column.id], column);
        return (
          <div key={column.id}>
            <TextField
              fullWidth
              InputProps={{
                readOnly: true,
              }}
              InputLabelProps={{ shrink: true }}
              label={column.name}
              value={choice?.label}
              sx={{
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(158, 158, 158, 0.32) !important",
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(158, 158, 158, 0.32) !important",
                  borderWidth: "1px !important",
                },
                ".MuiFormLabel-root": {
                  color: "rgba(0, 0, 0, 0.6) !important",
                },
              }}
            />
          </div>
        );
      }
    case FieldUiTypeEnum.Boolean:
      return currentMode !== "view" && !isPrint ? (
        <div className="focusedNeed" tabIndex={8}>
          <Box
            className="booleanBox"
            sx={{
              border: "1px solid rgba(158, 158, 158, 0.32)",
              p: 1,
              px: 2,
              position: "relative",
              borderRadius: "6px",
              ".focusedNeed:focus &": {
                border: "2px solid #1976d2",
              },
              "&:hover": {
                border: "1px solid rgba(0, 0, 0, 0.87)",
              },
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
                ".focusedNeed:focus &": {
                  color: "#1976d2",
                  top: "-11px",
                  left: "9px",
                },
              }}
            >
              {column.name}
            </Typography>
            <Box
              className="booleanWrapper"
              sx={{
                ".focusedNeed:focus &": {
                  margin: "-1px",
                },
              }}
            >
              <FormControlLabel
                key={column.id}
                control={
                  <Switch
                    checked={values[column.id]}
                    onChange={(e) =>
                      setValues({ ...values, [column.id]: e.target.checked })
                    }
                  />
                }
                label={column.name}
              />
            </Box>
          </Box>
        </div>
      ) : (
        <div key={column.id} className="focusedNeed" tabIndex={8}>
          <Box
            key={column.id}
            className="booleanBox"
            sx={{
              border: "1px solid rgba(158, 158, 158, 0.32)",
              p: 1,
              px: 2,
              position: "relative",
              borderRadius: "6px",
              ".focusedNeed:focus &": {
              },
              "&:hover": {
                border: "1px solid rgba(158, 158, 158, 0.32)",
              },
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
                color: "rgba(0, 0, 0, 0.6)"
              }}
            >
              {column.name}
            </Typography>
            <Box
              className="booleanWrapper"
              sx={{
                ".focusedNeed:focus &": {
                  // margin: "-1px",
                },
              }}
            >
              <FormGroup>
                <FormControlLabel
                  disabled
                  control={<Switch checked={values[column.id]} />}
                  label={
                    values && values[column.id]?.toString() === "true"
                      ? "Yes"
                      : "No"
                  }
                />
              </FormGroup>
            </Box>
          </Box>
        </div>
      );
    case FieldUiTypeEnum.Markdown:
      return (
        <MarkdownEditor
          key={column.id}
          id={column.id}
          name={column.name}
          value={values[column.id]}
          handleChange={(newValue: string) => {
            setValues({ ...values, [column.id]: newValue });
          }}
          preview={currentMode === "view" || isPrint}
        />
      );
    case FieldUiTypeEnum.HTML:
      return (
        <HTMLEditor
          id={column.id}
          key={column.id}
          name={column.name}
          value={values[column.id]}
          handleChange={(newValue: string) => {
            setValues({ ...values, [column.id]: newValue });
          }}
          preview={currentMode === "view" || isPrint}
        />
      );
    case FieldUiTypeEnum.Image:
      return currentMode !== "view" && !isPrint ? (
        <Box
          key={column.id}
          sx={{
            border: "1px solid rgba(158, 158, 158, 0.32)",
            p: 2,
            position: "relative",
            borderRadius: "6px",
            "&:hover": {
              border: "1px solid rgba(0, 0, 0, 0.87)",
            },
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
            {column.name}
          </Typography>
          <Box
            component="img"
            sx={{
              mb: 2
            }}
            alt=""
            src={
              values[column.id] && values[column.id].fileId
                ? downloadFileUrl(values[column.id].fileId)
                : ""
            }
          />
          <UploadButton
            fileAcceptTypes={["png", "jpg", "jpeg", "gif"]}
            file={values[column.id]}
            onUpload={(file) => {
              setValues({ ...values, [column.id]: file });
            }}
          />
        </Box>
      ) : (
        <div className="focusedNeed" tabIndex={8}>
          <Box
            key={column.id}
            className="markdownBox"
            sx={{
              border: "1px solid rgba(158, 158, 158, 0.32)",
              p: 2,
              position: "relative",
              borderRadius: "6px",
              ".focusedNeed:focus &": {
                // border: "2px solid #1976d2",
              },
              "&:hover": {
                // border: "1px solid rgba(0, 0, 0, 0.87)",
              },
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
                ".focusedNeed:focus &": {
                  // color: "#1976d2",
                  // top: "-11px",
                  // left: "9px",
                },
              }}
            >
              {column.name}
            </Typography>
            <Box
              className="imageWrapper"
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                ".focusedNeed:focus &": {
                  // margin: "-1px",
                },
              }}
              component="img"
              alt=""
              src={
                values[column.id] && values[column.id].fileId
                  ? downloadFileUrl(values[column.id].fileId)
                  : ""
              }
            />
          </Box>
        </div>
      );
    case FieldUiTypeEnum.Video:
      return currentMode !== "view" && !isPrint ? (
        <Box
          key={column.id}
          sx={{
            border: "1px solid rgba(158, 158, 158, 0.32)",
            p: 2,
            position: "relative",
            borderRadius: "6px",
            "&:hover": {
              border: "1px solid rgba(0, 0, 0, 0.87)",
            },
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
            {column.name}
          </Typography>
          <UploadButton
            fileAcceptTypes={[
              "mp4",
              "mov",
              "wmv",
              "flv",
              "avi",
              "mkv",
              "webm",
            ]}
            file={values[column.id]}
            onUpload={(file) => {
              setValues({ ...values, [column.id]: file });
            }}
          />
          <ReactPlayer
            url={
              values[column.id] && values[column.id].fileId
                ? downloadFileUrl(values[column.id].fileId)
                : ""
            }
            width="100%"
            height="auto"
            controls
          />
        </Box>
      ) : (
        <div className="focusedNeed" tabIndex={8}>
          <Box
            key={column.id}
            className="markdownBox"
            sx={{
              border: "1px solid rgba(158, 158, 158, 0.32)",
              p: 2,
              position: "relative",
              borderRadius: "6px",
              ".focusedNeed:focus &": {
                // border: "2px solid #1976d2",
              },
              "&:hover": {
                // border: "1px solid rgba(0, 0, 0, 0.87)",
              },
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
                ".focusedNeed:focus &": {
                  // color: "#1976d2",
                  // top: "-11px",
                  // left: "9px",
                },
              }}
            >
              {column.name}
            </Typography>
            <Box
              className="markdownWrapper"
              sx={{
                ".focusedNeed:focus &": {
                  // margin: "-1px",
                },
              }}
            >
              <ReactPlayer
                url={
                  values[column.id] && values[column.id].fileId
                    ? downloadFileUrl(values[column.id].fileId)
                    : ""
                }
                width="100%"
                height="auto"
                controls
              />
            </Box>
          </Box>
        </div>
      );
    case FieldUiTypeEnum.Document:
      return currentMode !== "view" && !isPrint ? (
        <Box
          key={column.id}
          sx={{
            border: "1px solid rgba(158, 158, 158, 0.32)",
            p: 2,
            position: "relative",
            borderRadius: "6px",
            "&:hover": {
              border: "1px solid rgba(0, 0, 0, 0.87)",
            },
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
            {column.name}
          </Typography>
          <UploadButton
            fileAcceptTypes={["*/*"]}
            file={values[column.id]}
            onUpload={(file) => {
              setValues({ ...values, [column.id]: file });
            }}
          />
        </Box>
      ) : (
        <div className="focusedNeed" tabIndex={8}>
          <Box
            key={column.id}
            className="markdownBox"
            sx={{
              border: "1px solid rgba(158, 158, 158, 0.32)",
              p: 2,
              position: "relative",
              borderRadius: "6px",
              ".focusedNeed:focus &": {
                // border: "2px solid #1976d2",
              },
              "&:hover": {
                // border: "1px solid rgba(0, 0, 0, 0.87)",
              },
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
                ".focusedNeed:focus &": {
                  // color: "#1976d2",
                  // top: "-11px",
                  // left: "9px",
                },
              }}
            >
              {column.name}
            </Typography>
            <Box
              className="markdownWrapper"
              sx={{
                ".focusedNeed:focus &": {
                  margin: "-1px",
                },
              }}
            >
              {values && values[column.id] ? (
                <Link href={downloadFileUrl(values[column.id].fileId)}>
                  {values[column.id].fileName}
                </Link>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </div>
      );
    case FieldUiTypeEnum.Color:
      if (currentMode !== "view" && !isPrint) {
        return (
          <Box
            key={column.id}
            sx={{
              border: "1px solid rgba(158, 158, 158, 0.32)",
              px: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
              borderRadius: "6px",
              "&:hover": {
                border: "1px solid rgba(0, 0, 0, 0.87)",
              },
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
                ".focusedNeed:focus &": {},
              }}
            >
              {column.name}
            </Typography>
            <ColorPicker
              selectedColor={values[column.id]??"#000000"}
              onColorChange={(color) => {
                setValues({ ...values, [column.id]: color });
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                px: 2,
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: values[column.id]??"#000000",
                  display: "grid",
                  placeContent: "center",
                  borderRadius: "100px",
                  cursor: "pointer",
                  position: "relative",
                }}
              ></div>
              <span
                style={{
                  color: values[column.id],
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  paddingInline: 8,
                  fontSize: 14,
                }}
              >
                {values[column.id]}
              </span>
            </Box>
          </Box>
        );
      } else {
        return (
          <div className="focusedNeed" tabIndex={8}>
            <Box
              key={column.id}
              className="markdownBox"
              sx={{
                border: "1px solid rgba(158, 158, 158, 0.32)",
                p: 2,
                position: "relative",
                borderRadius: "6px",
                ".focusedNeed:focus &": {
                  // border: "2px solid #1976d2",
                },
                "&:hover": {
                  // border: "1px solid rgba(0, 0, 0, 0.87)",
                },
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
                  ".focusedNeed:focus &": {},
                }}
              >
                {column.name}
              </Typography>
              <Box
                key={column.id}
                sx={{
                  // textAlign: "center",
                  // bgcolor: values[column.id],
                  color: values[column.id]??"#000000",
                  // px: 10,
                  // maxWidth: 100,
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    backgroundColor: values[column.id]??"#000000",
                    // display: "grid",
                    // placeContent: "center",
                    borderRadius: "100px",
                    // cursor: "pointer",
                  }}
                  // onClick={handleColorPickerToggle}
                ></div>
                <span style={{ color: values[column.id]??"#000000" }}>
                  {values[column.id]}
                </span>

                {/* {values[column.id]} */}
              </Box>
            </Box>
          </div>
        );
      }
    case FieldUiTypeEnum.Lookup:
      return (
        <FormControl key={column.id} required={column.required}>
          <InputLabel id={`${column.id}`} sx={{ top: "-5px" }}>
            {column.name}
          </InputLabel>
          <Select
            key={column.id}
            disabled={currentMode === "view" || isPrint}
            label={column.name}
            id={`${column.id}`}
            value={values[column.id]}
            onChange={(e) =>
              setValues({ ...values, [column.id]: e.target.value })
            }
            size="small"
            error={submit && column.required && !values[column.id]}
          >
            {column?.config?.values &&
              relationValues.map((value: any) => (
                <MenuItem
                  key={value.id}
                  value={value.id}
                >
                  {value[column.config.values.rightFieldId]}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      );
    default:
      return <div key={column.id}></div>;
  };
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  currentView: state.view.currentView,
  dateFormat: state.date.dateFormat
});

const mapDispatchToProps = {
  setCurrentView,
  fetchRows,
};

export default connect(mapStateToProps, mapDispatchToProps)(RenderField);
