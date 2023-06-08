import { useState, useEffect } from 'react';
import {
  DialogContent,
  Drawer,
  Box,
  Checkbox} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import { ViewField } from 'src/models/ViewField';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { setColumns } from 'src/redux/actions/viewActions';
interface ListFieldsProps {
  currentView: ViewField;
  columns: any;
  setColumns: (columns: any) => void;
  open: boolean;
  onClose: () => void;
}


const ListFields = ({currentView,columns,setColumns, open, onClose}: ListFieldsProps) => {
  const theme = useTheme(); 
  const [fieldManagementMode,setFieldManagementMode] = useState<boolean>(true)
  const [windowHeight, setWindowHeight] = useState(0);
  const [tasks, setTasks] = useState<any[]>([]);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  useEffect(() => {
  }, [open]);

  const initTasks = (search: string) => {
    const newTasks: any[] = [];

    columns.map((column: any, index: number) => {
      const column_id = `item-${index + 1}`;
      const task = {
        id: column_id,
        column: column
      };

      if (search && column.name.includes(search) || search === '') newTasks.push(task);
    });

    setTasks(newTasks);
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const [removed] = tasks.splice(source.index, 1);
    tasks.splice(destination.index, 0, removed);
    setTasks(tasks);
    
    const [removedColumns] = columns.splice(source.index, 1);
    columns.splice(destination.index, 0, removedColumns);
    setColumns([...columns]);
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
    >
      {fieldManagementMode ?
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
          onClick={() => { setFieldManagementMode(false); }}
        />
      </Box> :
        <></>
      }
      <DialogContent>
        {fieldManagementMode ? 
        (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="field_list">
          {(provided: any) => (
            <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ borderBottom: `1px solid ${theme.palette.palette_style.border.default}`, py: 2, maxHeight: `${window.innerHeight - 140}px`, overflow: 'auto', minHeight: '360px' }}>
              {tasks.map((task: any, index: number) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided: any) => (
                    <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', py: 1 }}>
                      <Box sx={{ display: 'flex' }}>
                        <Box
                          component="span"
                          className="svg-color"
                          sx={{
                            width: 15,
                            height: 15,
                            display: 'inline-block',
                            bgcolor: theme.palette.palette_style.text.primary,
                            mask: `url(/assets/icons/table/${task.column.icon}.svg) no-repeat center / contain`,
                            WebkitMask: `url(/assets/icons/table/${task.column.icon}.svg) no-repeat center / contain`,
                            marginRight: 1,
                            marginTop: 0.5
                          }}
                        />
                        <Box>{task.column.name}</Box>
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
        </>
        )
         :
        (<></>)}
      </DialogContent>
      
    </Drawer>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns,
  currentView : state.view.currentView
});

const mapDispatchToProps = {
  setColumns
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFields);