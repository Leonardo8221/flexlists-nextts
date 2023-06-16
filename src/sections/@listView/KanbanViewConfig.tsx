import { useEffect, useState } from "react";
import { Box, Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { connect } from "react-redux";
import { FieldUiTypeEnum } from "src/enums/SharedEnums";
import { ViewField } from "src/models/ViewField";
import { convertToInteger } from "src/utils/convertUtils";
import ViewFieldsConfig from "./CreateFieldModal";
import { Field, FieldUIType } from "src/models/SharedModels";
import CreateFieldModal from "./CreateFieldModal";

type KanbanViewConfigProps = {
  submit : boolean,
  updateConfig :(config : any) => void
  columns:ViewField[];
  availableFieldUiTypes: FieldUIType[]
}
export function KanbanViewConfig({submit,updateConfig,columns,availableFieldUiTypes}:KanbanViewConfigProps)
{
    const [boardColumnId,setBoardColumnId] = useState<number>(0)
    const [titleFieldId,setTitleFieldId] = useState<number>(0)
    const [isOpenBoardFieldModal,setIsOpenBoardFieldModal] = useState<boolean>(false)
    const [isOpenTitleFieldModal,setIsOpenTitleFieldModal] = useState<boolean>(false)
    const boardFieldUiTypes : FieldUIType[] = availableFieldUiTypes.filter((uiType)=> uiType.name === FieldUiTypeEnum.Choice)
    const titleFieldUiTypes : FieldUIType[] = availableFieldUiTypes.filter((uiType)=> uiType.name === FieldUiTypeEnum.Text)
    const getBoardFields = () :ViewField[]=>
    {
       return columns.filter((x)=>x.uiField === FieldUiTypeEnum.Choice)
    }
    const getTitleFields = () :ViewField[]=>
    {
       return columns.filter((x)=>x.uiField === FieldUiTypeEnum.Text)
    }
    const [boardFields,setBoardFields] = useState<ViewField[]>(getBoardFields())
    const [titleFields,setTitleFields] = useState<ViewField[]>(getTitleFields())
    const newBoardField : any  = {
      name: "",
      required: true,
      uiField: FieldUiTypeEnum.Choice,
      description: "",
      detailsOnly: false,
      icon: "",
      config: {},
      defaultValue: ""
    }
    const newTitleField : any  = {
      name: "",
      required: true,
      uiField: FieldUiTypeEnum.Text,
      description: "",
      detailsOnly: false,
      icon: "",
      config: {},
      defaultValue: ""
    }
    const reloadColumns = ()=>
    {
      var newBoardFields : ViewField[] = getBoardFields();
      var newTitleFields : ViewField[] = getTitleFields();

      if(newBoardFields.length >0)
      {
      setBoardColumnId(newBoardFields[0].id);
      }
      if(newTitleFields.length>0)
      {
      setTitleFieldId(newTitleFields[0].id)
      }
      setBoardFields(newBoardFields)
      setTitleFields(newTitleFields)
      updateKanbanConfig(newBoardFields.length>0?newBoardFields[0].id :0,newTitleFields.length>0?newTitleFields[0].id:0)
    }
    useEffect(()=>{
      console.log('aaa')
      reloadColumns()
    },[columns])
    const onBoardFieldChange = (event: SelectChangeEvent) =>{
        var value = event.target.value as string;
        if(value === "-1")
        {
          setIsOpenBoardFieldModal(true)
          return;
        }
        setBoardColumnId(convertToInteger(value))
        updateKanbanConfig(convertToInteger(value),titleFieldId)
    }
    
    const onTitleFieldChange = (event: SelectChangeEvent) =>{
      var value = event.target.value as string;
      if(value === "-1")
      {
          setIsOpenTitleFieldModal(true)
          return;
      }
      setTitleFieldId(convertToInteger(value))
      updateKanbanConfig(boardColumnId,convertToInteger(value))
    }
    const updateKanbanConfig = (newBoardColumnId:number,newTitleId:number) =>
    {
       updateConfig({boardColumnId:newBoardColumnId,titleId:newTitleId})
    }
    
    return (
        <>
            <Box>
          <Typography variant="subtitle2" gutterBottom>Field</Typography>
          <Select
          value={`${boardColumnId}`}
          onChange={onBoardFieldChange}
          required
          error={submit && (!boardColumnId|| boardColumnId === 0)}
          fullWidth
          sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
          >
            {boardFields.map((viewColumn: ViewField) => (
              <MenuItem key={`${viewColumn.id}`} value={`${viewColumn.id}`} >{viewColumn.name}</MenuItem>
            ))}
            <MenuItem key={"-1"} value={"-1"} >create a new field</MenuItem>
          </Select>
        </Box>
        <Box>
          <Typography variant="subtitle2" gutterBottom>Title</Typography>
          <Select
          value={`${titleFieldId}`}
          required
          error={submit && (!titleFieldId || titleFieldId === 0)}
          onChange={onTitleFieldChange}
          fullWidth
          sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
          >
            {titleFields.map((titleColumn: ViewField) => (
              <MenuItem key={`${titleColumn.id}`} value={`${titleColumn.id}`} >{titleColumn.name}</MenuItem>
            ))}
            <MenuItem key={"-1"} value={"-1"} >create a new field</MenuItem>
          </Select>
        </Box>
        {
            isOpenBoardFieldModal && 
            <CreateFieldModal
            field={newBoardField}
            fieldUiTypes={boardFieldUiTypes}
            open = {isOpenBoardFieldModal}
            handleClose={()=>setIsOpenBoardFieldModal(false)}
             />
        }
        {
            isOpenTitleFieldModal && 
            <CreateFieldModal
            field={newTitleField}
            fieldUiTypes={titleFieldUiTypes}
            open = {isOpenTitleFieldModal}
            handleClose={()=>setIsOpenTitleFieldModal(false)}
             />
        }
        </>
    )
}
const mapStateToProps = (state: any) => ({
    columns :  state.view.columns
  });
  
  const mapDispatchToProps = {
  };
  export default connect(mapStateToProps, mapDispatchToProps)(KanbanViewConfig);