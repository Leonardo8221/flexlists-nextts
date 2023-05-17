import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import { connect } from 'react-redux';
import useResponsive from '../../hooks/useResponsive';
import ViewFooter from '../../components/view-footer/ViewFooter';
import Pagination from '@mui/material/Pagination';

type Props = {
  rows: any;
  open: boolean;
};

const GalleryView = (props: Props) => {
  const { rows, open } = props;
  const isXL = useResponsive('up', 'xl');
  const isLG = useResponsive('up', 'lg');
  const isMD = useResponsive('up', 'md');
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const PAGE_SIZE = isXL ? 12 : isLG ? 10 : isMD ? 8 : 6;

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const getColorByImportance = (importance: string) => {
    return importance === 'Very important' ? '#FFB7B7' : '#FFEBB7';
  };

  const handleData = (data: any) => {
    setSelectedRowData(data);
    setVisibleAddRowPanel(true);
  };

  return (
    <Box sx={{ p: 1, overflowY: 'auto', height: `${windowHeight - (isLG ? 205 : isMD ? 260 : (open ? 306 : 262))}px` }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: {sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)', xl:'repeat(6, 1fr)'}, gap: '24px' }}>
            {rows.map((row: any, index: number) => (
                index >= (currentPage - 1) * PAGE_SIZE && index < currentPage * PAGE_SIZE &&
                <Box key={row.id} sx={{ boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)', borderRadius: '16px', overflow: 'hidden', maxHeight: {sm: '408px'}, cursor: 'pointer' }} onClick={() => { handleData(row) }}>
                    <Box
                        component="img"
                        sx={{
                            width: '100%',
                            height: 200,
                            objectFit: 'cover'
                        }}
                        alt="User image"
                        src={`/assets/images/users/${row.user}.jpg`}
                    />
                    <Box sx={{ px: 1.5, py: 2, marginTop: 1 }}>
                        <Box sx={{ marginBottom: 1.5 }}>
                            <Box sx={{ fontSize: '12px', textTransform: 'uppercase' }}>Task Name</Box>
                            <Box sx={{ fontWeight: 'bold' }}>{row.task_name}</Box>
                        </Box>
                        <Box sx={{ marginBottom: 1.5 }}>
                            <Box sx={{ fontSize: '12px', textTransform: 'uppercase' }}>Importance</Box>
                            <Box sx={{ fontSize: '14px', backgroundColor: getColorByImportance(row.importance), borderRadius: '5px', px: 1, py: 0.2, marginTop: 0.5, marginLeft: 0.5, width: '70%' }}>{row.importance}</Box>
                        </Box>
                        <Box sx={{ marginBottom: 1.5, maxHeight: {sm: '64px'}, overflow: 'hidden' }}>
                            <Box sx={{ fontSize: '12px', textTransform: 'uppercase' }}>Task Description</Box>
                            <Box sx={{ fontSize: '14px' }}>{row.description}</Box>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
        
        <ViewFooter visibleAddRowPanel={visibleAddRowPanel} rowData={selectedRowData} setVisibleAddRowPanel={setVisibleAddRowPanel} setRowData={setSelectedRowData}>
          <Pagination count={Math.ceil(rows.length / PAGE_SIZE)} page={currentPage} onChange={handlePage} />
        </ViewFooter>
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  rows: state.listContent.rows
});

export default connect(mapStateToProps)(GalleryView);
