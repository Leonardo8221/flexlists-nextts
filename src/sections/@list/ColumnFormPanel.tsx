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
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { styled, lighten, darken } from '@mui/system';
import { FormControl } from '@mui/material';
import { FormLabel } from '@mui/material';
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
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

type Choice = {
  label: string,
  color: {
    bg: string;
    fill: string;
  },
  font: string,
  visibleColorBar: boolean
};

const colors = [
  {
    bg: '#f2bcb2',
    fill: '#333'
  },
  {
    bg: '#bffdb4',
    fill: '#333'
  },
  {
    bg: '#b8dcff',
    fill: '#333'
  },
  {
    bg: '#ffeeb6',
    fill: '#333'
  },
  {
    bg: '#b9befe',
    fill: '#333'
  },
  {
    bg: '#b7fafe',
    fill: '#333'
  },
  {
    bg: '#2d2d2d',
    fill: '#eee'
  },
  {
    bg: '#8f0202',
    fill: '#eee'
  },
  {
    bg: '#269300',
    fill: '#eee'
  },
  {
    bg: '#044a8d',
    fill: '#eee'
  },
  {
    bg: '#927500',
    fill: '#eee'
  },
  {
    bg: '#660591',
    fill: '#eee'
  },
  {
    bg: '#018a8c',
    fill: '#eee'
  },
  {
    bg: '#8a8a8a',
    fill: '#eee'
  }
];

const fonts = ['Public Sans,sans-serif', 'Arial sans-serif', 'Verdana sans-serif', 'Tahoma sans-serif', 'Trebuchet MS sans-serif', 'Times New Roman serif', 'Georgia serif', 'Garamond serif', 'Courier New monospace', 'Brush Script MT cursive'];

const icons = ["angle_down", "close", "date", "importance", "phase", "plus", "price", "task", "user", "angle_down", "close", "date", "importance", "phase", "plus", "price", "task", "user", "angle_down", "close", "date", "importance", "phase", "plus", "price", "task", "user", "angle_down", "close", "date", "importance", "phase", "plus", "price", "task", "user"];

const types = [
  {
    type: 'category',
    label: 'Text'
  },
  {
    type: 'option',
    label: 'Textarea',
    value: 'textarea'
  },
  {
    type: 'option',
    label: 'Other text field',
    value: 'other_text_field'
  },
  {
    type: 'category',
    label: 'Number'
  },
  {
    type: 'option',
    label: 'Integers',
    value: 'integers'
  },
  {
    type: 'option',
    label: 'Floating',
    value: 'floating'
  },
  {
    type: 'category',
    label: 'Switch'
  },
  {
    type: 'option',
    label: 'Choice',
    value: 'choice'
  }
];
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
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [icon, setIcon] = useState("");
    const [submit, setSubmit] = useState(false);
    const [choices, setChoices] = useState<Choice[]>([]);
    const [visibleIconList, setVisibleIconList] = useState(false);
    const [windowHeight, setWindowHeight] = useState(0);
  
    useEffect(() => {
      setWindowHeight(window.innerHeight);
    }, []);

    useEffect(() => {
      setName("");
      setType("");
      setIcon("");
      setChoices([]);
      setSubmit(false);
      setVisibleIconList(false);
    }, [open]);
  
    const handleSubmit = () => {
      setSubmit(true);
      
      const newColumn = {
        name: name.toLowerCase(),
        type: type,
        label: name,
        icon: icon,
        choices: choices
      };
      
      if (type === 'choice' && !choices.length) return;

      if (name && type && icon) {
        onAdd(currentColumn);
        onClose();
      }
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

    const addChoice = () => {
      const choice = {
        label: `Choice ${choices.length + 1}`,
        color: colors[0],
        font: fonts[0],
        visibleColorBar: false
      }

      setChoices(choices => [...choices, choice]);
    };

    const removeChoice = (index: number) => {
      setChoices(choices.filter((choice, i) => i !== index));
    };

    const updateChoiceLabel = (index: number, label: string) => {
      const newChoices = choices.map((choice, i) => {
        if (index === i) choice.label = label;

        return choice;
      });

      setChoices(newChoices);
    };

    const handleFont = (index: number, font: string) => {
      const newChoices = choices.map((choice, i) => {
        if (index === i) choice.font = font;

        return choice;
      });

      setChoices(newChoices);
    };

    const hideColorBar = (index: number) => {
      const newChoices = choices.map((choice,i) => {
        if (index !== i) choice.visibleColorBar = false;

        return choice;
      });

      setChoices(newChoices);
    };

    const handleColorBar = (index: number) => {
      hideColorBar(index);

      const newChoices = choices.map((choice, i) => {
        if (index === i) choice.visibleColorBar = !choice.visibleColorBar;

        return choice;
      });

      setChoices(newChoices);
    };

    const handleColorChoice = (index: number, color: any) => {
      const newChoices = choices.map((choice, i) => {
        if (index === i) {
          choice.color = color;
          choice.visibleColorBar = false;
        }

        return choice;
      });

      setChoices(newChoices);
    };

    const handleModalClick = (e: any) => {
      if (!e.target.classList.contains('add_choice')) {
        hideColorBar(-1);
      }
    };
  
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
        onClick={handleModalClick}
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
                error={submit && !name}
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
                  className='add_icon'
                  label="Select icon"
                  value={icon}
                  name="icon"
                  size="small"
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  onFocus={() => { setVisibleIconList(true); }}
                  required
                  error={submit && !icon}
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
                      onClick={() => { setIcon(icon); }}
                    />
                  ))}
                </Box>}
              </FormControl>
              {type === 'choice' && <FormControl required>
                <FormLabel sx={{ my: 1 }}>Choices</FormLabel>
                <Box>
                  {choices.map((choice, index) => (
                    <Box
                      key={choice.label}
                      sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1, position: 'relative' }}
                    >
                      <Box sx={{ marginRight: 1 }}>
                        <Box className='add_choice' sx={{ backgroundColor: choice.color.bg, width: '40px', height: '40px', borderRadius: '5px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => { handleColorBar(index);  }}>
                          <Box
                            component="span"
                            className="svg-color add_choice"
                            sx={{
                              width: 24,
                              height: 24,
                              display: 'inline-block',
                              bgcolor: choice.color.fill,
                              mask: `url(/assets/icons/table/angle_down.svg) no-repeat center / contain`,
                              WebkitMask: `url(/assets/icons/table/angle_down.svg) no-repeat center / contain`
                            }}
                          />
                        </Box>
                        <Box sx={{ borderRadius: '5px', position: 'absolute', zIndex: 1, backgroundColor: '#fff', border: '1px solid rgba(0, 0, 0, 0.1)', overflow: 'hidden', width: '342px', height: choice.visibleColorBar ? 'inherit' : 0, transition: 'height 0.3s', display: choice.visibleColorBar ? 'flex' : 'none', flexWrap: 'wrap', padding: 0.5, left: 0, top: 44 }}>
                          {colors.map((color, sub_index) => (
                            <Box key={sub_index} sx={{ backgroundColor: color.bg, width: '36px', height: '36px', cursor: 'pointer', margin: 0.7, borderRadius: 5, textAlign: 'center', paddingTop: '7px', color: color.fill }} onClick={() => { handleColorChoice(index, color) }}>Tt</Box>
                          ))}
                        </Box>
                      </Box>
                      <Box sx={{ marginRight: 1 }} id="font_choice">
                        <CDropdown id="font_choice">
                          <CDropdownToggle color="secondary">
                            F
                          </CDropdownToggle>
                          <CDropdownMenu>
                            {fonts.map((font) => (
                              <CDropdownItem onClick={() => { handleFont(index, font) }} key={font}>{font}</CDropdownItem>  
                            ))}
                          </CDropdownMenu>
                        </CDropdown>
                      </Box>
                      <TextField
                        className="choice_text"
                        defaultValue={choice.label}
                        placeholder="Choice name"
                        size="small"
                        sx={{ backgroundColor: choice.color.bg, marginRight: 1, borderRadius: 1, width: 'calc(100% - 30px)', fontFamily: choice.font, input: { color: choice.color.fill } }}
                        onBlur={(e) => { updateChoiceLabel(index, e.target.value) }}
                        required
                      />
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
                          marginTop: 1.2
                        }}
                        onClick={() => { removeChoice(index); }}
                      />
                    </Box>
                  ))}
                </Box>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: theme.palette.palette_style.background.table_header_footer,
                    borderRadius: 1,
                    cursor: 'pointer',
                    marginTop: 1,
                    border: submit && type === 'choice' && choices.length === 0 ? '1px solid #d32f2f' : ''
                  }}
                  onClick={addChoice}
                  className="add_choice"
                >
                  <Box className="add_choice">Add new choice</Box>
                  <Box
                    component="span"
                    className="svg-color add_choice"
                    sx={{
                      width: 18,
                      height: 18,
                      display: 'inline-block',
                      bgcolor: theme.palette.palette_style.text.primary,
                      mask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
                      cursor: 'pointer',
                      marginTop: 0.4
                    }}
                  />
                </Box>
              </FormControl>}
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