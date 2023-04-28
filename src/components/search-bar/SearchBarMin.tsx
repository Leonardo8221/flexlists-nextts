import { useState } from "react";
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const StyledSearchBarMin = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    justifyContent: 'center'
  },
}));

const top100Films = [
  { label: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.', sub1: 'Current list', sub2: 'Description', icon: 'table/task.svg' },
  { label: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.', sub1: 'Current list', sub2: 'Description', icon: 'table/task.svg' },
  { label: 'Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur.', sub1: 'All', sub2: 'Account settings', icon: 'table/task.svg' }
];

export default function SearchBarMin() {
  const theme = useTheme();
  const [listType, setListType] = useState('all');

  const handleChange = (event: SelectChangeEvent) => {
    setListType(event.target.value as string);
  };

  return (
    <StyledSearchBarMin>
      <Box
        sx={{
          border: `1px solid ${theme.palette.palette_style.border.default}`,
          display: 'flex',
          borderRadius: '12px',
          width: { xs: '100%', sm: '85%', md: 500, lg: 800 }
        }}
      >
        <Select
          id="lst_type"
          value={listType}
          onChange={handleChange}
          size="small"
          sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
        >
          <MenuItem value='all'>All</MenuItem>
          <MenuItem value='current_list'>Current List</MenuItem>
          <MenuItem value='current_view'>Current View</MenuItem>
        </Select>
        <Autocomplete
          size="small"
          disablePortal
          id="searchbar"
          options={top100Films}
          sx={{ width: '100%', height: 32, boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
          renderInput={(params) => <TextField {...params} label="Search..." />}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  alignItems: 'center',
                  py: 1
                }}
              >
                <Box
                  sx={{
                    display: 'flex'
                  }}
                >
                  <Box
                    component="span"
                    className="svg-color"
                    sx={{
                      width: 18,
                      height: 18,
                      display: 'inline-block',
                      bgcolor: '#D3D3D3',
                      mask: `url(/assets/icons/header/magnify.svg) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/header/magnify.svg) no-repeat center / contain`,
                      mr: 1,
                      mt: 0.4
                    }}
                  />
                  <Box
                    sx={{
                      width: { xs: '330px', sm: 150, md: 200, lg: 400 },
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {option.label}
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: {xs: 'none', md: 'flex'},
                    backgroundColor: '#EDF2F5',
                    color: '#666',
                    borderRadius: '6px',
                    border: '1px solid rgba(102, 102, 102, 0.1)',
                    px: 1,
                    py: 0.5
                  }}
                >
                  <Box>{option.sub1} / </Box>
                  <Box
                    component="span"
                    className="svg-color"
                    sx={{
                      width: 18,
                      height: 18,
                      display: 'inline-block',
                      bgcolor: '#666',
                      mask: `url(/assets/icons/${option.icon}) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/${option.icon}) no-repeat center / contain`,
                      mx: 0.5,
                      mt: 0.3
                    }}
                  />
                  <Box>{option.sub2}</Box>
                </Box>
              </Box>
            </li>
          )}
        />
      </Box>
    </StyledSearchBarMin>
  );
}
