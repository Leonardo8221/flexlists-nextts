import { useState } from "react";
import {
  Button,
  Box
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Iconify from '../../components/iconify';
import ToolBar from './ToolBar';
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import useResponsive from '../../hooks/useResponsive';
import UserList from "./UserList";
import { connect } from 'react-redux';
import AddCommentPanel from "src/components/right-panel/AddCommentPanel";

type Props = {
  columns: any;
  rows: any;
};

const lists = [
  {
    label: 'Rename list',
    value: 'rename_list'
  },
  {
    label: 'Delete list',
    value: 'delete_list'
  },
  {
    label: 'Duplicate',
    value: 'duplicate'
  },
  {
    label: 'Archive',
    value: 'archive'
  }
];

const Header = (props: Props) => {
  const { columns, rows } = props;
  const theme = useTheme();
  const [isFavorite, setIsFavorite] = useState(true);
  const [open, setOpen] = useState(true);
  const isDesktop = useResponsive('up', 'lg');
  const [visiblePanel, setVisiblePanel] = useState(false);

  // const handleNewRow = (values: any, action: string) => {
  //   rows.push(values);
  //   setRows([...rows]);
  // };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
        px: {xs: 0.5, lg: 2},
        py: {xs: 1, lg: 0},
        width: {md: 'calc(100vw - 100px)'},
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          component="span"
          className="svg-color"
          sx={{
            width: {xs: 20, md: 23},
            height: {xs: 20, md: 23},
            display: 'inline-block',
            bgcolor: isFavorite ? '#FFD789' : '#666',
            mask: `url(/assets/icons/star.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/star.svg) no-repeat center / contain`,
            cursor: 'pointer'
          }}
          onClick={() => { setIsFavorite(!isFavorite); }}
        />
        <Box
          sx={{
            fontSize: {xs: '16px', lg: '22px'},
            fontWeight: '600',
            lineHeight: '1.2',
            marginLeft: {xs: 0.3, md: 1},
            marginTop: 0.3
          }}
        >
          Flexlists SaaS
        </Box>
        <CDropdown id="list_action" className="list_action">
          <CDropdownToggle color="secondary">
            <Box
              component="span"
              className="svg-color"
              sx={{
                width: {xs: 12, lg: 24},
                height: {xs: 12, lg: 24},
                display: 'inline-block',
                bgcolor: '#16385C',
                mask: `url(/assets/icons/dots.svg) no-repeat center / contain`,
                WebkitMask: `url(/assets/icons/dots.svg) no-repeat center / contain`,
                marginLeft: {xs: 0.5, lg: 1},
                marginTop: {xs: 0.5, lg: 0.3},
                cursor: 'pointer'
              }}
            />
          </CDropdownToggle>
          <CDropdownMenu>
            {lists.map((list) => (
              <CDropdownItem href="#" key={list.label}>{list.label}</CDropdownItem>  
            ))}
          </CDropdownMenu>
        </CDropdown>
      </Box>
      <Box
        sx={{ display: { xs: 'none', lg: 'block' } }}
      >
        <ToolBar open={open} onOpen={setOpen} />
      </Box>
      {isDesktop && <UserList />}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Box
          component="span"
          className="svg-color"
          sx={{
            width: {xs: 18, md: 22},
            height: {xs: 18, md: 22},
            display: 'inline-block',
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/header/chat.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/header/chat.svg) no-repeat center / contain`,
            cursor: 'pointer',
            marginRight: {xs: 1, md: 4}
          }}
          onClick={() => { setVisiblePanel(true); }}
        />
        <Box
          component="span"
          className="svg-color"
          sx={{
            width: {xs: 18, md: 22},
            height: {xs: 18, md: 22},
            display: 'inline-block',
            bgcolor: theme.palette.palette_style.text.primary,
            mask: `url(/assets/icons/header/history.svg) no-repeat center / contain`,
            WebkitMask: `url(/assets/icons/header/history.svg) no-repeat center / contain`,
            cursor: 'pointer',
            marginRight: {xs: 1, md: 4}
          }}
        />
        <Box>
          <Button size="small" color="primary" variant="contained" startIcon={<Iconify icon={'eva:paper-plane-fill'} />}>
            Publish
          </Button>
        </Box>
        <Box
          sx={{ marginLeft: {xs: 0.5, lg: 2} }}
        >
          <Button size="small" color="primary" variant="text" startIcon={<Iconify icon={'eva:share-outline'} />}>
            Share
          </Button>
        </Box>
      </Box>
      <AddCommentPanel
        open={visiblePanel}
        onClose={() => setVisiblePanel(false)}
      />
    </Box>
  );
}

const mapStateToProps = (state: any) => ({
  columns: state.columns,
  rows: state.rows
});

const mapDispatchToProps = {
  // setRows
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
