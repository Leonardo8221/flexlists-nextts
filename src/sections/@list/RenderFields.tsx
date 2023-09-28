import {
  TextField,
  Box,
  FormControlLabel,
  Typography,
  Link,
  Switch,
  FormGroup,
  Rating
} from "@mui/material";
import {useState} from "react";
import { connect } from "react-redux";
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
import { getAmPm, getDateFromTimeString, getLocalDateTimeFromString, getLocalDateFromString, getDateFormatString, getDifferneceWithCurrent } from "src/utils/convertUtils";
import { DatePicker, renderTimeViewClock } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import MarkdownEditor from "src/components/rowedit/MarkdownEditor";
import HTMLEditor from "src/components/rowedit/HTMLEditor";
import UploadButton from "src/components/upload/UploadButton";
import ReactPlayer from "react-player";
import ColorPicker from "src/components/color-picker/ColorPicker";
import LookupField from "src/components/relation/LookupField";
import SublistField from "src/components/relation/SublistField";
import LinkFieldInput from "./fields/LinkFieldInput";
import RatingField from "src/components/rating-field/RatingField";
import DisplayRating from "src/components/rating-field/DisplayRating";
import CheckboxRating from "src/components/rating-field/CheckboxRating";
import NumericRating from "src/components/rating-field/NumericRating";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

type RenderFieldProps = {
  column: ViewField;
  isPrint?: boolean;
  currentMode: string;
  values: any;
  submit: boolean;
  columns: any[];
  translations: TranslationText[];
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
  columns,
  translations,
  setValues,
  setDateValue,
  setTimeValue
}: RenderFieldProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const isDesktop = useResponsive("up", "md");
  
  const [rating, setRating] = useState<number | null>(null);

  const handleRatingChange = (newValue: number | null) => {
    setRating(newValue);
  };

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
          fullWidth
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
          value={values ? values[column.id] : ""}
          rows={4}
          required={column.required}
          error={submit && column.required && (values[column.id]==null || values[column.id]==undefined) }
        />
      ) : (
        <div key={column.id}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{ shrink: true }}
            label={column.system ? t(column.name) : column.name}
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
            sx={{ width: '100%' }}
            value={
              values && values[column.id] && values[column.id] != null
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
            format={`${getDateFormatString(window.navigator.language)} ${getAmPm() ? 'hh' : 'HH'}:mm:ss${getAmPm() ? ' a' : ''}`}
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
            label={column.system ? t(column.name) : column.name}
            value={
              values && values[getDataColumnId(column.id, columns)]
                ? `${getLocalDateTimeFromString(values[getDataColumnId(column.id, columns)])} (${getDifferneceWithCurrent(values[getDataColumnId(column.id, columns)])})`
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
            sx={{ width: '100%' }}
            value={
              values && values[column.id] && values[column.id] != null
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
            format={getDateFormatString(window.navigator.language)}
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
                ? `${getLocalDateFromString(values[getDataColumnId(column.id, columns)])} (${getDifferneceWithCurrent(values[getDataColumnId(column.id, columns)])})`
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
            sx={{ width: '100%' }}
            value={
              values && values[column.id]
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
          <FormControl sx={{width:"100%"}} key={column.id} required={column.required}>
            <InputLabel id={`${column.id}`} sx={{ top: "-5px" }}>
              {column.name}
            </InputLabel>
            <Select
              // sx={{ width: '100%' }}
              key={column.id}
              label={column.name}
              id={`${column.id}`}
              value={values ? values[column.id] : null}
              onChange={(e) =>
                setValues({ ...values, [column.id]: e.target.value })
              }
              size="small"
              error={submit && column.required && !values[column.id]}
              fullWidth
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
                    checked={values ? values[column.id] : false}
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
              {column.system ? t(column.name) : column.name}
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
          value={values ? values[column.id] : null}
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
          value={values ? values[column.id] : null}
          handleChange={(newValue: string) => {
            setValues({ ...values, [column.id]: newValue });
          }}
          preview={currentMode === "view" || isPrint}
        />
      );
    case FieldUiTypeEnum.Image:
      return currentMode !== "view" && !isPrint ? (
        <Box
          className="focusedNeed"
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
              values && values[column.id] && values[column.id].fileId
                ? downloadFileUrl(values[column.id].fileId)
                : ""
            }
          />
          <UploadButton
            fileAcceptTypes={["png", "jpg", "jpeg", "gif"]}
            file={values ? values[column.id] : null}
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
          className="focusedNeed"
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
            file={values ? values[column.id] : null}
            onUpload={(file) => {
              setValues({ ...values, [column.id]: file });
            }}
          />
          <ReactPlayer
            url={
              values && values[column.id] && values[column.id].fileId
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
          className="focusedNeed"
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
            file={values ? values[column.id] : null}
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
              width: '100%',
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
              selectedColor={values && values[column.id] ? values[column.id] : "#000000"}
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
                  backgroundColor: values && values[column.id] ? values[column.id] : "#000000",
                  display: "grid",
                  placeContent: "center",
                  borderRadius: "100px",
                  cursor: "pointer",
                  position: "relative",
                }}
              ></div>
              <span
                style={{
                  color: values && values[column.id] ? values[column.id] : "#000000",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  paddingInline: 8,
                  fontSize: 14,
                }}
              >
                {values && values[column.id] ? values[column.id] : "#000000"}
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
    case FieldUiTypeEnum.Rating:
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
            <Box sx={{py: 1, width: "100%", display:"flex", justifyContent:"space-between", }}>
              <RatingField onRatingChange={handleRatingChange} />
              <CheckboxRating/>
              <NumericRating/>
            </Box>
          </Box>
        );
      } else {
        return (
          <>
          <div className="focusedNeed" tabIndex={8}>
            <Box
              key={column.id}
              className="markdownBox"
              sx={{
                border: "1px solid rgba(158, 158, 158, 0.32)",
                p: 2,
                position: "relative",
                borderRadius: "6px",
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
            </Box>
          </div>

          <div className="focusedNeed" tabIndex={8}>
          <Box
            key={column.id}
            className="markdownBox"
            sx={{
              border: "1px solid rgba(158, 158, 158, 0.32)",
              p: 2,
              position: "relative",
              borderRadius: "6px",
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
            <Box>
              <DisplayRating rating={rating} />
            </Box>
          </Box>
        </div>
        </>
        );
      }
    case FieldUiTypeEnum.Lookup:
      return (
        <LookupField column={column} isPrint={isPrint} currentMode={currentMode} values={values} submit={submit} setValues={setValues} />
      );
    case FieldUiTypeEnum.Sublist:
      return (
        <SublistField column={column} isPrint={isPrint} currentMode={currentMode} values={values} submit={submit} setValues={setValues} />
      );
    case FieldUiTypeEnum.Link:
      return <LinkFieldInput 
              isSubmit={submit} 
              mode={(currentMode==='view'|| isPrint)?'view':currentMode} 
              column={column}
              selectedLink={values && values[column.id] ? values[column.id] : {linkValue:'',name:''}}
              onLinkChange={(value: any) => {
                setValues({ ...values, [column.id]: value });
              }}
              />
    default:
      return <div key={column.id}></div>;
  };
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns
});

export default connect(mapStateToProps)(RenderField);
