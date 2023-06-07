import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { fetchRows, setFilters } from '../../redux/actions/viewActions';
import useResponsive from '../../hooks/useResponsive';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import { BooleanFilterOperatorLabel, ChoiceFilterOperatorLabel, DateFilterOperatorLabel, NumberFilterOperatorLabel, StringFilterOperatorLabel } from 'src/enums/ShareEnumLabels';
import { FlatWhere, Query, Sort, View, WhereCmp } from 'src/models/SharedModels';
import { FieldType, FilterOperator, SearchType } from 'src/enums/SharedEnums';
import { isObject } from 'src/utils/validateUtils';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type FilterProps = {
  currentView:View;
  columns: any;
  filters: FlatWhere[];
  open: boolean;
  setFilters: (filters: FlatWhere[]) => void;
  fetchRows: (type:SearchType,viewId?:number,page?:number,limit?:number,conditions?:FlatWhere[],order?:Sort[],query?:Query) => void;
  handleClose: () => void;
};

const Filter = ({ currentView,columns, filters, open, setFilters,fetchRows, handleClose }: FilterProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  const [windowHeight, setWindowHeight] = useState(0);
  const stringFilterOperators : {key:string,value:string}[] = Array.from(StringFilterOperatorLabel,function(item){
    return {key:item[0],value:item[1]}
  })
  const numberFilterOperators : {key:string,value:string}[] = Array.from(NumberFilterOperatorLabel,function(item){
    return {key:item[0],value:item[1]}
  })
  const dateFilterOperators : {key:string,value:string}[] = Array.from(DateFilterOperatorLabel,function(item){
    return {key:item[0],value:item[1]}
  })
  const choiceFilterOperators : {key:string,value:string}[] = Array.from(ChoiceFilterOperatorLabel,function(item){
    return {key:item[0],value:item[1]}
  })
  const booleanFilterOperators : {key:string,value:string}[] = Array.from(BooleanFilterOperatorLabel,function(item){
    return {key:item[0],value:item[1]}
  })
  const condtionOperators : string[] = ["And","Or"]
  const booleanValues : string[] = ["true","false"]
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const getColumn = (column_id: number) => {
    const column = columns.filter((item: any) => item.id === column_id);

    return column[0];
  };

  const handleFilters = (index: number, key: string, value: any) => {
    console.log(index)
    setFilters(filters.map((filter: any, i: number) => {
      if (index === i) filter[key] = value;
      return filter;
    }));
  };
  const handleConditionOperationFilters = (index: number, value: string) => {
    setFilters(filters.map((filter: any, i: number) => {
      if (index === i) filter = value;
      return filter;
    }));
  };
  const removeFilter = (index: number) => {
    setFilters(filters.filter((filter: any, i: number) => i !== index));
  };
  const getDate = (date:any)=>{
    return dayjs(date, "MM/DD/YYYY HH:mm:ss")
  }
  const getFilter = (filter : any,index?:number) : [string,{key:string,value:string}[],any] =>{
     var column = getColumn(filter.left);
     var columnType = column.type;
     var defaultConditionOperator : string = FilterOperator.eq;
     var conditionOperators :{key:string,value:string}[] = []
     var render : any = (<></>)
     switch (columnType) {
      case FieldType.Integer:
      case FieldType.Float:
      case FieldType.Decimal:
      case FieldType.Double:
      case FieldType.Money:
      case FieldType.Percentage:
        defaultConditionOperator = numberFilterOperators[0].key
        conditionOperators = numberFilterOperators;
        render = (<TextField
          size="small"
          type={ 'number'}
          onChange={(e) => { handleFilters(index??0, 'right', e.target.value); }}
          value={filter.right}
          sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
        />)
        break;
      case FieldType.Date:
      case FieldType.DateTime:
      case FieldType.Time:
        defaultConditionOperator = dateFilterOperators[0].key
        conditionOperators = dateFilterOperators;
        render = (<LocalizationProvider dateAdapter={AdapterDayjs} key={column.id}>
          <DateTimePicker
              value={getDate(filter.right)}
              onChange={(e: any) => {
                handleFilters(index??0,'right',e.format('MM/DD/YYYY HH:mm:ss'))
              }
              }
              sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
            />
        </LocalizationProvider>)
        break;
      case FieldType.Text:
         defaultConditionOperator = stringFilterOperators[0].key
         conditionOperators = stringFilterOperators
         render = (<TextField
          size="small"
          type={ 'text'}
          onChange={(e) => { handleFilters(index??0, 'right', e.target.value); }}
          value={filter.right}
          sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
        />)
         break;
      case FieldType.Choice :
         defaultConditionOperator = choiceFilterOperators[0].key
         conditionOperators = choiceFilterOperators
         render = (<Select
          value={filter.right}
          onChange={(e) => { handleFilters(index??0, 'right', e.target.value); }}
          size="small"
          sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
        >
          {filter?.config.map((choice: any) => (
            <MenuItem key={choice.name} value={choice.name} sx={{ backgroundColor: choice.color.bg, color: choice.color.fill, '&:hover': { backgroundColor: choice.color.bg } }}>{choice.name}</MenuItem>
          ))}
        </Select>)
        break;
       case FieldType.Boolean:
        defaultConditionOperator = "false"
        conditionOperators = booleanFilterOperators
        render = (<Select
          value={filter.right.toString()}
          onChange={(e) => { handleFilters(index??0, 'right', e.target.value=="true"); }}
          size="small"
          sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
        >
          {booleanValues.map((value: any) => (
            <MenuItem key={value} value={value} >{value}</MenuItem>
          ))}
        </Select>) 
        break;
      default:
        break;
     }
     return [defaultConditionOperator,conditionOperators,render]
  }
  const addFilter = () => {
    if(filters.length>0)
    {
      setFilters([
        ...filters,
        'And',
        {
          left : columns[0].id,
          leftType : 'Field',
          right:'',
          rightType:'SearchString',
          cmp:getFilter({left:columns[0].id})[0]
        } as FlatWhere
        
      ]);
    }
    else
    {
      setFilters([
        {
          left : columns[0].id,
          leftType : 'Field',
          right:'',
          rightType:'SearchString',
          cmp:getFilter({left:columns[0].id})[0]
        } as FlatWhere
      ]);
    }
    
  };
  const onsubmit = async() =>{
    console.log(filters);
    fetchRows(SearchType.View,currentView.id,undefined,undefined,filters)
    handleClose()
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs: '100%', md: '645px'},
    backgroundColor: 'white',
    py: 2,
    px: {xs: 0.5, md: 2},
    boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.05)',
    borderRadius: '5px',
    border: 'none'
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}`, paddingBottom: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Box>Show fields in list if:</Box>
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
              cursor: 'pointer'
            }}
            onClick={handleClose}
          />
        </Box>
        { filters.length>0 &&
          <Box sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}`, py: 2, maxHeight: `${windowHeight - 108}px`, overflow: 'auto' }}>
          {filters.map((filter: any, index: number) =>{
             return isObject(filter) ? 
             (
              <Box key={filter.column} sx={{ marginBottom: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Select
                    value={filter.left}
                    onChange={(e) => { handleFilters(index, 'left', e.target.value); }}
                    size="small"
                    sx={{ width: {md: '168px'}, textTransform: 'capitalize' }}
                    className="sort_column"
                  >
                    {columns.map((column: any) => (
                      <MenuItem key={column.id} value={column.id} sx={{ display: 'flex' }}>
                        <Box
                          component="span"
                          className="svg-color"
                          sx={{
                            width: 14,
                            height: 14,
                            display: 'inline-block',
                            bgcolor: theme.palette.palette_style.text.primary,
                            mask: `url(/assets/icons/table/${column.icon}.svg) no-repeat center / contain`,
                            WebkitMask: `url(/assets/icons/table/${column.icon}.svg) no-repeat center / contain`,
                            marginRight: {xs: 0.2, md: 1}
                          }}
                        />
                        <Box>{column.name}</Box>
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    value={filter.cmp}
                    onChange={(e) => { handleFilters(index, 'cmp', e.target.value); }}
                    size="small"
                    sx={{ width: {md: '168px'}, marginLeft: {xs: '8px', md: '30px'} }}
                  >
                    {
                      getFilter(filter)[1].map((compare)=>{
                         return (<MenuItem key={compare.key} value={compare.key}>{compare.value}</MenuItem>)
                      })
                    }
                  </Select>
                  {
                    getFilter(filter,index)[2]
                  }
                  <Box
                    component="span"
                    className="svg-color add_choice"
                    sx={{
                      width: {xs: 50, md: 18},
                      height: 18,
                      display: 'inline-block',
                      bgcolor: theme.palette.palette_style.text.primary,
                      mask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
                      WebkitMask: `url(/assets/icons/table/close.svg) no-repeat center / contain`,
                      maskPosition: {xs: 'right', md: 'inherit'},
                      cursor: 'pointer',
                      marginTop: 1.5,
                      marginLeft: {xs: '8px', md: '30px'}
                    }}
                    onClick={() => { removeFilter(index); }}
                  />
                </Box>
              </Box>
             ):
             (
                  index?(<Select
                  value={filter}
                  onChange={(e) => { handleConditionOperationFilters(index, e.target.value); }}
                  size="small"
                  sx={{ width: {md: '168px'}, marginBottom: 1 }}
                >
                  {condtionOperators.map((operator)=>{
                     return (<MenuItem key={operator} value={operator}>{operator}</MenuItem>)
                  })}
               
                </Select> 
                ):(<></>)
            )
          }
          )
         }
        </Box>
        }
        
        <Box sx={{ paddingTop: 2, display: 'flex', cursor: 'pointer' }} onClick={addFilter}>
          <Box
            component="span"
            className="svg-color"
            sx={{
              width: 14,
              height: 14,
              display: 'inline-block',
              bgcolor: theme.palette.palette_style.text.primary,
              mask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
              WebkitMask: `url(/assets/icons/table/plus.svg) no-repeat center / contain`,
              cursor: 'pointer',
              marginTop: 0.5,
              marginRight: 0.5
            }}
          />
          <Box>Add condition</Box>
        </Box>
        <Box sx={{ paddingTop: 2, display: 'flex', cursor: 'pointer' }} onClick={()=>onsubmit()}>
          
          <Box>Submit</Box>
        </Box>
      </Box>
      
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  filters: state.view.filters,
  currentView: state.view.currentView
});

const mapDispatchToProps = {
  setFilters,
  fetchRows
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
