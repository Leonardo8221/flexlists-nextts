import { useState, useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Drawer,
  Box,
  FormControlLabel,
  Checkbox,
  Alert,
  TextareaAutosize
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import { FormControl } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { connect } from 'react-redux';
import { ViewField } from 'src/models/ViewField';
import { FieldUiTypeEnum } from 'src/enums/SharedEnums';
import { listContentService } from 'src/services/listContent.service';
import { isErr, isSucc } from 'src/models/ApiResponse';
import { filter } from 'lodash';
import { ErrorConsts } from 'src/constants/errorConstants';
import ChatForm from './chat/ChatForm';
import { ChatType } from 'src/enums/ChatType';
import { DatePicker } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
interface RowFormProps {
  currentView: ViewField;
  rowData: any;
  columns: any[];
  open: boolean;
  comment: boolean;
  onClose: () => void;
  onSubmit: (values: any, action: string) => void;
}

const actions = [
  {
    title: 'Clone',
    icon: 'menu/calendar',
    action: 'clone'
  },
  {
    title: 'Archive',
    icon: 'menu/calendar',
    action: 'archive'
  },
  {
    title: 'Print',
    icon: 'menu/calendar',
    action: 'print'
  },
  {
    title: 'Delete',
    icon: 'footer/delete_list',
    action: 'delete',
    color: '#c92929'
  }
];

const RowFormPanel = ({ currentView, rowData, open, columns, comment, onClose, onSubmit }: RowFormProps) => {
  const theme = useTheme();
  const [values, setValues] = useState(rowData);
  const [submit, setSubmit] = useState(false);;
  const [commentMode, setCommentMode] = useState(comment);
  const [windowHeight, setWindowHeight] = useState(0);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    setValues(rowData);
    setSubmit(false);
    setError('')
  }, [open, rowData]);

  const handleSubmit = async () => {
    setSubmit(true);
    if (!values) setValues({ submit: true });

    let validator = true;

    if (values) {
      columns.forEach(column => {
        if (!column.system && column.required && !values[column.id]) validator = false;
      });
      if (validator) {
        //update row data
        if (rowData && rowData.id) {
          var updateRowRespone = await listContentService.updateContent(currentView.id, values)
          if (isSucc(updateRowRespone)) {
            onSubmit(values, "update")
          }
          else {
            setError(ErrorConsts.InternalServerError)
            return;
          }
        }
        else {
          var createRowResponse = await listContentService.createContent(currentView.id, values)
          if (isSucc(createRowResponse) && createRowResponse.data && createRowResponse.data.content && createRowResponse.data.content.length > 0) {

            values.id = createRowResponse.data.content[0].id
            values.createdAt = new Date().toISOString();
            values.updatedAt = new Date().toISOString()
            var archiveField = columns.find((x) => x.system && x.name === "___archived")
            if (archiveField) {
              values[archiveField.id] = false;
            }
            onSubmit(values, "create")
          } else {
            setError(ErrorConsts.InternalServerError)
            return;
          }
        }

        onClose();
      }
    }
  };

  const handleAction = async (action: string) => {
    if (action === 'delete') {
      var deleteContentResponse = await listContentService.deleteContent(currentView.listId, values.id)
      if (isErr(deleteContentResponse)) {
        setError(ErrorConsts.InternalServerError)
        return;
      }

    }
    onSubmit(values, action);
    onClose();
  };


  const setDateValue = (columnId: number, date: Dayjs | Date | null) => {
    if (date == null) {
      return;
    }
    if (typeof date === 'string') {
      setValues({ ...values, [columnId]: date })
      return
    }
    setValues({ ...values, [columnId]: date.toISOString() })
  }
  const setTimeValue = (columnId: number, time: Dayjs | null) => {
    if (time == null) {
      return;
    }
    setValues({ ...values, [columnId]: time })
    // if(typeof time === 'string')
    // {
    //   setValues({ ...values, [columnId]: time })
    //   return
    // }
  }
  const renderField = (column: ViewField) => {
    switch (column.uiField) {
      case FieldUiTypeEnum.Text:
        return <TextField
          key={column.id}
          label={column.name}
          name={`${column.id}`}
          size="small"
          type={'text'}
          onChange={(e) => {
            setValues({ ...values, [column.id]: e.target.value })
          }
          }
          value={values ? values[column.id] : ''}
          rows={4}
          // multiline={column.type === "textarea"}
          required={column.required}
          error={submit && column.required && !values[column.id]}
        />
      case FieldUiTypeEnum.LongText:
        return <TextareaAutosize
          minRows={5}
          aria-label="maximum height"
          placeholder="Maximum 4 rows"
          value={values ? values[column.id] : ''}
          onChange={(e) => {
            setValues({ ...values, [column.id]: e.target.value })
          }}
        />
        return <TextField
          key={column.id}
          label={column.name}
          name={`${column.id}`}
          size="small"
          type={'text'}
          onChange={(e) => {
            setValues({ ...values, [column.id]: e.target.value })
          }}
          value={values ? values[column.id] : ''}
          rows={4}
          multiline={true}
          required={column.required}
          error={submit && column.required && !values[column.id]}
        />
      case FieldUiTypeEnum.Integer:
      case FieldUiTypeEnum.Double:
      case FieldUiTypeEnum.Decimal:
      case FieldUiTypeEnum.Float:
      //TODO : will use this for 
      case FieldUiTypeEnum.Percentage:
      case FieldUiTypeEnum.Money:
        return <TextField
          key={column.id}
          label={column.name}
          name={`${column.id}`}
          size="small"
          type={'number'}
          onChange={(e) =>
            setValues({ ...values, [column.id]: e.target.value })
          }
          value={values[column.id]}
          rows={4}
          // multiline={column.type === "textarea"}
          required={column.required}
          error={submit && column.required && !values[column.id]}
        />
      case FieldUiTypeEnum.DateTime:
        return <LocalizationProvider dateAdapter={AdapterDayjs} key={column.id}>
          <DateTimePicker
            value={dayjs(values[column.id])}
            label={column.name}
            onChange={(x) => {
              setDateValue(column.id, x)
            }
            }
            className={submit && column.required && !values[column.id] ? 'Mui-error' : ''}
          />
        </LocalizationProvider>
      case FieldUiTypeEnum.Date:
        return <LocalizationProvider dateAdapter={AdapterDayjs} key={column.id}>
          <DatePicker
            value={dayjs(values[column.id])}
            label={column.name}
            onChange={(x) => {
              setDateValue(column.id, x)
            }
            }
            className={submit && column.required && !values[column.id] ? 'Mui-error' : ''}
          />
        </LocalizationProvider>
      case FieldUiTypeEnum.Time:
        return <LocalizationProvider dateAdapter={AdapterDayjs} key={column.id}>
          <TimePicker
            value={dayjs(values[column.id])}
            label={column.name}
            onChange={(x) => {
              setTimeValue(column.id, x)
            }
            }
            className={submit && column.required && !values[column.id] ? 'Mui-error' : ''}
          />
        </LocalizationProvider>
      case FieldUiTypeEnum.Choice:
        return <FormControl key={column.id} required={column.required}>
          <InputLabel id={`${column.id}`} sx={{ top: '-5px' }}>{column.name}</InputLabel>
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
            {column?.config?.values && column.config.values.map((choice: any) => <MenuItem key={choice.id} value={choice.id} sx={{ backgroundColor: choice.color.bg, color: choice.color.fill, '&:hover': { backgroundColor: choice.color.bg } }}>{choice.label}</MenuItem>)}
          </Select>
        </FormControl>
      case FieldUiTypeEnum.Boolean:
        return <FormControlLabel
          key={column.id}
          control={<Checkbox checked={values[column.id]} onChange={(e) => setValues({ ...values, [column.id]: e.target.checked })} />}
          label={column.name}
        />
      default:
        return <div key={column.id}></div>
    }
  }
  const handleCloseModal = () => {
    setCommentMode(false);
    onClose();
  }
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCloseModal}
      PaperProps={{
        sx: {
          width: { xs: '100%', lg: '500px' },
          border: 'none',
          height: `${windowHeight}px`,
          backgroundColor: theme.palette.palette_style.background.default,
        },
      }}
    >
      {commentMode ?
        <Box sx={{ display: 'flex', width: '100%', px: { xs: 1, md: 3 }, marginTop: 4, paddingBottom: 2, borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>
          <Box
            component="span"
            className="svg-color"
            sx={{
              width: 22,
              height: 22,
              display: 'inline-block',
              bgcolor: theme.palette.palette_style.text.primary,
              mask: `url(/assets/icons/arrow_back.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/arrow_back.svg) no-repeat center / contain`,
              cursor: 'pointer',
              marginRight: { xs: 1.5, md: 4 }
            }}
            onClick={() => { setCommentMode(false); }}
          />
        </Box> :
        rowData ?
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', px: { xs: 1, md: 3 }, marginTop: 4, paddingBottom: 2, borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>
            {actions.map((action: any) => (
              <Box
                key={action.title}
                sx={{
                  display: 'flex',
                  cursor: 'pointer'
                }}
                onClick={() => { handleAction(action.action); }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '16px',
                      color: action.color || theme.palette.palette_style.text.primary
                    }}
                  >
                    {action.title}
                  </Box>
                </Box>
                <Box
                  component="span"
                  className="svg-color"
                  sx={{
                    width: 18,
                    height: 18,
                    display: 'inline-block',
                    bgcolor: action.color || theme.palette.palette_style.text.primary,
                    mask: `url(/assets/icons/toolbar/${action.icon}.svg) no-repeat center / contain`,
                    WebkitMask: `url(/assets/icons/${action.icon}.svg) no-repeat center / contain`,
                    marginLeft: { xs: 0.2, md: 1 },
                    marginTop: 0.2
                  }}
                />
              </Box>
            ))}
          </Box> :
          <DialogTitle textAlign="center" sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>Create New Row</DialogTitle>
      }
      <DialogContent>
        {!commentMode ? <form onSubmit={(e) => e.preventDefault()} id="new_row_form">
          <Stack>
            <Box>
              {error && <Alert severity="error">{error}</Alert>}
            </Box>
          </Stack>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
              paddingTop: 2
            }}
          >
            {values && filter(columns, (x) => !x.system).map((column: any) =>
              renderField(column)
            )}
          </Stack>
        </form> :
          <ChatForm chatType={ChatType.RowData} id={rowData.id} />
        }
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem', borderTop: `1px solid ${theme.palette.palette_style.border.default}`, justifyContent: 'space-between' }}>
        <Box
          component="span"
          className="svg-color"
          sx={{
            width: 16,
            height: 16,
            display: 'inline-block',
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/header/chat.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/header/chat.svg) no-repeat center / contain`,
            cursor: 'pointer',
            marginRight: { xs: 1.5, md: 4 }
          }}
          onClick={() => { setCommentMode(true); }}
        />

        <Box sx={{ display: 'flex' }}>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained" type="submit">
            {rowData && rowData.id ? "Update Row" : "Create New Row"}
          </Button>
        </Box>
      </DialogActions>
    </Drawer>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(RowFormPanel);