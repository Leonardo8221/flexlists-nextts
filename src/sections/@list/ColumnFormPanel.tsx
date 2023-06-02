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
  Autocomplete,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled, lighten, darken } from '@mui/system';
import { FormControl } from '@mui/material';
import { Field } from 'src/models/SharedModels';
import { FieldTypeGroupLabel } from 'src/enums/ShareEnumLabels';
import { FieldType } from 'src/enums/SharedEnums';
import ChoiceConfig from './fieldConfig/ChoiceConfig';
import { ViewField } from 'src/models/ViewField';
import { fieldService } from 'src/services/field.service';
import { isSucc } from 'src/models/ApiResponse';
import { CreateFieldOutputDto } from 'src/models/ApiOutputModels'

interface ColumnFormPanelProps {
    viewId:number,
    column: ViewField;
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
    viewId,
    column,
    onAdd,
    onUpdate,
    onDelete,
    open,
    onClose,
    
  }: ColumnFormPanelProps) {
   
    const theme = useTheme();
    const isCreating : boolean = !column.id|| column.id == 0;
    const [currentColumn,setCurrentColumn] = useState<ViewField>(column)
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
      setCurrentColumn(column)
    }, [open]);
  
    const handleSubmit = async() => {
      setSubmit(true);
      console.log(currentColumn)
      currentColumn.id = 1;
      if(isCreating)
      {
        var createFieldResponse = await fieldService.createField(viewId,currentColumn.name,currentColumn.type,currentColumn.ordering,
                     currentColumn.required,currentColumn.detailsOnly,currentColumn.description,currentColumn.minimum,
                     currentColumn.maximum,currentColumn.config,currentColumn.icon)
        console.log(createFieldResponse)
        if(isSucc(createFieldResponse) && createFieldResponse.data)
        {
          currentColumn.id = (createFieldResponse.data as CreateFieldOutputDto).fieldId;
          onAdd(currentColumn);
        }
        
      }
      
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

    const handleRequiredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      var newColumn = Object.assign({},currentColumn);
      newColumn.required = event.target.checked
      setCurrentColumn(newColumn)
    };

    // const handleModalClick = (e: any) => {
    //   if (!e.target.classList.contains('add_choice')) {
    //     hideColorBar(-1);
    //   }
    // };
   const updateConfig = (newConfig : any) =>
   {
    var newColumn = Object.assign({},currentColumn);
    newColumn.config = newConfig
    setCurrentColumn(newColumn)
   }
   const renderColumnConfigSwitch = (column : Field) =>
   {
      var fieldType = column.type;
      switch (fieldType) {
        case FieldType.Choice:
          return <ChoiceConfig choices={column.config??[]} updateChoices={(newChoices)=>updateConfig(newChoices)} />
      
        default:
          return (<></>)
          break;
      }
   }
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
              </FormControl>
              <FormControlLabel
                  control={
                    <Checkbox checked={currentColumn.required} onChange={handleRequiredChange} name="required" />
                  }
                  label="Required"
                />
              <FormControl sx={{ marginTop: 2 }} required>
                <TextField
                 type = "text"
                  className='add_icon'
                  label="Select icon"
                  value={currentColumn.icon}
                  name="icon"
                  size="small"
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
                renderColumnConfigSwitch(currentColumn)
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