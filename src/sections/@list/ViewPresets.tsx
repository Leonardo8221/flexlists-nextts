import { Box, Grid, Typography, useTheme } from "@mui/material";
import { cloneDeep, set } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { FlashMessageModel } from "src/models/FlashMessageModel";
import { View } from "src/models/SharedModels"
import { setFlashMessage } from "src/redux/actions/authAction";
import { fetchRows, setCurrentView } from "src/redux/actions/viewActions";
import YesNoDialog from "src/components/dialog/YesNoDialog";
import { deleteViewPreset } from "src/services/listView.service";
import { FlexlistsError, isSucc } from "src/utils/responses";

type ViewPresetsProps = {
    columns: any[],
    currentView:View,
    setCurrentView:(view:View)=>void,
    handleClose:()=>void,
    setFlashMessage : (message:FlashMessageModel)=>void
    fetchRows: () => void;
    defaultPreset:any,
    selectedPreset : any;
    setSelectedPreset:(preset:any)=>void;
}
function ViewPresets({selectedPreset,setSelectedPreset,columns,defaultPreset,currentView,setCurrentView,handleClose,fetchRows,setFlashMessage}:ViewPresetsProps)
{
    const router = useRouter()
    const theme = useTheme();
    const [presets,setPresets] = useState<any[]>([]);
    
    const [deletePreset,setDeletePreset] = useState<any>();
    const [isDeletePresetDialogOpen, setOpenDeletePresetDialog] = useState(false);
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
       setSelectedPreset(preset);
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
    const handleDeletePreset = async (preset: any) => {
        if (preset.name === "Default"||preset.name === "Show All" || preset.name === "Archived" || preset.name === "Unarchived") {
          return;
        }
        setDeletePreset(preset);
        setOpenDeletePresetDialog(true);
    }
    const deletePresets = async () => {
        setOpenDeletePresetDialog(false);
        if(!deletePreset)
        {
            return;
        }
        let deletePresetRespone = await deleteViewPreset(currentView.id,deletePreset.type,deletePreset.name);
        if(isSucc(deletePresetRespone))
        {
          console.log(deletePreset.name)
          if(deletePreset.name === selectedPreset?.name)
          {
            const defaultPreset = presets.find((x: any) => x.name === "Default");
            const newView: View = Object.assign({}, currentView);
            newView.presets = newView.presets.filter((x: any) => x.name?.toLowerCase() !== deletePreset.name?.toLowerCase());
            newView.page = undefined;
            newView.limit = undefined;
            newView.order = defaultPreset.order;
            newView.query = defaultPreset.query;
            newView.conditions = defaultPreset.conditions;
            setSelectedPreset(defaultPreset);
            setCurrentView(newView);
            fetchRows();
            handleClose();
          }
          else
          {
            const newView: View = Object.assign({}, currentView);
            newView.presets = newView.presets.filter((x: any) => x.name?.toLowerCase() !== deletePreset.name?.toLowerCase());
            setCurrentView(newView);
            handleClose();
          }
          
          setFlashMessage({ message: "Preset deleted successfully", type: "success" });
        }
        else
        {
          setFlashMessage({ message: (deletePresetRespone as FlexlistsError).message, type: "error" });
        }
        
        
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
                          <Grid container>
                              <Grid item xs={8}>
                                <Typography
                                variant="body1"
                                sx={{ color: theme.palette.palette_style.text.selected, cursor: "pointer", }}
                                onClick={() =>onSubmit(preset)}
                                >
                                    {preset.name}
                                </Typography>
                              </Grid>
                              <Grid item xs={4}>
                                {
                                    preset.name !== "Default" && preset.name !== "Show All" && preset.name !== "Archived" && preset.name !== "Unarchived" &&
                                    <Box
                                    sx={{
                                      display: "flex",
                                      gap: 0.5,
                                      alignItems: "center",
                                      cursor: "pointer",
                                      color:
                                        theme.palette.palette_style.error.dark,
                                      fontWeight: 500,
                                    }}
                                    onClick={() => handleDeletePreset(preset)}
                                  >
                                    <DeleteIcon />
                                    <Typography
                                      variant="subtitle2"
                                      component={"span"}
                                      sx={{
                                        display: {
                                          xs: "none",
                                          md: "block",
                                        },
                                      }}
                                    >
                                      Delete
                                    </Typography>
                                  </Box>
                                }
                                
                              </Grid>
                          </Grid>
                           
                          
                        
                        </Box>
                        
                    )
                })   
            }
          </Box>
          <YesNoDialog
            title="Delete Preset"
            submitText="Delete"
            message="Are you sure you want to delete the preset?"
            open={isDeletePresetDialogOpen}
            handleClose={() => setOpenDeletePresetDialog(false)}
            onSubmit={() => {
              deletePresets();
            }}
          />
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