import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import CentralModal from "src/components/modal/CentralModal";
import { connect } from "react-redux";
import { Field, FieldUIType, View } from "src/models/SharedModels";
import FieldFormPanel from "./FieldFormPanel";
import { FieldUiTypeEnum, ViewType } from "src/enums/SharedEnums";
import { fetchColumns, reloadRows, setColumns } from "src/redux/actions/viewActions";
import { ViewField } from "src/models/ViewField";


type ViewFieldConfigProps = {
  open: boolean;
  handleClose: () => void;
  viewType: ViewType;
  type:'field'|'title',
  currentView:View,
  columns:ViewField[],
  availableFieldUiTypes : FieldUIType[];
  reloadRows : ()=>void
};

const ViewFieldsConfig = ({
  open,
  handleClose,
  viewType,
  type,
  currentView,
  columns,
  availableFieldUiTypes,
  reloadRows
}: ViewFieldConfigProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");
  const [windowHeight, setWindowHeight] = useState(0);
  var fieldUiType = FieldUiTypeEnum.Text
  switch (viewType) {
    case ViewType.Calendar:
      if(type === 'field')
      {
        fieldUiType = FieldUiTypeEnum.DateTime
      }
      else
      {
        fieldUiType = FieldUiTypeEnum.Text
      }
      
      break;
  
    default:
      break;
  }
 
  const [currentField,setCurrentField] = useState<any>({
    listId: currentView.listId,
    name: "",
    required: true,
    uiField: fieldUiType,
    description: "",
    detailsOnly: false,
    icon: "",
    config: {},
    defaultValue: ""
  })
  const [fieldUiTypes,setFieldUiTypes] = useState<FieldUIType[]>(availableFieldUiTypes.filter((x)=>{
    switch (viewType) {
      case ViewType.Calendar:
        if(type === 'field' && (x.name === FieldUiTypeEnum.DateTime || x.name === FieldUiTypeEnum.Date))
        {
          return true;
        }
        if(type === 'title' && x.name === FieldUiTypeEnum.Text)
        {
          return true;
        }
        break;
    
      default:
        break;
    }
    return false
}))
  const addField = async(field : Field)=>{
    var viewField : ViewField = Object.assign(field);
    viewField.viewFieldName = field.name;
    viewField.viewFieldDetailsOnly = field.detailsOnly;
    viewField.viewFieldVisible = true
    setColumns([viewField].concat(columns))
    reloadRows()
  }
  return (
    <CentralModal open={open} handleClose={handleClose}>
      {
        <FieldFormPanel
        fieldUiTypes={fieldUiTypes}
        viewId={currentView.id}
        field={currentField}
        onAdd={(field) => addField(field)}
        onUpdate={(field) => {}}
        onDelete={(id) => {}}
        onClose={() => handleClose()}
      />
      }
      
    </CentralModal>
  );
};

const mapStateToProps = (state: any) => ({
  currentView: state.view.currentView,
  availableFieldUiTypes: state.view.availableFieldUiTypes,
  columns: state.view.columns
});

const mapDispatchToProps = {
  setColumns,
  reloadRows
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewFieldsConfig);
