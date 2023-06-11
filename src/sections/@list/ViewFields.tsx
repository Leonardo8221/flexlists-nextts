import { useState, useEffect } from "react";
import { Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import { connect } from 'react-redux';
import { setColumns } from '../../redux/actions/viewActions';
import Checkbox from '@mui/material/Checkbox';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from '@mui/material/Modal';
import ViewFieldForm from "./ViewFieldForm";
import { ViewField } from "src/models/ViewField";
import { filter } from "lodash";

type ViewFieldsProps = {
  currentView : ViewField,
  columns: ViewField[];
  open: boolean;
  setColumns: (columns: any) => void;
  handleClose: () => void;
};

const ViewFields = ({currentView, columns, open, setColumns, handleClose }: ViewFieldsProps) => {
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  
  const [searchText, setSearchText] = useState('');
  const [modalHeight, setModalHeight] = useState(0);
  const [fieldListMode,setFieldListMode] = useState<boolean>(true)
  const [selectedField,setSelectedField] = useState<ViewField>();
  const [filterColumns,setFilterColumns] = useState<ViewField[]>(columns)
  useEffect(() => {
    setSearchText('');
    searchField("");
    setTimeout(checkModalHeight, 1);
  }, [open]);

  useEffect(() => {
    // searchField("");
    checkModalHeight();
  }, [columns]);

  const checkModalHeight = () => {
    const modalObj = document.getElementById('fields_wrap') as HTMLDivElement;

    if (modalObj) setModalHeight(modalObj.offsetHeight);
  };

  const searchField = (search: string) => {
    var newColumns = filter(columns,(column)=>{return (search && column.name.includes(search) || search === '')})
    setFilterColumns(newColumns);

  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.index === source.index) {
      return;
    }

    const [removedColumns] = columns.splice(source.index, 1);
    columns.splice(destination.index, 0, removedColumns);
    setColumns([...columns]);
  };

  const handleVisible = (value: boolean) => {
    setColumns(columns.map((column: any) => {
      column.viewFieldVisible = value;
      return column;
    }));
  };

  const changeVisible = (index: number) => {
    setColumns(columns.map((column: any, i: number) => {
      if (index === i) column.viewFieldVisible = !column.viewFieldVisible;
      return column;
    }));
  };

  const handleSearchColumns = (e: any) => {
    setSearchText(e.target.value);
    searchField(e.target.value);
  };
  const handleSelectField = (field:ViewField) =>
  {
      setFieldListMode(false);
      setSelectedField(field)
  }
  const updateField = (field : ViewField) =>{
    setColumns(columns.map((x)=>{return(x.id === field.id ? field:x)}))
  }
  const handleCloseModal = ()=>
  {
    setFieldListMode(true);
    handleClose()
  }
  const style = {
    position: 'absolute',
    top: `calc(50% - ${modalHeight / 2}px)`,
    left: {xs: 0, md: 'calc(50% - 179px)'},
    width: {xs: '100%', md: '357px'},
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
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
     
      <Box sx={style} id="fields_wrap">
          {!fieldListMode ?
          <Box sx={{ display: 'flex', width: '100%', px: {xs: 1, md: 3}, marginTop: 4, paddingBottom: 2, borderBottom: `1px solid ${theme.palette.palette_style.border.default}` }}>
            <Box
              component="span"
              className="svg-color"
              sx={{
                width: 22,
                height: 22,
                display: 'inline-block',
                bgcolor: theme.palette.palette_style.text.primary,
                mask: `url(/assets/icons/arrow_back.svg) no-repeat center / contain`,
                WebkitMask: `url(/assets/icons/arrow_back.svg) no-repeat center / contain`,
                cursor: 'pointer',
                marginRight: {xs: 1.5, md: 4}
              }}
              onClick={() => { setFieldListMode(true); }}
            />
          </Box> :
            <>
            </>
          }
        {
          fieldListMode?
          (<>
             <Box sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}`, paddingBottom: 1, display: 'flex', justifyContent: 'space-between' }} id="search_column_list">
                <TextField
                  label="Search a field"
                  size="small"
                  type="text"
                  onChange={handleSearchColumns}
                  value={searchText}
                  sx={{ border: 'none' }}
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
                    marginTop: 1
                  }}
                  onClick={handleClose}
                />
              </Box>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="field_list">
                {(provided: any) => (
                  <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}`, py: 2, maxHeight: `${window.innerHeight - 140}px`, overflow: 'auto', minHeight: '360px' }}>
                    {filterColumns.map((column: any, index: number) => (
                      <Draggable key={`${column.id}`} draggableId={`${column.id}`} index={index}>
                        {(provided: any) => (
                          <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', py: 1 }}>
                            <Box flexGrow={2} sx={{ display: 'flex' }}>
                              <Checkbox
                                checked={column.viewFieldVisible}
                                sx={{
                                  color: '#CCCCCC',
                                  '&.Mui-checked': {
                                    color: '#54A6FB',
                                  },
                                  p: 0,
                                  marginRight: 1
                                }}
                                onChange={() => { changeVisible(index) }}
                              />
                              <Box
                                component="span"
                                className="svg-color"
                                sx={{
                                  width: 15,
                                  height: 15,
                                  display: 'inline-block',
                                  bgcolor: theme.palette.palette_style.text.primary,
                                  mask: `url(/assets/icons/table/${column.icon}.svg) no-repeat center / contain`,
                                  WebkitMask: `url(/assets/icons/table/${column.icon}.svg) no-repeat center / contain`,
                                  marginRight: 1,
                                  marginTop: 0.5
                                }}
                                
                              />
                              <Box flexGrow={2} onClick={()=>handleSelectField(column)}>{column.name}</Box>
                            </Box>
                            <Box
                              component="span"
                              className="svg-color"
                              sx={{
                                width: 14,
                                height: 14,
                                display: 'inline-block',
                                bgcolor: theme.palette.palette_style.text.primary,
                                mask: `url(/assets/icons/toolbar/drag_indicator.svg) no-repeat center / contain`,
                                WebkitMask: `url(/assets/icons/toolbar/drag_indicator.svg) no-repeat center / contain`
                              }}
                            />
                          </Box>
                        )}
                      </Draggable>
                    ))}
                  </Box>
                )}
                </Droppable>
              </DragDropContext>
              <Box sx={{ paddingTop: 2, textAlign: 'center', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <Box sx={{ py: 1, border: `1px solid ${theme.palette.palette_style.border.default}`, borderRadius: '5px', cursor: 'pointer' }} onClick={() => { handleVisible(true); }}>Show all</Box>
                <Box sx={{ py: 1, border: `1px solid ${theme.palette.palette_style.border.default}`, borderRadius: '5px', cursor: 'pointer' }} onClick={() => { handleVisible(false); }}>Hide all</Box>
              </Box>
          </>):
          (<>
            {
              selectedField && <ViewFieldForm
              viewId={currentView.id}
              field={selectedField}
              onUpdate={(field)=>updateField(field)}
              onClose={() => setFieldListMode(true)}
              /> 
            }
            
          </>)
        }
        
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  currentView: state.view.currentView
});

const mapDispatchToProps = {
  setColumns
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewFields);
