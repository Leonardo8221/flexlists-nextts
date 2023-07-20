import { useEffect, useState } from 'react';
import { Box, MenuItem, Select, SelectChangeEvent,Button, FormControlLabel, Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import Modal from '@mui/material/Modal';
import { ImportType } from 'src/enums/SharedEnums';
import { connect } from 'react-redux';
import { View } from 'src/models/SharedModels';
import { isSucc } from 'src/models/ApiResponse';
import { FlashMessageModel } from 'src/models/FlashMessageModel';
import { setFlashMessage } from 'src/redux/actions/authAction';

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
  setFlashMessage: (message: FlashMessageModel | undefined) => void
};

const ImportContent = ({ open, handleClose,currentView,setFlashMessage }: ImportProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [windowHeight, setWindowHeight] = useState(0);
  const [screenMode, setScreenMode] = useState<'main'|'config'>('main');
  const [delimiter, setDelimiter] = useState<string>(';')
  const csvDelimiters :string[] = [';',',']; 
  const [importType,setImportType] = useState<ImportType>(ImportType.CSV);
  const [addMissingFields,setAddMissingFields] = useState<boolean>(false);
  const [truncate,setTruncate] = useState<boolean>(false);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const handleImport = async (importType:ImportType) => {
    setScreenMode('config');
    setImportType(importType)
  }
  const importContent = async () => {
    try {
      
    } catch (error) {
      setFlashMessage({type:'error',message:'unknown error'})
    }
  };

  const onDelimiterChange = (event: SelectChangeEvent) => {
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
    setScreenMode('main');
    setDelimiter(';');
  }
  const onAddMissingFieldsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddMissingFields(event.target.checked);
  };
  const onTruncateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTruncate(event.target.checked);
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
               <Box sx={{marginBottom:5,marginTop:5}}>
               <Button
                    component="label"
                    variant="contained"
                    sx={{ marginRight: "1rem" }}
                  >
                    Choose File{" "}
                    <input
                      type="file"
                      accept=".json"
                      hidden
                      onChange={()=>{}}
                    />
                  </Button>
               </Box>
               <Box sx={{marginBottom:5,marginTop:5}}>
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
                    label="Add Missing Fields"
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
  setFlashMessage
};
export default connect(mapStateToProps, mapDispatchToProps)(ImportContent);
