import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import Modal from '@mui/material/Modal';
import { ExportType } from 'src/enums/SharedEnums';
import { exportViewData } from 'src/services/listView.service';
import { connect } from 'react-redux';
import { View } from 'src/models/SharedModels';
import { isSucc } from 'src/models/ApiResponse';
import { getExportFileExtension, getExportMimeType } from 'src/utils/flexlistHelper';
import { el } from 'date-fns/locale';
import { set } from 'lodash';

const exports_all = [
  {
    name:ExportType.CSV,
    label: 'CSV',
    icon: 'toolbar/csv',
    isShow:true,
    isShowMore:false
  },
  {
    name:ExportType.JSON,
    label: 'JSON',
    icon: 'toolbar/google_sheets',
    isShow:true,
    isShowMore:false
  },
  {
    name:ExportType.XLSX,
    label: 'Microsoft Excel',
    icon: 'toolbar/microsoft_excel',
    isShow:false,
    isShowMore:true
  },
  {
    name:ExportType.RSS,
    label: 'RSS',
    icon: 'toolbar/microsoft_excel',
    isShow:false,
    isShowMore:true
  },
  {
    name:ExportType.XML,
    label: 'XML',
    icon: 'toolbar/jira',
    isShow:false,
    isShowMore:true
  },
  {
    name:ExportType.YML,
    label: 'YML',
    icon: 'toolbar/jira',
    isShow:false,
    isShowMore:true
  }
];

const exports_currentView = [
  {
    name:ExportType.CSV,
    label: 'CSV',
    icon: 'toolbar/csv',
    isShow:true,
    isShowMore:false
  },
  {
    name:ExportType.JSON,
    label: 'JSON',
    icon: 'toolbar/google_sheets',
    isShow:true,
    isShowMore:false
  },
  {
    name:ExportType.XLSX,
    label: 'Microsoft Excel',
    icon: 'toolbar/microsoft_excel',
    isShow:false,
    isShowMore:true
  },
  {
    name:ExportType.RSS,
    label: 'RSS',
    icon: 'toolbar/microsoft_excel',
    isShow:false,
    isShowMore:true
  },
  {
    name:ExportType.XML,
    label: 'XML',
    icon: 'toolbar/jira',
    isShow:false,
    isShowMore:true
  },
  {
    name:ExportType.YML,
    label: 'YML',
    icon: 'toolbar/jira',
    isShow:false,
    isShowMore:true
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
type ExportProps = {
  open: boolean;
  handleClose: () => void;
  currentView:View;
};

const Export = ({ open, handleClose,currentView }: ExportProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [windowHeight, setWindowHeight] = useState(0);
  const [isExportAllShowMore, setIsExportAllShowMore] = useState(false);
  const [isExportCurrentViewShowMore, setIsExportCurrentViewShowMore] = useState(false);
  const [exportAll, setExportAll] = useState(exports_all);
  const [exportCurrentView, setExportCurrentView] = useState(exports_currentView);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  const download = (blob:Blob, fileName:string) => {
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
    
    // Create a link element and simulate a click to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    // Clean up the temporary URL
    URL.revokeObjectURL(url);
  }
  const handleExport = async (exportType:ExportType) => {
    try {
      const response = await exportViewData(exportType,currentView.id)
      if(isSucc(response) && response.data)
      {
         // Create a Blob object from the JSON data
        let blob :Blob;
        if(exportType !== ExportType.XLSX)
        {
          blob = new Blob([response.data], { type: getExportMimeType(exportType) });
        }
        else
        {
          const uintArray = new Uint8Array(response.data.data);
          blob = new Blob([uintArray], { type: getExportMimeType(exportType) });
        }
        download(blob,`${currentView.name}.${getExportFileExtension(exportType)}`)
      }
      else
      {
        console.log(response);
      }
  
      
    } catch (error) {
      console.error("Error downloading JSON file:", error);
    }
  };
  const toggleExportAllShowMore = () => {
    let newExportAll = exportAll.map((x)=>{
      if(x.isShowMore)
      {
        return {...x,isShow:!isExportAllShowMore};
      }
      return x
    });
    setExportAll(newExportAll);
    setIsExportAllShowMore(!isExportAllShowMore);
  };
  const toggleExportCurrentViewShowMore = () => {
    let newExportCurrentView = exportCurrentView.map((x)=>{
      if(x.isShowMore)
      {
        return {...x,isShow:!isExportCurrentViewShowMore};
      }
      return x
    });
    setExportCurrentView(newExportCurrentView);
    setIsExportCurrentViewShowMore(!isExportCurrentViewShowMore);
  };

 

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}`, paddingBottom: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Box>Export</Box>
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
            onClick={handleClose}
          />
        </Box>
        <Box sx={{ maxHeight: `${windowHeight - 100}px`, overflow: 'auto' }}>
          <Box sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>
            <Box sx={{ paddingTop: 2 }}>All data to:</Box>
            <Box sx={{ py: 2, display: 'grid', gridTemplateColumns: {xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}, gap: '30px', rowGap: '12px' }}>
              {exportAll.filter((x)=>x.isShow).map((item: any) => (
                <Box key={item} 
                onClick={()=>handleExport(item.name)} 
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
            <Box sx={{ py: 2, cursor: 'pointer', textAlign: 'center', color: '#54A6FB' }} onClick={toggleExportAllShowMore}>{isExportAllShowMore?'View less options':'View more options'}</Box>
          </Box>
          <Box sx={{  }}>
            <Box sx={{ paddingTop: 2 }}>Current View:</Box>
            <Box sx={{ py: 2, display: 'grid', gridTemplateColumns: {xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)'}, gap: '30px', rowGap: '12px' }}>
              {exportCurrentView.filter((x)=>x.isShow).map((item: any) => (
                <Box key={item} sx={{ display: 'flex', border: `1px solid ${theme.palette.palette_style.border.default}`, borderRadius: '5px', px: 2, py: 1, cursor: 'pointer' }}>
                  <Box
                    component="img"
                    src={`/assets/icons/${item.icon}.svg`}
                    sx={{ width: 18, height: 18, marginRight: 1, marginTop: 0.3 }}
                  />
                  <Box>{item.label}</Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ py: 2, cursor: 'pointer', textAlign: 'center', color: '#54A6FB' }} onClick={toggleExportCurrentViewShowMore}>{isExportCurrentViewShowMore?'View less options':'View more options'}</Box>
          </Box>
        </Box>
      </Box>
      
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Export);
