import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
import useResponsive from 'src/hooks/useResponsive';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import MainLayout from 'src/layouts/view/MainLayout';
import Header from 'src/sections/@list/Header';
import MenuBar from 'src/sections/@list/MenuBar';
import ToolBar from 'src/sections/@list/ToolBar';
import DataTable from 'src/sections/@list/DataTable';
import { useRouter } from 'next/router';
import { List } from "src/models/SharedModels";
import { connect } from 'react-redux';

type ListProps = {
   currentList: List,
   getCurrentList : (listId:number)=>void
}
export  function ListDetail({currentList,getCurrentList}:ListProps) {
  const router = useRouter();
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');
  const [open, setOpen] = useState(false);
  useEffect(()=>{

  })
  return (
    <MainLayout>
      <Box
        sx={{
          backgroundColor: theme.palette.palette_style.background.default,
          boxShadow: 'none',
          width: '100%',
          height: {xs: 'calc(100% - 8px)', md: '100%'},
          overflow: 'hidden'
        }}
      >
        <Header />      
        <MenuBar search="" />
        {!isDesktop && <ToolBar open={open} onOpen={setOpen} />}
        <DataTable tab={open} />
      </Box>
    </MainLayout>
  );
}
const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = {

};
// const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
//     setColumns:(columns: any) => dispatch(setColumns(columns)),
//     setRows:(rows: any) => dispatch(setRows(rows)),
//     fetchColumns: () => dispatch(fetchColumns()),
// });
export default connect(mapStateToProps, mapDispatchToProps)(ListDetail);

