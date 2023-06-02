import { useState, useEffect } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Drawer,
  Box,
  Autocomplete
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled, lighten, darken } from '@mui/system';
import { FormControl } from '@mui/material';
import { Field } from 'src/models/SharedModels';
import { FieldTypeGroupLabel } from 'src/enums/ShareEnumLabels';
import { FieldType } from 'src/enums/SharedEnums';

interface ColumnFormPanelProps {
    column: Field;
    onAdd: (column: Field) => void;
    onUpdate:(column:Field) =>void;
    onDelete:(id:number) =>void;
    open: boolean;
    onClose: () => void;
}
const icons = ["angle_down", "close", "date", "importance", "phase", "plus", "price", "task", "user", "angle_down", "close", "date", "importance", "phase", "plus", "price", "task", "user", "angle_down", "close", "date", "importance", "phase", "plus", "price", "task", "user", "angle_down", "close", "date", "importance", "phase", "plus", "price", "task", "user"];

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});
export default function ColumnFormPanel ({
    column,
    onAdd,
    onUpdate,
    onDelete,
    open,
    onClose,
    
  }: ColumnFormPanelProps) {
   
    const theme = useTheme();
    const isCreating : boolean = !column.id|| column.id == 0;
    const [currentColumn,setCurrentColumn] = useState<Field>(column)
    var  columTypeGroups : {groupName : string, type: string}[] = []
     FieldTypeGroupLabel.forEach((values,key)=>{
        for (const value of values) {
          columTypeGroups.push({groupName:key,type:value})
        }
    })
    const [submit, setSubmit] = useState(false);
    const [visibleIconList, setVisibleIconList] = useState(false);
    const [windowHeight, setWindowHeight] = useState(0);
  
    useEffect(() => {
      setWindowHeight(window.innerHeight);
    }, []);

    useEffect(() => {
      setSubmit(false);
      setVisibleIconList(false);
    }, [open]);
  
    const handleSubmit = () => {
      setSubmit(true);
      onAdd(currentColumn);
      onClose()
    };
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
      var newColumn = Object.assign({},currentColumn);
      newColumn.name = event.target.value
      setCurrentColumn(newColumn)
    }
    const handleColumnTypeChange = (newType: string) => {
      var newColumn = Object.assign({},currentColumn);
      newColumn.type = newType as FieldType
      setCurrentColumn(newColumn)
    };
    const onIconChange = (newIcon : string) =>
    {
      var newColumn = Object.assign({},currentColumn);
      newColumn.icon = newIcon
      setCurrentColumn(newColumn)
      setVisibleIconList(false)
    }

   

    // const handleModalClick = (e: any) => {
    //   if (!e.target.classList.contains('add_choice')) {
    //     hideColorBar(-1);
    //   }
    // };
  
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: {xs: '100%', lg: '500px'},
            border: 'none',
            height: `${windowHeight}px`,
            backgroundColor: theme.palette.palette_style.background.default,
          },
        }}
        // onClick={handleModalClick}
      >
        <DialogTitle textAlign="center" sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>Create New Column</DialogTitle>
        <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
                paddingTop: 2
              }}
            >
              <TextField
                label="Column name"
                name="name"
                size="small"
                value={currentColumn.name}
                onChange={onNameChange}
                required
                error={submit && !currentColumn.name}
              />
              <FormControl sx={{ marginTop: 2 }} required>
              <Autocomplete
                id="grouped-types"
                options={columTypeGroups}
                groupBy={(option) => option.groupName}
                getOptionLabel={(option) => option.type}
                fullWidth
                inputValue={currentColumn.type}
                onInputChange={(event, newInputValue) => {
                    handleColumnTypeChange(newInputValue);
                }}
                renderInput={(params) => <TextField {...params}  label="Column type" />}
                renderGroup={(params) => (
                  <li key={params.key}>
                    <GroupHeader>{params.group}</GroupHeader>
                    <GroupItems>{params.children}</GroupItems>
                  </li>
                )}
              />
                {/* <InputLabel id="column_type" sx={{ top: '-5px' }}>Column type</InputLabel>
                <Select
                  label="Column type"
                  size="small"
                  id="column_type"
                  error={submit && !type}
                >
                  {types.map((item: any) => item.type === 'option' ?
                    <MenuItem key={item.value} value={item.value} sx={{ paddingLeft: 3, display: 'flex' }} onClick={() => { handleColumnType(item); }}>
                      <Box sx={{ display: 'flex' }}>
                        <Box>
                          {item.label}
                        </Box>
                      </Box>
                    </MenuItem> : 
                    <ListSubheader key={item.label} sx={{ fontWeight: '900', fontSize: '17px' }}>{item.label}</ListSubheader>)
                  }
                </Select> */}
              </FormControl>
              <FormControl sx={{ marginTop: 2 }} required>
                <TextField
                 type = "text"
                  className='add_icon'
                  label="Select icon"
                  value={currentColumn.icon}
                  name="icon"
                  size="small"
                  // onChange={(e) =>
                  //   onIconChange(e.target.value)
                  // }
                  onFocus={() => { setVisibleIconList(true); }}
                  required
                  InputLabelProps={{ shrink: (currentColumn.icon !=='') }}  
                  error={submit && !currentColumn.icon}
                />
                {visibleIconList && <Box
                  sx={{ py: 1 }}
                >
                  {icons.map((icon: string, index: number) => (
                    <Box
                      key={icon + index}
                      component="span"
                      className="svg-color add_icon"
                      sx={{
                        width: 18,
                        height: 18,
                        display: 'inline-block',
                        bgcolor: theme.palette.palette_style.text.primary,
                        mask: `url(/assets/icons/table/column/${icon}.svg) no-repeat center / contain`,
                        WebkitMask: `url(/assets/icons/table/column/${icon}.svg) no-repeat center / contain`,
                        mx: 1.7,
                        my: 1.5,
                        cursor: 'pointer'
                      }}
                      onClick={() => { onIconChange(icon); }}
                    />
                  ))}
                </Box>}
              </FormControl>
              {
              
              }
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Create New Column
          </Button>
        </DialogActions>
      </Drawer>
    );
  };