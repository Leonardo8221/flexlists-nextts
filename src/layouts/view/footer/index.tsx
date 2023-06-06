import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { connect } from 'react-redux';
import useResponsive from '../../../hooks/useResponsive';
import AddCommentPanel from 'src/components/right-panel/AddCommentPanel';
import { setRows } from 'src/redux/actions/viewActions';
type Props = {
  columns: any;
  rows: any;
  setRows: (columns: any) => void;
};

const toolbars = [
  {
    title: 'Add comment',
    icon: 'footer/add_comment'
  }
];

const Footer = (props: Props) => {
  const { columns, rows, setRows } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

  const [visiblePanel, setVisiblePanel] = useState(false);

  const handleNewRow = (values: any, action: string) => {
    rows.push(values);
    setRows([...rows]);
  };

  const handleFooterAction = (title: string) => {
    if (title === 'Add comment') setVisiblePanel(true);
  };

  return (
    <Box
      sx={{
        display: isDesktop ? 'flex' : 'none',
        justifyContent: {xs: 'space-between', md: 'left'},
        position: 'fixed',
        width: {xs: '100%', md: '180px'},
        bottom: 0,
        left: 0,
        marginLeft: {xs: '10px', md: '243px'},
        paddingRight: '10px',
        height: '40px',
        paddingTop: '10px',
        backgroundColor: theme.palette.palette_style.background.default
      }}
    >
      {toolbars.map((toolbar) => (
        <Box
          key={toolbar.title}
          sx={{
            display: 'flex',
            cursor: 'pointer',
            marginRight: {md: '25px'}
          }}
          onClick={() => { handleFooterAction(toolbar.title); }}
        >
          <Box
            component="span"
            className="svg-color"
            sx={{
              width: 18,
              height: 18,
              display: 'inline-block',
              bgcolor: theme.palette.palette_style.text.primary,
              mask: `url(/assets/icons/${toolbar.icon}.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/${toolbar.icon}.svg) no-repeat center / contain`,
              marginRight: 1,
              marginTop: 0.2
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Box
              sx={{
                fontSize: {xs: '14px', sm: '16px'},
                color: theme.palette.palette_style.text.primary
              }}
            >
              {toolbar.title}
            </Box>
          </Box>
        </Box>
      ))}
      <AddCommentPanel
        open={visiblePanel}
        onClose={() => setVisiblePanel(false)}
      />
    </Box>
  );
}

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  rows: state.view.columns
});

const mapDispatchToProps = {
  setRows
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
  