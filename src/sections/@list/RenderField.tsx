import {
  TextField,
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Link,
} from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { ViewField } from "src/models/ViewField";
import { FieldUiTypeEnum } from "src/enums/SharedEnums";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  downloadFileUrl,
  getChoiceField,
  getDataColumnId,
} from "src/utils/flexlistHelper";
import UploadButton from "src/components/upload/UploadButton";
import ReactPlayer from "react-player";
import MarkdownEditor from "src/components/rowedit/MarkdownEditor";
import HTMLEditor from "src/components/rowedit/HTMLEditor";
import { getAmPm, getLocalDateTimeFromString, getLocalDateFromString, getDateFromTimeString } from "src/utils/convertUtils";

const setDateValue = (
  columnId: number,
  date: Dayjs | Date | null,
  values: any,
  setValues: (values: any) => void
) => {
  if (date == null) {
    return;
  }
  if (typeof date === "string") {
    setValues({ ...values, [columnId]: date });
    return;
  }
  setValues({ ...values, [columnId]: date.toISOString() });
};
const setTimeValue = (
  columnId: number,
  time: Dayjs | null,
  values: any,
  setValues: (values: any) => void
) => {
  if (time == null) {
    return;
  }
  setValues({ ...values, [columnId]: time });
  // if(typeof time === 'string')
  // {
  //   setValues({ ...values, [columnId]: time })
  //   return
  // }
};

export const renderField = (
  column: ViewField,
  currentMode: string,
  values: any,
  setValues: (values: any) => void,
  submit: boolean,
  columns: any[],
  isPrint: boolean = false,
  dateFormat: string
) => {
  switch (column.uiField) {
    case FieldUiTypeEnum.Text:
      return currentMode !== "view" && !isPrint ? (
        <TextField
          key={column.id}
          style={{ width: "100%" }}
          label={column.name}
          name={`${column.id}`}
          size="small"
          type={"text"}
          onChange={(e) => {
            setValues({ ...values, [column.id]: e.target.value });
          }}
          value={values ? values[column.id] : ""}
          rows={4}
          // multiline={column.type === "textarea"}
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
          />
          {/* <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
              {column.name}
              <InfoOutlinedIcon sx={{ color: "#999", fontSize: 16 }} />
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {values ? values[column.id]?.toString() : ""}
            </Typography> */}
        </div>
      );
    case FieldUiTypeEnum.LongText:
      // return (<>
      //   <FormControl>
      //     <InputLabel sx={{ top: '-50px' }}>{column.name}</InputLabel>
      //     <TextareaAutosize
      //       minRows={5}
      //       key={column.id}
      //       name={`${column.id}`}
      //       aria-label={column.name}
      //       //label={column.name}
      //       value={values ? values[column.id] : ''}
      //       onChange={(e) => {
      //         setValues({ ...values, [column.id]: e.target.value })
      //       }}
      //       required={column.required}
      //     // error={submit && column.required && !values[column.id]}
      //     />
      //   </FormControl>
      // </>)
      // return <TextareaAutosize
      //   minRows={5}
      //   key={column.id}
      //   name={`${column.id}`}
      //   aria-label={column.name}
      //   //label={column.name}
      //   value={values ? values[column.id] : ''}
      //   onChange={(e) => {
      //     setValues({ ...values, [column.id]: e.target.value })
      //   }}
      //   required={column.required}
      // // error={submit && column.required && !values[column.id]}
      // />
      return currentMode !== "view" && !isPrint ? (
        <TextField
          key={column.id}
          label={column.name}
          name={`${column.id}`}
          size="small"
          type={"text"}
          onChange={(e) => {
            setValues({ ...values, [column.id]: e.target.value });
          }}
          value={values ? values[column.id] : ""}
          // rows={4}
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
            label={column.name}
            value={values ? values[column.id] : ""}
          />
          {/* <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
              {column.name}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {values ? values[column.id] : ""}
            </Typography> */}
        </div>
      );
    case FieldUiTypeEnum.Integer:
    case FieldUiTypeEnum.Double:
    case FieldUiTypeEnum.Decimal:
    case FieldUiTypeEnum.Float:
    //TODO : will use this for
    case FieldUiTypeEnum.Percentage:
    case FieldUiTypeEnum.Money:
      return currentMode !== "view" && !isPrint ? (
        <TextField
          key={column.id}
          label={column.name}
          name={`${column.id}`}
          size="small"
          type={"number"}
          onChange={(e) =>
            setValues({ ...values, [column.id]: e.target.value })
          }
          value={values[column.id]}
          rows={4}
          // multiline={column.type === "textarea"}
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
            value={values ? values[getDataColumnId(column.id, columns)] : ""}
          />
          {/* <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
              {column.name}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {values ? values[getDataColumnId(column.id, columns)] : ""}
            </Typography> */}
        </div>
      );
    case FieldUiTypeEnum.DateTime:
      return currentMode !== "view" && !isPrint ? (
        <LocalizationProvider dateAdapter={AdapterDayjs} key={column.id}>
          <DateTimePicker
            value={dayjs(values[column.id])}
            label={column.name}
            onChange={(x) => {
              setDateValue(column.id, x, values, setValues);
            }}
            className={
              submit && column.required && !values[column.id] ? "Mui-error" : ""
            }
            ampm={getAmPm()}
            format={`${dateFormat} ${getAmPm() ? 'hh' : 'HH'}:mm:ss${getAmPm() ? ' a' : ''}`}
          />
        </LocalizationProvider>
      ) : (
        <div key={column.id}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            label={column.name}
            value={
              values && values[getDataColumnId(column.id, columns)]
                ? getLocalDateTimeFromString(values[getDataColumnId(column.id, columns)])
                : ""
            }
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
              setDateValue(column.id, x, values, setValues);
            }}
            className={
              submit && column.required && !values[column.id] ? "Mui-error" : ""
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
            label={column.name}
            value={
              values && values[getDataColumnId(column.id, columns)]
                ? getLocalDateFromString(values[getDataColumnId(column.id, columns)])
                : ""
            }
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
              setTimeValue(column.id, x, values, setValues);
            }}
            className={
              submit && column.required && !values[column.id] ? "Mui-error" : ""
            }
            ampm={getAmPm()}
          />
        </LocalizationProvider>
      ) : (
        <div key={column.id}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            label={column.name}
            value={
              values && values[getDataColumnId(column.id, columns)]
                ? dayjs(getDateFromTimeString(values[column.id]))
                : "null"
            }
          />
        </div>
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
              label={column.name}
              value={choice?.label}
            />
            {/* <Typography
                variant="subtitle2"
                sx={{ textTransform: "uppercase" }}
              >
                {column.name}
              </Typography>
              <Box
                key={column.id}
                sx={{
                  // textAlign: "center",
                  bgcolor: choice?.color.bg,
                  borderRadius: "20px",
                  color: choice?.color.fill,
                  // fontFamily: choice?.font,
                  px: 1,
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  width: "fit-content",
                  textOverflow: "ellipsis",
                }}
              >
                {choice?.label}
              </Box> */}
          </div>
        );
      }
    case FieldUiTypeEnum.Boolean:
      return currentMode !== "view" && !isPrint ? (
        <FormControlLabel
          key={column.id}
          control={
            <Checkbox
              checked={values[column.id]}
              onChange={(e) =>
                setValues({ ...values, [column.id]: e.target.checked })
              }
            />
          }
          label={column.name}
        />
      ) : (
        <div key={column.id}>
          <TextField
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            label={column.name}
            value={
              values && values[column.id]?.toString() === "true" ? "yes" : "no"
            }
          />
          {/* <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
              {column.name}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {values && values[column.id]?.toString() === "true"
                ? "yes"
                : "no"}
            </Typography> */}
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
      break;
    // return currentMode !== "view" ? (
    //   <Box
    //     key={column.id}
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "flex-start",
    //       position: "relative",
    //     }}
    //   >
    //     <Typography
    //       variant="body1"
    //       sx={{
    //         textTransform: "capitalize",
    //         color: "rgba(0, 0, 0, 0.6)",
    //         fontSize: "12px",
    //         position: "absolute",
    //         top: "-10px",
    //         left: "12px",
    //         background: "#fff",
    //       }}
    //     >
    //       {column.name}
    //     </Typography>
    //     {/* <MarkdownEditor
    //       markdown={values[column.id]}
    //       setMarkdown={(newValue) => {
    //         setValues({ ...values, [column.id]: newValue });
    //       }}
    //     /> */}
    //     <SimpleMdeReact value={values[column.id]}
    //       style={{ width: '100%' }}
    //       onChange={(newValue: string) => {
    //         setValues({ ...values, [column.id]: newValue });
    //       }} />
    //   </Box>
    // ) : (
    //   <div key={column.id}>
    //     <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
    //       {column.name}
    //     </Typography>
    //     <ReactMarkdown>{values[column.id]}</ReactMarkdown>
    //   </div>
    // );
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
      break;
    // return currentMode !== "view" ? (
    //   <Box
    //     key={column.id}
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "flex-start",
    //       position: "relative",
    //       height: '300px',
    //       paddingBottom: '50px'
    //     }}
    //   >
    //     <Typography
    //       variant="body1"
    //       sx={{
    //         textTransform: "capitalize",
    //         color: "rgba(0, 0, 0, 0.6)",
    //         fontSize: "12px",
    //         position: "absolute",
    //         top: "-10px",
    //         left: "12px",
    //         background: "#fff",
    //       }}
    //     >
    //       {column.name}
    //     </Typography>
    //     <ReactQuill theme="snow" value={values[column.id]}
    //       style={{ width: '97%', height: '100%' }}

    //       onChange={(newValue: string) => {
    //         setValues({ ...values, [column.id]: newValue });
    //       }} />
    //   </Box>
    // ) : (
    //   <div key={column.id}>
    //     <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
    //       {column.name}
    //     </Typography>
    //     <div
    //       dangerouslySetInnerHTML={{
    //         __html: values[column.id]?.toString(),
    //       }}
    //     />
    //   </div>
    // );
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
              mb: 2,
              // height: 100,
              // width: 350,
              // maxHeight: { xs: 233, md: 167 },
              // maxWidth: { xs: 350, md: 250 },
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
              className="imageWrapper"
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                ".focusedNeed:focus &": {
                  margin: "-1px",
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
        <Box key={column.id}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {column.name}
          </Typography>
          <UploadButton
            fileAcceptTypes={["mp4", "mov", "wmv", "flv", "avi", "mkv", "webm"]}
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
          {/* <CardMedia
                  component='video'
                  image={values[column.id] && values[column.id].fileId? downloadFileUrl(values[column.id].fileId):''}
                  autoPlay
              /> */}
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
              className="markdownWrapper"
              sx={{
                ".focusedNeed:focus &": {
                  margin: "-1px",
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
    default:
      return <div key={column.id}></div>;
  }
};
