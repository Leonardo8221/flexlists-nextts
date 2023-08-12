import { useEffect, useState } from "react";
import { Box, Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { connect } from "react-redux";
import { FieldUiTypeEnum } from "src/enums/SharedEnums";
import { ViewField } from "src/models/ViewField";
import { convertToInteger } from "src/utils/convertUtils";
import { FieldUIType } from "src/models/SharedModels";
import CreateFieldModal from "./CreateFieldModal";
import { TimelineConfig } from "src/models/ViewConfig";

type TimelineViewConfigProps = {
  submit : boolean,
  updateConfig :(config : TimelineConfig) => void
  columns:ViewField[];
  availableFieldUiTypes: FieldUIType[]
}

function TimelineViewConfig({ submit, updateConfig, columns, availableFieldUiTypes }: TimelineViewConfigProps)
{
  const [titleFieldId, setTitleFieldId] = useState<number>(0);
  const [colorFieldId, setColorFieldId] = useState<number>(0);
  const [levelFieldId, setLevelFieldId] = useState<number>(0);
  const [fromFieldId, setFromFieldId] = useState<number>(0);
  const [toFieldId, setToFieldId] = useState<number>(0);
  const [isOpenTitleFieldModal, setIsOpenTitleFieldModal] = useState<boolean>(false);
  const [isOpenColorFieldModal, setIsOpenColorFieldModal] = useState<boolean>(false);
  const [isOpenLevelFieldModal, setIsOpenLevelFieldModal] = useState<boolean>(false);
  const [isOpenFromFieldModal, setIsOpenFromFieldModal] = useState<boolean>(false);
  const [isOpenToFieldModal, setIsOpenToFieldModal] = useState<boolean>(false);
  const titleFieldUiTypes : FieldUIType[] = availableFieldUiTypes.filter((uiType) => uiType.name === FieldUiTypeEnum.Text);
  const colorFieldUiTypes : FieldUIType[] = availableFieldUiTypes.filter((uiType) => uiType.name === FieldUiTypeEnum.Text);
  const levelFieldUiTypes : FieldUIType[] = availableFieldUiTypes.filter((uiType) => uiType.name === FieldUiTypeEnum.Integer);
  const fromFieldUiTypes : FieldUIType[] = availableFieldUiTypes.filter((uiType) => uiType.name === FieldUiTypeEnum.Date);
  const toFieldUiTypes : FieldUIType[] = availableFieldUiTypes.filter((uiType) => uiType.name === FieldUiTypeEnum.Date);

  const getTitleFields = () :ViewField[]=>
  {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Text);
  };

  const getColorFields = () :ViewField[] =>
  {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Text);
  };

  const getLevelFields = () :ViewField[]=>
  {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Integer);
  };

  const getFromFields = () :ViewField[]=>
  {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Date);
  };

  const getToFields = () :ViewField[]=>
  {
    return columns.filter((x) => x.uiField === FieldUiTypeEnum.Date);
  };

  const [titleFields, setTitleFields] = useState<ViewField[]>(getTitleFields());
  const [colorFields, setColorFields] = useState<ViewField[]>(getColorFields());
  const [levelFields, setLevelFields] = useState<ViewField[]>(getLevelFields());
  const [fromFields, setFromFields] = useState<ViewField[]>(getFromFields());
  const [toFields, setToFields] = useState<ViewField[]>(getToFields());

  const newTitleField : any  = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.Text,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: ""
  };
  const newColorField : any  = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.Text,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: ""
  };
  const newLevelField : any  = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.Integer,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: ""
  };
  const newFromField : any  = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.Date,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: ""
  };
  const newToField : any  = {
    name: "",
    required: true,
    uiField: FieldUiTypeEnum.Date,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: ""
  };

  const reloadColumns = () =>
  {
    const newTitleFields : ViewField[] = getTitleFields();
    const newColorFields : ViewField[] = getColorFields();
    const newLevelFields : ViewField[] = getLevelFields();
    const newFromFields : ViewField[] = getFromFields();
    const newToFields : ViewField[] = getToFields();

    if(newTitleFields.length >0)
    {
      setTitleFieldId(newTitleFields[0].id);
    }

    if(newColorFields.length>0)
    {
      setColorFieldId(newColorFields[0].id)
    }

    if(newLevelFields.length>0)
    {
      setLevelFieldId(newLevelFields[0].id)
    }

    if(newFromFields.length>0)
    {
      setFromFieldId(newFromFields[0].id)
    }

    if(newToFields.length>0)
    {
      setToFieldId(newToFields[0].id)
    }

    setTitleFields(newTitleFields);
    setColorFields(newColorFields);
    setLevelFields(newLevelFields);
    setFromFields(newFromFields);
    setToFields(newToFields);
    updateTimelineConfig(newTitleFields.length > 0 ? newTitleFields[0].id : 0, newColorFields.length > 0 ? newColorFields[0].id : 0, newLevelFields.length > 0 ? newLevelFields[0].id : 0, newFromFields.length > 0 ? newFromFields[0].id : 0, newToFields.length > 0 ? newToFields[0].id : 0);
  }

  useEffect(()=>{
    reloadColumns();
  }, [columns]);

  const onTitleFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if(value === "-1")
    {
      setIsOpenTitleFieldModal(true);
      return;
    }

    setTitleFieldId(convertToInteger(value));
    updateTimelineConfig(convertToInteger(value), colorFieldId, levelFieldId, fromFieldId, toFieldId);
  };
  
  const onColorFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if(value === "-1")
    {
      setIsOpenColorFieldModal(true);
      return;
    }

    setColorFieldId(convertToInteger(value));
    updateTimelineConfig(titleFieldId, convertToInteger(value), levelFieldId, fromFieldId, toFieldId);
  };

  const onLevelFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if(value === "-1")
    {
      setIsOpenLevelFieldModal(true);
      return;
    }

    setLevelFieldId(convertToInteger(value));
    updateTimelineConfig(titleFieldId, colorFieldId, convertToInteger(value), fromFieldId, toFieldId);
  };

  const onFromFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if(value === "-1")
    {
      setIsOpenFromFieldModal(true);
      return;
    }

    setFromFieldId(convertToInteger(value));
    updateTimelineConfig(titleFieldId, colorFieldId, levelFieldId, convertToInteger(value), toFieldId);
  };

  const onToFieldChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;

    if(value === "-1")
    {
      setIsOpenToFieldModal(true);
      return;
    }

    setToFieldId(convertToInteger(value));
    updateTimelineConfig(titleFieldId, colorFieldId, levelFieldId, fromFieldId, convertToInteger(value));
  };

  const updateTimelineConfig = (newTitleFieldId: number, newColorId: number, newLevelId: number, newFromId: number, newToId: number) =>
  {
    updateConfig({titleId: newTitleFieldId, colorId: newColorId, levelId: newLevelId, fromId: newFromId, toId: newToId});
  };
  
  return (
    <Box sx={{ pt: 2 }}>
      <Box sx={{ pt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Title</Typography>
        <Select
          value={`${titleFieldId}`}
          onChange={onTitleFieldChange}
          required
          error={submit && (!titleFieldId || titleFieldId === 0)}
          fullWidth
          sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
        >
          {titleFields.map((titleColumn: ViewField) => (
            <MenuItem key={`${titleColumn.id}`} value={`${titleColumn.id}`} >{titleColumn.name}</MenuItem>
          ))}
          <MenuItem key={"-1"} value={"-1"} >create a new field</MenuItem>
        </Select>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Color</Typography>
        <Select
          value={`${colorFieldId}`}
          required
          error={submit && (!colorFieldId || colorFieldId === 0)}
          onChange={onColorFieldChange}
          fullWidth
          sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
        >
          {colorFields.map((colorColumn: ViewField) => (
            <MenuItem key={`${colorColumn.id}`} value={`${colorColumn.id}`} >{colorColumn.name}</MenuItem>
          ))}
          <MenuItem key={"-1"} value={"-1"} >create a new field</MenuItem>
        </Select>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Level</Typography>
        <Select
          value={`${levelFieldId}`}
          required
          error={submit && (!levelFieldId || levelFieldId === 0)}
          onChange={onLevelFieldChange}
          fullWidth
          sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
        >
          {levelFields.map((levelColumn: ViewField) => (
            <MenuItem key={`${levelColumn.id}`} value={`${levelColumn.id}`} >{levelColumn.name}</MenuItem>
          ))}
          <MenuItem key={"-1"} value={"-1"} >create a new field</MenuItem>
        </Select>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>From</Typography>
        <Select
          value={`${fromFieldId}`}
          required
          error={submit && (!fromFieldId || fromFieldId === 0)}
          onChange={onFromFieldChange}
          fullWidth
          sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
        >
          {fromFields.map((fromColumn: ViewField) => (
            <MenuItem key={`${fromColumn.id}`} value={`${fromColumn.id}`} >{fromColumn.name}</MenuItem>
          ))}
          <MenuItem key={"-1"} value={"-1"} >create a new field</MenuItem>
        </Select>
      </Box>
      <Box sx={{ pt: 2 }}>
        <Typography variant="subtitle2" gutterBottom>To</Typography>
        <Select
          value={`${toFieldId}`}
          required
          error={submit && (!toFieldId || toFieldId === 0)}
          onChange={onToFieldChange}
          fullWidth
          sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
        >
          {toFields.map((toColumn: ViewField) => (
            <MenuItem key={`${toColumn.id}`} value={`${toColumn.id}`} >{toColumn.name}</MenuItem>
          ))}
          <MenuItem key={"-1"} value={"-1"} >create a new field</MenuItem>
        </Select>
      </Box>
      {
        isOpenTitleFieldModal && 
        <CreateFieldModal
          field={newTitleField}
          fieldUiTypes={titleFieldUiTypes}
          open = {isOpenTitleFieldModal}
          handleClose={()=>setIsOpenTitleFieldModal(false)}
        />
      }
      {
        isOpenColorFieldModal && 
        <CreateFieldModal
          field={newColorField}
          fieldUiTypes={colorFieldUiTypes}
          open = {isOpenColorFieldModal}
          handleClose={()=>setIsOpenColorFieldModal(false)}
        />
      }
      {
        isOpenLevelFieldModal && 
        <CreateFieldModal
          field={newLevelField}
          fieldUiTypes={levelFieldUiTypes}
          open = {isOpenLevelFieldModal}
          handleClose={()=>setIsOpenLevelFieldModal(false)}
        />
      }
      {
        isOpenFromFieldModal && 
        <CreateFieldModal
          field={newFromField}
          fieldUiTypes={fromFieldUiTypes}
          open = {isOpenFromFieldModal}
          handleClose={()=>setIsOpenFromFieldModal(false)}
        />
      }
      {
        isOpenToFieldModal && 
        <CreateFieldModal
          field={newToField}
          fieldUiTypes={toFieldUiTypes}
          open = {isOpenToFieldModal}
          handleClose={()=>setIsOpenToFieldModal(false)}
        />
      }
    </Box>
  )
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns
});
  
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineViewConfig);