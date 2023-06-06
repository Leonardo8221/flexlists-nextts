import { useState, useEffect } from "react";
import { Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useResponsive from '../../hooks/useResponsive';
import { connect } from 'react-redux';
import { setColumns } from '../../redux/actions/viewActions';
import Checkbox from '@mui/material/Checkbox';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from '@mui/material/Modal';

type Props = {
  columns: any;
  open: boolean;
  setColumns: (columns: any) => void;
  handleClose: () => void;
};

const Fields = (props: Props) => {
  const { columns, open, setColumns, handleClose } = props;
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');
  
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [modalHeight, setModalHeight] = useState(0);

  useEffect(() => {
    setSearchText('');
    initTasks("");
    
    setTimeout(checkModalHeight, 1);
  }, [open]);

  useEffect(() => {
    initTasks("");
    checkModalHeight();
  }, [columns]);

  const checkModalHeight = () => {
    const modalObj = document.getElementById('fields_wrap') as HTMLDivElement;

    if (modalObj) setModalHeight(modalObj.offsetHeight);
  };

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
    initTasks(e.target.value);
  };

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
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} id="fields_wrap">
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
              {tasks.map((task: any, index: number) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided: any) => (
                    <Box {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', py: 1 }}>
                      <Box sx={{ display: 'flex' }}>
                        <Checkbox
                          checked={task.column.viewFieldVisible}
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
        <Box sx={{ paddingTop: 2, textAlign: 'center', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          <Box sx={{ py: 1, border: `1px solid ${theme.palette.palette_style.border.default}`, borderRadius: '5px', cursor: 'pointer' }} onClick={() => { handleVisible(true); }}>Show all</Box>
          <Box sx={{ py: 1, border: `1px solid ${theme.palette.palette_style.border.default}`, borderRadius: '5px', cursor: 'pointer' }} onClick={() => { handleVisible(false); }}>Hide all</Box>
        </Box>
      </Box>
    </Modal>
  );
};

const mapStateToProps = (state: any) => ({
  columns: state.view.columns
});

const mapDispatchToProps = {
  setColumns
};

export default connect(mapStateToProps, mapDispatchToProps)(Fields);
