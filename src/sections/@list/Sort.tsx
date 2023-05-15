import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { setSorts } from '../../redux/actions/fieldDefinitionActions';
import useResponsive from '../../hooks/useResponsive';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';

type Props = {
  columns: any;
  sorts: any;
  open: boolean;
  setSorts: (sorts: any) => void;
  handleClose: () => void;
};

const sortContents = [
  {
    content: 'Last - First',
    type: 'number'
  },
  {
    content: 'First - Last',
    type: 'number'
  },
  {
    content: 'A - Z',
    type: 'string'
  },
  {
    content: 'Z- A',
    type: 'string'
  }
];

const Filter = (props: Props) => {
  const { columns, sorts, open, setSorts, handleClose } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const handleSorts = (index: number, key: string, value: string) => {
    setSorts(sorts.map((sort: any, i: number) => {
      if (index === i) sort[key] = value;
      return sort;
    }));
  };

  const removeSort = (index: number) => {
    setSorts(sorts.filter((sort: any, i: number) => i !== index));
  };

  const addSort = () => {
    setSorts([
      ...sorts,
      {
        column: columns[1].name,
        content: sortContents[0].content
      }
    ]);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '100%', md: '450px'},
    backgroundColor: 'white',
    py: 2,
    px: {xs: 0.5, md: 2},
    boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.05)',
    borderRadius: '5px',
    border: 'none'
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
          <Box>Sort by</Box>
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
        <Box sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}`, py: 2, maxHeight: `${windowHeight - 100}px`, overflow: 'auto' }}>
          {sorts.length && sorts.map((sort: any, index: number) => (
            <Box key={sort.column} sx={{ marginBottom: 1, display: 'flex' }}>
              <Select
                value={sort.column}
                onChange={(e) => { handleSorts(index, 'column', e.target.value); }}
                size="small"
                sx={{ width: {md: '168px'}, textTransform: 'capitalize' }}
                className="sort_column"
              >
                {columns.map((column: any) => (
                  <MenuItem key={column.name} value={column.name} sx={{ display: 'flex' }}>
                    <Box
                      component="span"
                      className="svg-color"
                      sx={{
                        width: 14,
                        height: 14,
                        display: 'inline-block',
                        bgcolor: theme.palette.palette_style.text.primary,
                        mask: `url(/assets/icons/table/${column.icon}.svg) no-repeat center / contain`,
                        WebkitMask: `url(/assets/icons/table/${column.icon}.svg) no-repeat center / contain`,
                        marginRight: 1
                      }}
                    />
                    <Box>{column.label}</Box>
                  </MenuItem>
                ))}
              </Select>
              <Select
                value={sort.content}
                onChange={(e) => { handleSorts(index, 'content', e.target.value); }}
                size="small"
                sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
              >
                {sortContents.map((sortContent: any) => (
                  <MenuItem key={sortContent.content} value={sortContent.content}>{sortContent.content}</MenuItem>
                ))}
              </Select>
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
                  cursor: 'pointer',
                  marginTop: 1.4,
                  marginLeft: {xs: '8px', md: '30px'}
                }}
                onClick={() => { removeSort(index); }}
              />
            </Box>
          ))}
        </Box>
        <Box sx={{ paddingTop: 2, display: 'flex', cursor: 'pointer' }} onClick={addSort}>
          <Box
            component="span"
            className="svg-color"
            sx={{
              width: 14,
              height: 14,
              display: 'inline-block',
              bgcolor: theme.palette.palette_style.text.primary,
              mask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
              cursor: 'pointer',
              marginTop: 0.5,
              marginRight: 0.5
            }}
          />
          <Box>Add another sort</Box>
        </Box>
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.fieldDefinition.columns,
  sorts: state.fieldDefinition.sorts
});

const mapDispatchToProps = {
  setSorts
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
