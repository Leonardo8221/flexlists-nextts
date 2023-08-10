import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import { connect } from 'react-redux';
import useResponsive from '../../hooks/useResponsive';
import ViewFooter from '../../components/view-footer/ViewFooter';
import Pagination from '@mui/material/Pagination';
import { View } from "src/models/SharedModels";
import { fetchRowsByPage, setCurrentView } from "src/redux/actions/viewActions";
import { getDataColumnId, downloadFileUrl, getChoiceField } from 'src/utils/flexlistHelper';

type Props = {
  rows: any;
  columns: any;
  open: boolean;
  currentView: View;
  count: number;
  fetchRowsByPage: (page?: number, limit?: number) => void;
  setCurrentView: (view: View) => void;
};

const GalleryView = (props: Props) => {
  const { rows, columns, open, currentView, count, fetchRowsByPage, setCurrentView } = props;
  const isXL = useResponsive('up', 'xl');
  const isLG = useResponsive('up', 'lg');
  const isMD = useResponsive('up', 'md');
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowHeight, setWindowHeight] = useState(0);

  const PAGE_SIZE = isXL ? 12 : isLG ? 10 : isMD ? 8 : 6;

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    fetchRowsByPage(0, PAGE_SIZE);
  }, []);

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    const newView: View = Object.assign({}, currentView);

    newView.page = value - 1;
    setCurrentPage(value);
    setCurrentView(newView);
    fetchRowsByPage(newView.page, PAGE_SIZE);
  };

  const handleData = (data: any) => {
    setSelectedRowData(data);
    setVisibleAddRowPanel(true);
  };

  const getAvatar = (data: any):string =>{
    const columnData = data[getDataColumnId(currentView.config.avatarId, columns)];
    
    return columnData ? downloadFileUrl(columnData.fileId) : `/assets/images/users/undefined.jpg`;
  }

  const getTaskName = (data: any):string =>{
    return data[getDataColumnId(currentView.config.nameId, columns)]
  }

  const getImportance = (data: any):string =>{
    const importanceColumn = columns.find((column: any) => column.id === currentView.config.importanceId);
    const columnData = data[getDataColumnId(currentView.config.importanceId, columns)];
    const importanceColor = getChoiceField(columnData, importanceColumn);

    return importanceColor.color.bg;
  }

  const getTaskDescription = (data: any):string =>{
    return data[getDataColumnId(currentView.config.descriptionId, columns)]
  }

  return (
    <Box sx={{ p: 1, overflowY: 'auto', height: `${windowHeight - (isLG ? 205 : isMD ? 260 : (open ? 306 : 262))}px` }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: {sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)', xl:'repeat(6, 1fr)'}, gap: '24px' }}>
            {rows.map((row: any) => (
                <Box key={row.id} sx={{ boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)', borderRadius: '16px', overflow: 'hidden', maxHeight: {sm: '408px'}, cursor: 'pointer' }} onClick={() => { handleData(row) }}>
                    <Box
                        component="img"
                        sx={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover'
                        }}
                        alt="User image"
                        src={getAvatar(row)}
                    />
                    <Box sx={{ px: 1.5, py: 2, marginTop: 1 }}>
                        <Box sx={{ marginBottom: 1.5 }}>
                            <Box sx={{ fontSize: '12px', textTransform: 'uppercase' }}>Task Name</Box>
                            <Box sx={{ fontWeight: 'bold' }}>{getTaskName(row)}</Box>
                        </Box>
                        <Box sx={{ marginBottom: 1.5 }}>
                            <Box sx={{ fontSize: '12px', textTransform: 'uppercase' }}>Importance</Box>
                            <Box sx={{ fontSize: '14px', backgroundColor: getImportance(row), borderRadius: '5px', px: 1, py: 0.2, marginTop: 0.5, marginLeft: 0.5, width: '70%' }}>{row.importance}</Box>
                        </Box>
                        <Box sx={{ marginBottom: 1.5, maxHeight: {sm: '64px'}, overflow: 'hidden' }}>
                            <Box sx={{ fontSize: '12px', textTransform: 'uppercase' }}>Task Description</Box>
                            <Box sx={{ fontSize: '14px' }}>{getTaskDescription(row)}</Box>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
        
        <ViewFooter visibleAddRowPanel={visibleAddRowPanel} rowData={selectedRowData} setVisibleAddRowPanel={setVisibleAddRowPanel} setRowData={setSelectedRowData}>
          <Pagination count={Math.ceil(count / PAGE_SIZE)} page={currentPage} onChange={handlePage} />
        </ViewFooter>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  rows: state.view.rows,
  columns: state.view.columns,
  currentView: state.view.currentView,
  count: state.view.count
});

const mapDispatchToProps = {
  fetchRowsByPage,
  setCurrentView
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryView);
