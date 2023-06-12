import { useState, useEffect } from 'react';
import {
  Button,
  Stack,
  TextField,
  Box,
  Autocomplete,
  FormControlLabel,
  Checkbox,
  Alert
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled, lighten, darken } from '@mui/system';
import { FormControl } from '@mui/material';
import { Field } from 'src/models/SharedModels';
import { FieldTypeGroupLabel } from 'src/enums/ShareEnumLabels';
import { FieldType } from 'src/enums/SharedEnums';
import ChoiceConfig from './fieldConfig/ChoiceConfig';
import { fieldService } from 'src/services/field.service';
import { isSucc } from 'src/models/ApiResponse';
import { CreateFieldOutputDto } from 'src/models/ApiOutputModels'
import { ErrorConsts } from 'src/constants/errorConstants';
import { convertToInteger } from 'src/utils/convertUtils';

interface FieldFormPanelProps {
    viewId:number,
    field: Field;
    onAdd: (field: Field) => void;
    onUpdate:(field:Field) =>void;
    onDelete:(id:number) =>void;
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
export default function FieldFormPanel ({
    viewId,
    field,
    onAdd,
    onUpdate,
    onDelete,
    onClose,
  }: FieldFormPanelProps) {
   
    const theme = useTheme();
    const isCreating : boolean = !field.id|| field.id == 0;
    const [currentField,setCurrentField] = useState<Field>(field)
    var  columTypeGroups : {groupName : string, type: string,displayName:string,config?:any}[] = []
     FieldTypeGroupLabel.forEach((values,key)=>{
        for (const value of values) {
          columTypeGroups.push({groupName:key,type:value.fieldType,displayName:value.displayName,config:value.config})
        }
    })
    const [currentFieldType,setCurrentFieldType] = useState<{groupName : string, type: string,displayName:string,config?:any}|undefined>(
      columTypeGroups.find((x)=>x.type === field.type && x.config?.fieldUiType === x.config?.fieldUiType)
      )
    const [error,setError] = useState<string>('')
    
    const [submit, setSubmit] = useState(false);
    const [visibleIconList, setVisibleIconList] = useState(false);
    const [windowHeight, setWindowHeight] = useState(0);
  
    useEffect(() => {
      setWindowHeight(window.innerHeight);
    }, []);

    useEffect(() => {
      setSubmit(false);
      setVisibleIconList(false);
      if(field)
      {
        setCurrentField(field)
      }
    }, [field]);
  
    const handleSubmit = async() => {
      setSubmit(true);
      if(isCreating)
      {
        var createFieldResponse = await fieldService.createField(viewId,currentField.name,currentField.type,currentField.ordering,
                     currentField.required,currentField.detailsOnly,currentField.description,currentField.minimum,
                     currentField.maximum,currentField.config,undefined,currentField.icon,currentField.defaultValue,currentField.indexed)
        if(isSucc(createFieldResponse) && createFieldResponse.data)
        {
          currentField.id = (createFieldResponse.data as CreateFieldOutputDto).fieldId;
          onAdd(currentField);
        }
        else
        {
          setError(ErrorConsts.InternalServerError)
          return;
        }
        
      }
      else
      {
          var updateFieldResponse = await fieldService.updateField(viewId,field.id,currentField.name,currentField.type,currentField.ordering,
          currentField.required,currentField.detailsOnly,currentField.description,currentField.minimum,
          currentField.maximum,currentField.config,currentField.icon,currentField.defaultValue,currentField.indexed)
          if(isSucc(updateFieldResponse))
          {
            onUpdate(currentField);
          }
          else
          {
            setError(ErrorConsts.InternalServerError)
            return;
          }
      }
      
      onClose()
    };
    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
      var newField = Object.assign({},currentField);
      newField.name = event.target.value
      setCurrentField(newField)
    }
    const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
      var newField = Object.assign({},currentField);
      newField.description = event.target.value
      setCurrentField(newField)
    }
    
    const handleFieldTypeChange = (newTypeInput: any) => {
      var newField = Object.assign({},currentField);
      if(newTypeInput && newTypeInput.type)
      {
         var type = newTypeInput.type as FieldType;
         newField.type = type
         if(newField.config)
         {
            newField.config.fieldUiType = newTypeInput.config.fieldUiType
         }
         else
         {
            newField.config = newTypeInput.config
         }
      }
      setCurrentFieldType(newTypeInput)
      setCurrentField(newField)
    };
    const onIconChange = (newIcon : string) =>
    {
      var newField = Object.assign({},currentField);
      newField.icon = newIcon
      setCurrentField(newField)
      setVisibleIconList(false)
    }

    const onRequiredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      var newField = Object.assign({},currentField);
      newField.required = event.target.checked
      setCurrentField(newField)
    };
    const onDetailsOnlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      var newField = Object.assign({},currentField);
      newField.detailsOnly = event.target.checked
      setCurrentField(newField)
    };
   const updateConfig = (newConfig : any) =>
   {
    var newField = Object.assign({},currentField);
    if(!newField.config)
    {
      newField.config = {values:[]}
    }
    
    newField.config.values = newConfig
    setCurrentField(newField)
   }
   const renderFieldConfigSwitch = (field : Field) =>
   {
      var fieldType = field.type;
      switch (fieldType) {
        case FieldType.Choice:
          return <ChoiceConfig choices={field.config?.values??[]} updateChoices={(newChoices)=>updateConfig(newChoices)} />
      
        default:
          return (<></>)
          break;
      }
   }
   
    return (
      // <Drawer
      //   anchor="right"
      //   open={open}
      //   onClose={onClose}
      //   PaperProps={{
      //     sx: {
      //       width: {xs: '100%', lg: '500px'},
      //       border: 'none',
      //       height: `${windowHeight}px`,
      //       backgroundColor: theme.palette.palette_style.background.default,
      //     },
      //   }}
      //   // onClick={handleModalClick}
      // >
      //   <DialogTitle textAlign="center" sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>Create New Field</DialogTitle>
      //   <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
            <Stack>
            <Box>
              {error && <Alert severity="error">{error}</Alert>}
            </Box>
          </Stack>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
                paddingTop: 2
              }}
            >
              <TextField
                label="Name"
                name="name"
                size="small"
                value={currentField.name}
                onChange={onNameChange}
                required
                error={submit && !currentField.name}
              />
              <TextField
                label="Description"
                name="name"
                size="small"
                value={currentField.description}
                onChange={onDescriptionChange}
              />
              <FormControl sx={{ marginTop: 2 }} required>
              <Autocomplete
                id="grouped-types"
                options={columTypeGroups}
                groupBy={(option) => option.groupName}
                getOptionLabel={(option) => option.displayName}
                fullWidth
                // inputValue={currentField.type}
                value = {currentFieldType}
                onChange={(event, newInputValue) => {
                    handleFieldTypeChange(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label="Field type" error={submit && !currentField.type} />}
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
                    <Checkbox checked={currentField.required} onChange={onRequiredChange} name="required" />
                  }
                  label="Required"
                />
              <FormControlLabel
                  control={
                    <Checkbox checked={currentField.detailsOnly} onChange={onDetailsOnlyChange} name="required" />
                  }
                  label="DetailsOnly"
                />
              <FormControl sx={{ marginTop: 2 }} required>
                <TextField
                 type = "text"
                  className='add_icon'
                  label="Select icon"
                  value={currentField.icon}
                  name="icon"
                  size="small"
                  onFocus={() => { setVisibleIconList(true); }}
                  required
                  InputLabelProps={{ shrink: (currentField.icon !=='') }}  
                  // error={submit && !currentField.icon}
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
               
                {/* <TextField
                  label="Default Value"
                  name="DefaultValue"
                  size="small"
                  type='string'
                  value={currentField.defaultValue}
                  onChange={onMinimumChange}
                  /> */}
              </FormControl>
              {
                renderFieldConfigSwitch(currentField)
              }
            </Stack>
            <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
           {isCreating?'Create Field':'Update Field'} 
          </Button>
          </form>
      //   </DialogContent>
      //   <DialogActions sx={{ p: '1.25rem' }}>
      //     <Button onClick={onClose}>Cancel</Button>
      //     <Button color="secondary" onClick={handleSubmit} variant="contained">
      //       Create New Field
      //     </Button>
      //   </DialogActions>
      // </Drawer>
    );
  };