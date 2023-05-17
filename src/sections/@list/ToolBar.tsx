import { useState } from "react";
import {
  Box
} from '@mui/material';
import ToolBarItem from '../../components/toolbar';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import Collapse from '@mui/material/Collapse';
import UserList from './UserList';
import ActionItem from '../../components/toolbar/ActionItem';
import { connect } from 'react-redux';
import { setFilters } from '../../redux/store';
import Filter from "./Filter";
import Sort from "./Sort";
import Import from "./Import";
import Export from "./Export";
import Fields from "./Fields";

type ToolbBarProps = {
  open: boolean,
  columns: any,
  filters: any,
  onOpen: (action: boolean) => void;
  setFilters: (filters: any) => void;
};

const dos = [
  {
    title: 'Undo',
    icon: 'toolbar/undo',
    active: true,
    leftIcon: true
  },
  {
    title: 'Redo',
    icon: 'toolbar/redo',
    active: false,
    leftIcon: false
  }
];

const actions = [
  {
    title: 'Filter',
    icon: 'toolbar/filter',
    active: true,
    leftIcon: true
  },
  {
    title: 'Sort',
    icon: 'toolbar/sort',
    active: true,
    leftIcon: true
  },
  {
    title: 'Fields',
    icon: 'toolbar/fields',
    active: true,
    leftIcon: true
  },
  {
    title: 'Import',
    icon: 'toolbar/import',
    active: true,
    leftIcon: true
  },
  {
    title: 'Export',
    icon: 'toolbar/export',
    active: true,
    leftIcon: true
  },
  {
    title: 'Save',
    icon: 'toolbar/save',
    active: true,
    leftIcon: true
  }
];

const ToolbBar = (props: ToolbBarProps) => {
  const { open, columns, filters, onOpen, setFilters } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [visibleSort, setVisibleSort] = useState(false);
  const [visibleImport, setVisibleImport] = useState(false);
  const [visibleExport, setVisibleExport] = useState(false);
  const [visibleFields, setVisibleFields] = useState(false);

  return (
    <Box
      sx={{
        display: {lg: 'flex'},
        py: 0.5,
        borderBottom: {xs: `1px solid ${theme.palette.palette_style.border.default}`, lg: 'none'},
        position: 'relative',
        zIndex: 2,
        backgroundColor: theme.palette.palette_style.background.default,
        justifyContent: {xs: 'space-between', md: 'inherit'}
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            display: 'flex',
            p: 1
          }}
        >
          {dos.map((toolbar) => (
            <ToolBarItem key={toolbar.title} toolbar={toolbar} />
          ))}
        </Box>
        {!isDesktop && <UserList />}
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box
          sx={{
            display: 'flex',
            paddingTop: 1.2,
            px: {xs: 1, md: 'inherit'},
            // width: {xs: '100vw', md: '100%'},
            overflow: {xs: 'auto', md: 'inherit'},
            borderTop: {xs: `1px solid ${theme.palette.palette_style.border.default}`, md: 'none'}
          }}
        >
          <Box sx={{ position: 'relative', marginRight: 2 }}>
            <ActionItem toolbar={actions[0]} onClick={() => { setVisibleFilter(!visibleFilter); }} />
            <Filter open={visibleFilter} handleClose={() => { setVisibleFilter(false); }} />
          </Box>
          <Box sx={{ position: 'relative', marginRight: 2 }}>
            <ActionItem toolbar={actions[1]} onClick={() => { setVisibleSort(!visibleSort); }} />
            <Sort open={visibleSort} handleClose={() => { setVisibleSort(false); }} />
          </Box>
          <Box sx={{ position: 'relative', marginRight: 2 }}>
            <ActionItem toolbar={actions[2]} onClick={() => { setVisibleFields(!visibleFields); }} />
            <Fields open={visibleFields} handleClose={() => { setVisibleFields(false); }} />
          </Box>
          <Box sx={{ position: 'relative', marginRight: 2 }}>
            <ActionItem toolbar={actions[3]} onClick={() => { setVisibleImport(!visibleImport); }} />
            <Import open={visibleImport} handleClose={() => { setVisibleImport(false); }} />
          </Box>
          <Box sx={{ position: 'relative', marginRight: 2 }}>
            <ActionItem toolbar={actions[4]} onClick={() => { setVisibleExport(!visibleExport); }} />
            <Export open={visibleExport} handleClose={() => { setVisibleExport(false); }} />
          </Box>
          <Box sx={{ position: 'relative', marginRight: 2 }}>
            <ActionItem toolbar={actions[5]} />
          </Box>
        </Box>
      </Collapse>
      {!isDesktop && <Box
        sx={{ position: 'absolute', right: '10px', top: '12px' }}
        onClick={ () => { onOpen(!open); } }
        >
        <Box
          component="span"
          className="svg-color"
          sx={{
            width: 24,
            height: 24,
            display: 'inline-block',
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/angle_down.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/angle_down.svg) no-repeat center / contain`,
            transform: open ? 'rotate(180deg)' : 'inherit',
            transition: 'transform 0.3s'
          }}
        />
      </Box>}
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.fieldDefinition.columns,
  filters: state.filters
});

const mapDispatchToProps = {
  setFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolbBar);
