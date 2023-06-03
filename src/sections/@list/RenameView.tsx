import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import CentralModal from 'src/components/modal/CentralModal';
import { connect } from 'react-redux';
import { setCurrentView } from 'src/redux/actions/viewActions';
import { View } from 'src/models/SharedModels';
import { listViewService } from 'src/services/listView.service';
import { isSucc } from 'src/models/ApiResponse';


type RenameViewProps = {
  open: boolean;
  handleClose: () => void;
  currentView:View;
  setCurrentView : (newView:View) =>void
};

const RenameView = ({ open, handleClose,currentView,setCurrentView }: RenameViewProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [windowHeight, setWindowHeight] = useState(0);
  console.log(currentView);
  const [view,setView] = useState<View>(currentView)
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  useEffect(()=>{
     setView(currentView)
  },[currentView])
  const handleViewNameChange = (event : React.ChangeEvent<HTMLInputElement>) =>{
       var newView = Object.assign({},view)
       newView.name = event.target.value
       setView(newView)
  }
  const onSubmit = async() =>
  {
      var response = await listViewService.renameView(view.id,view.name)
      if(isSucc(response))
      {
        setCurrentView(view)
        handleClose()
      }
  }
  return (
     <CentralModal open={open} handleClose={handleClose}>
        <Box sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}`, paddingBottom: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Box>Rename View</Box>
        </Box>
        <Box >
          {
            view && 
            <TextField
                label="Name"
                size="small"
                type="text"
                onChange={handleViewNameChange}
                value={view.name}
                sx={{ border: 'none' }}
              />
         }
        </Box>
        <Box sx={{ paddingTop: 2, textAlign: 'center', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          <Box sx={{ py: 1, border: `1px solid ${theme.palette.palette_style.border.default}`, borderRadius: '5px', cursor: 'pointer' }} onClick={() => { onSubmit() }}>Save</Box>
        </Box>
     </CentralModal>
     );
};

const mapStateToProps = (state: any) => ({
  currentView : state.view.currentView
});

const mapDispatchToProps = {
  setCurrentView
};

export default connect(mapStateToProps, mapDispatchToProps)(RenameView);
