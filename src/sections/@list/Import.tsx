import { useEffect, useState } from 'react';
import { Box, MenuItem, Select, SelectChangeEvent,Button, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import Modal from '@mui/material/Modal';
import { ImportType } from 'src/enums/SharedEnums';
import { connect } from 'react-redux';
import { View } from 'src/models/SharedModels';
import { FlexlistsError, FlexlistsSuccess, isSucc } from 'src/models/ApiResponse';
import { FlashMessageModel } from 'src/models/FlashMessageModel';
import { setFlashMessage } from 'src/redux/actions/authAction';
import { set } from 'lodash';
import axios from 'src/utils/axios';
import { fetchColumns, fetchRowsByPage } from 'src/redux/actions/viewActions';
import { getImportFileExtension } from 'src/utils/flexlistHelper';
import path from 'path';

const imports = [
  {
    name:ImportType.CSV,
    label: 'CSV',
    icon: 'toolbar/csv',
  },
  {
    name:ImportType.JSON,
    label: 'JSON',
    icon: 'toolbar/google_sheets',
  },
  {
    name:ImportType.XLSX,
    label: 'Microsoft Excel',
    icon: 'toolbar/microsoft_excel',
  },
  {
    name:ImportType.XML,
    label: 'XML',
    icon: 'toolbar/jira',
  },
  {
    name:ImportType.YML,
    label: 'YML',
    icon: 'toolbar/jira',
  }
];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '100%', md: '480px'},
  backgroundColor: 'white',
  py: 2,
  px: {xs: 0.5, md: 2},
  boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.05)',
  borderRadius: '5px',
  border: 'none'
};
type ImportProps = {
  open: boolean;
  handleClose: () => void;
  currentView:View;
  setFlashMessage: (message: FlashMessageModel | undefined) => void;
  fetchColumns: (viewId:number) => void;
  fetchRowsByPage: (page?: number, limit?: number) => void;
};

const ImportContent = ({ open, handleClose,currentView,setFlashMessage,fetchRowsByPage ,fetchColumns}: ImportProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [windowHeight, setWindowHeight] = useState(0);
  const [screenMode, setScreenMode] = useState<'main'|'config'>('main');
  const [delimiter, setDelimiter] = useState<string>(';')
  const csvDelimiters :string[] = [';',',']; 
  const [importType,setImportType] = useState<ImportType>(ImportType.CSV);
  const [addMissingFields,setAddMissingFields] = useState<boolean>(true);
  const [truncate,setTruncate] = useState<boolean>(false);
  const [file,setFile] = useState<File>();
  const [error,setError] = useState<string>('');
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const handleImport = async (importType:ImportType) => {
    setScreenMode('config');
    setImportType(importType)
  }
  const importContent = async () => {
    try {
      if(!file) {
        setError('Please select file')
        return;
      }
      if(path.extname(file.name).substring(1) !== getImportFileExtension(importType)) {
        setError(`Please select ${importType} file`)
        return;
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('viewId', currentView.id.toString());
      formData.append('importType', importType);
      formData.append('addMissingFields', addMissingFields.toString());
      formData.append('truncate', truncate.toString());
      formData.append('delimiter', delimiter.toString());
      let response = await axios.post<FlexlistsError|FlexlistsSuccess>(`/api/listView/importViewData`, 
            formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              })
      if(response && isSucc(response.data) && response.data.data) {
        setFlashMessage({type:'success',message:'Import successfully'})
        fetchColumns(currentView.id)
        fetchRowsByPage(0,25);
        onClose();
      }
      else {
        setFlashMessage({type:'error',message:(response?.data as FlexlistsError)?.message})
      }
    } catch (error) {
      setFlashMessage({type:'error',message:'unknown error'})
    }
  };

  const onDelimiterChange = (event: SelectChangeEvent) => {
    setError('');
    setDelimiter(event.target.value)
  };
  const onClose = () => { 
    resetImportScreen();
    handleClose();
  }
  const backMainScreen = () => {
    resetImportScreen();
  }
  const resetImportScreen = () => {
    setError('');
    setScreenMode('main');
    setDelimiter(';');
    setFile(undefined);
  }
  const onAddMissingFieldsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setAddMissingFields(event.target.checked);
  };
  const onTruncateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setTruncate(event.target.checked);
  };
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError('');
    if (event.target.files && event.target.files.length > 0) {
      if(path.extname(event.target.files[0].name).substring(1) === getImportFileExtension(importType)) { 
      setFile(event.target.files[0]);
      }
      else
      {
        setError(`Please select ${importType} file`)
      }
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}`, paddingBottom: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Box>Import</Box>
          <Box
            component="span"
            className="svg-color add_choice"
            sx={{
              width: 18,
              height: 18,
              display: 'inline-block',
              bgcolor: theme.palette.palette_style.text.primary,
              mask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
              cursor: 'pointer'
            }}
            onClick={onClose}
          />
        </Box>
        {
          screenMode === 'main' ? (
              <Box sx={{ maxHeight: `${windowHeight - 100}px`, overflow: 'auto' }}>
            <Box sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>
              <Box sx={{ py: 2, display: 'grid', gridTemplateColumns: {xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}, gap: '30px', rowGap: '12px' }}>
                {imports.map((item: any,index) => (
                  <Box key={index} 
                  onClick={()=>handleImport(item.name)} 
                  sx={{ display: 'flex', border: `1px solid ${theme.palette.palette_style.border.default}`, borderRadius: '5px', px: 2, py: 1, cursor: 'pointer' }}>
                    <Box
                      component="img"
                      src={`/assets/icons/${item.icon}.svg`}
                      sx={{ width: 18, height: 18, marginRight: 1, marginTop: 0.3 }}
                    />
                    <Box>{item.label}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          ) :
          (
            <Box sx={{ maxHeight: `${windowHeight - 100}px`, overflow: 'auto' }}>
              <Box>{error && <Alert severity="error">{error}</Alert>}</Box>
               <Box sx={{marginBottom:5,marginTop:5}}>
               <Button
                    component="label"
                    variant="contained"
                    sx={{ marginRight: "1rem" }}
                  >
                    Choose File{" "}
                    <input
                      type="file"
                      accept={`.${getImportFileExtension(importType)}`}
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  <span>{file?.name}</span>
               </Box>
               {
                  importType === ImportType.CSV && <Box sx={{marginBottom:5,marginTop:5}}>
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
               }
               
               <Box sx={{marginBottom:5,marginTop:5}}>
                <FormControlLabel
                    control={
                      <Checkbox
                        checked={addMissingFields}
                        onChange={onAddMissingFieldsChange}
                        name="required"
                      />
                    }
                    label="Add Missing Fields"
                  />
               </Box>
               <Box sx={{marginBottom:5,marginTop:5}}>
                <FormControlLabel
                    control={
                      <Checkbox
                        checked={truncate}
                        onChange={onTruncateChange}
                        name="required"
                      />
                    }
                    label="Truncate"
                  />
               </Box>
               <Box>
                <Button type='submit' variant='contained' onClick={()=> importContent()} >Import</Button>
                <Button onClick={()=>backMainScreen()}>Cancel</Button>
               </Box>
            </Box>
          )
        }
        
      </Box>
      
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  setFlashMessage,
  fetchRowsByPage,
  fetchColumns
};
export default connect(mapStateToProps, mapDispatchToProps)(ImportContent);
