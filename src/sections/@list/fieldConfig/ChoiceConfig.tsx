import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from "@coreui/react";
import { Box, FormControl, FormLabel, TextField } from "@mui/material";
import { type } from "os";
import { useState } from "react";
import theme from "src/theme";

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

type ChoiceConfigProps = {
    config : any,
    updateConfig : (config:any) => void
}
export default function ColumnFormPanel ({
   config,
   updateConfig
  }: ChoiceConfigProps) {
    const theme = useTheme();
    const [choices, setChoices] = useState<Choice[]>([]);
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
    return (<>
    <FormControl required>
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
                    border: choices.length === 0 ? '1px solid #d32f2f' : ''
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
              </FormControl>
    </>)
  }