import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography, useTheme } from "@mui/material";
import { clone, cloneDeep } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PresetType } from "src/enums/SharedEnums";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { View } from "src/models/SharedModels"
import { setFlashMessage } from "src/redux/actions/authAction";
import { fetchRows, setCurrentView } from "src/redux/actions/viewActions";
import { saveViewPreset } from "src/services/listView.service";
import { FlexlistsError, isSucc } from "src/utils/responses";
import { FieldValidatorEnum, ModelValidatorEnum, frontendValidate, isFrontendError } from "src/utils/validatorHelper";

type ViewPresetsProps = {
    columns: any[],
    currentView:View,
    setCurrentView:(view:View)=>void,
    handleClose:()=>void,
    setFlashMessage : (message:FlashMessageModel)=>void
    fetchRows: () => void;
    defaultPreset:any
}
function ViewPresets({columns,defaultPreset,currentView,setCurrentView,handleClose,fetchRows,setFlashMessage}:ViewPresetsProps)
{
    const router = useRouter()
    const theme = useTheme();
    const [presets,setPresets] = useState<any[]>([]);

    useEffect(()=>{
        let newPresets : any[]=[
            cloneDeep(defaultPreset),
            {name:"Show All"},
            {name:"Archived"},
            {name:"Unarchived"}
        ]

        if(currentView && currentView.presets && currentView.presets.length>0)
        {
            newPresets = newPresets.concat(cloneDeep(currentView.presets))
        }
        setPresets(newPresets)
        console.log(newPresets)
    },[currentView.presets,defaultPreset])

    const onSubmit = async(preset:any)=>
    {
        var newView: View = Object.assign({}, currentView);
       
       if(preset.name === "Show All")
       {
        const archived = columns.find((x: any) => x.name === "___archived");
        newView.conditions = [{ "left": archived.id, "leftType": "Field", "right": false, "rightType": "SearchString", "cmp": "eq" }, "Or", { "left": archived.id, "leftType": "Field", "right": true, "rightType": "SearchString", "cmp": "eq" }] as any
        setCurrentView(newView);
        fetchRows();
        handleClose();
        return;
       }
       if(preset.name === "Archived")
       {
        const archived = columns.find((x: any) => x.name === "___archived");
        newView.conditions = [{ "left": archived.id, "leftType": "Field", "right": true, "rightType": "SearchString", "cmp": "eq" }] as any
        newView.query = undefined;
        setCurrentView(newView);
        fetchRows();
        handleClose();
        return;
       }
       if(preset.name === "Unarchived")
       {
        const archived = columns.find((x: any) => x.name === "___archived");
        newView.conditions = [{ "left": archived.id, "leftType": "Field", "right": false, "rightType": "SearchString", "cmp": "eq" }] as any
        setCurrentView(newView);
        fetchRows();
        handleClose();
        return;
       }
       newView.page = undefined;
       newView.limit = undefined;
       newView.order = preset.order;
       newView.query = preset.query;
       newView.conditions = preset.conditions;
       setCurrentView(newView);
       fetchRows();
       handleClose();
       return;
    }
    return(
        <>
          <Box
          sx={{
            borderBottom: `1px solid ${theme.palette.palette_style.border.default}`,
            paddingBottom: 1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle2">Presets:</Typography>
        </Box>
          <Box>
            {
                presets && presets.length > 0 &&
                presets.map((preset,index)=>{
                    return(
                        <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                            variant="body1"
                            sx={{ color: theme.palette.palette_style.text.selected, cursor: "pointer", }}
                            onClick={() =>onSubmit(preset)}
                        >
                            {preset.name}
                        </Typography>
                        </Box>
                    )
                })   
            }
          </Box>
        </>
    )
}

const mapStateToProps = (state: any) => ({
    defaultPreset: state.view.defaultPreset,
    currentView: state.view.currentView,
    columns: state.view.columns,
  });
  
  const mapDispatchToProps = {
    setCurrentView,
    setFlashMessage,
    fetchRows
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(ViewPresets);