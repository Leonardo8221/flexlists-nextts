import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { setFilters } from '../../redux/actions/fieldDefinitionActions';
import useResponsive from '../../hooks/useResponsive';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';

type Props = {
  columns: any;
  filters: any;
  open: boolean;
  setFilters: (filters: any) => void;
  handleClose: () => void;
};

const Filter = (props: Props) => {
  const { columns, filters, open, setFilters, handleClose } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const getColumn = (column_name: string) => {
    const column = columns.filter((item: any) => item.name === column_name);

    return column[0];
  };

  const handleFilters = (index: number, key: string, value: string) => {
    setFilters(filters.map((filter: any, i: number) => {
      if (index === i) filter[key] = value;
      return filter;
    }));
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((filter: any, i: number) => i !== index));
  };

  const addFilter = () => {
    setFilters([
      ...filters,
      {
        column: columns[1].name,
        operator: 'is',
        operand: '',
        condition: 'and'
      }
    ]);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '100%', md: '645px'},
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
          <Box>Show fields in list if:</Box>
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
        <Box sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}`, py: 2, maxHeight: `${windowHeight - 108}px`, overflow: 'auto' }}>
          {filters.map((filter: any, index: number) =>{
             var column = getColumn(filter.column)
             return (
              <Box key={filter.column} sx={{ marginBottom: 1 }}>
                {index ? <Select
                  value={filter.condition}
                  onChange={(e) => { handleFilters(index, 'condition', e.target.value); }}
                  size="small"
                  sx={{ width: {md: '168px'}, marginBottom: 1 }}
                >
                  <MenuItem value='and'>and</MenuItem>
                  <MenuItem value='or'>or</MenuItem>
                </Select> : <></>}
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Select
                    value={filter.column}
                    onChange={(e) => { handleFilters(index, 'column', e.target.value); }}
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
                            marginRight: {xs: 0.2, md: 1}
                          }}
                        />
                        <Box>{column.label}</Box>
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    value={filter.operator}
                    onChange={(e) => { handleFilters(index, 'operator', e.target.value); }}
                    size="small"
                    sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
                  >
                    <MenuItem value='is'>is</MenuItem>
                    <MenuItem value='is bigger than'>is bigger than</MenuItem>
                  </Select>
                  {column?.type === 'choice' ?
                  <Select
                    value={filter.operand}
                    onChange={(e) => { handleFilters(index, 'operand', e.target.value); }}
                    size="small"
                    sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
                  >
                    {column?.choices.map((choice: any) => (
                      <MenuItem key={choice.label} value={choice.label} sx={{ backgroundColor: choice.color.bg, color: choice.color.fill, '&:hover': { backgroundColor: choice.color.bg } }}>{choice.label}</MenuItem>
                    ))}
                  </Select> :
                  column?.type === 'other_text_field' || column?.type === 'textarea' || column?.type === 'integers' || column?.type === 'floating' || column?.type === 'avatar' ?
                  <TextField
                    size="small"
                    type={column?.type === "integers" || column?.type === "floating" ? 'number' : ''}
                    onChange={(e) => { handleFilters(index, 'operand', e.target.value); }}
                    value={filter.operand}
                    sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
                  /> :
                  <></>}
                  <Box
                    component="span"
                    className="svg-color add_choice"
                    sx={{
                      width: {xs: 50, md: 18},
                      height: 18,
                      display: 'inline-block',
                      bgcolor: theme.palette.palette_style.text.primary,
                      mask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
                      maskPosition: {xs: 'right', md: 'inherit'},
                      cursor: 'pointer',
                      marginTop: 1.5,
                      marginLeft: {xs: '8px', md: '30px'}
                    }}
                    onClick={() => { removeFilter(index); }}
                  />
                </Box>
              </Box>
              )
          }
          )
         }
        </Box>
        <Box sx={{ paddingTop: 2, display: 'flex', cursor: 'pointer' }} onClick={addFilter}>
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
          <Box>Add condition</Box>
        </Box>
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.fieldDefinition.columns,
  filters: state.fieldDefinition.filters
});

const mapDispatchToProps = {
  setFilters
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
