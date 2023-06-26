import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { setRows } from '../../redux/actions/viewActions';
import KanbanColumn from './KanbanColumn';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { styled } from '@mui/material/styles';
import ViewFooter from '../../components/view-footer/ViewFooter';
import { ChoiceModel } from "src/models/ChoiceModel";
import { View } from "src/models/SharedModels";
import { KanbanConfig } from "src/models/ViewConfig";
import { ViewField } from "src/models/ViewField";

type KanbanViewProps = {
  columns: ViewField[];
  currentView:View;
  rows: any[];
  open: boolean;
  setRows: (columns: any) => void;
};

const KanbanView = ({currentView,columns, rows, open, setRows }: KanbanViewProps) => {
  
  // const [testData, setTestData] = useState<any>();
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [boardColumns, setBoardColumns] = useState<ChoiceModel[]>(columns.find((x)=>x.id === currentView.config?.boardColumnId)?.config?.values as ChoiceModel[]);
  const [kanbanConfig,setKanbanConfig] = useState<KanbanConfig>(currentView.config as KanbanConfig);
  const Container = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: '24px',
    padding: '16px',
    height: `${windowHeight - (open ? 300 : 256)}px`,
    overflowY: 'auto',
    [theme.breakpoints.up('md')]: {
      height: 'auto',
      gridTemplateColumns: 'repeat(3, 1fr)'
    },
    [theme.breakpoints.up('xl')]: {
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
  }));

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  // useEffect(() => {
  //   const tasks: any = {};
  //   const inProgresstaskIds: string[] = [];
  //   const testingtaskIds: string[] = [];
  //   const donetaskIds: string[] = [];

  //   rows.map((row: any) => {
  //     const row_id = `task-${row.id}`;
  //     const task = {...row, id: row_id};

  //     task.id = row_id;
  //     tasks[row_id] = task;

  //     if (row.phase === 'In progress') inProgresstaskIds.push(row_id);
  //     else if (row.phase === 'Testing') testingtaskIds.push(row_id);
  //     else if (row.phase === 'Done') donetaskIds.push(row_id);
  //     else {}
  //   });

  //   const initialData = {
  //     tasks: tasks,
  //     columns: {
  //       'column-1': {
  //         id: 'column-1',
  //         title: 'In progress',
  //         taskIds: inProgresstaskIds,
  //       },
  //       'column-2': {
  //         id: 'column-2',
  //         title: 'Testing',
  //         taskIds: testingtaskIds,
  //       },
  //       'column-3': {
  //         id: 'column-3',
  //         title: 'Done',
  //         taskIds: donetaskIds,
  //       }
  //     },
  //     columnOrder: ['column-1', 'column-2', 'column-3']
  //   };

  //   setTestData(initialData);
  // }, [rows]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
       reorderRowMap(draggableId,source,destination)
    } else {
      if (source.droppableId === "board") {
        // const newColumnOrder = testData.columnOrder;
        // const [removed] = newColumnOrder.splice(source.index, 1);
        // newColumnOrder.splice(destination.index, 0, removed);

        // setTestData({
        //   ...testData,
        //   columnOrder: newColumnOrder
        // });
      } else {
        console.log('aaaaaa')
        reorderRowMap(draggableId,source,destination)
      }
    }
  };
  const reorderRowMap = (draggableId:string,source:any,destination:any)=>{
     const destColumn = boardColumns.find((x)=>x.id.toString() === destination.droppableId);
     const destTasks = rows.filter((row: any) => row[kanbanConfig.boardColumnId] === destColumn?.id);
     console.log(destTasks)
     let sourceIndex = 0;
     let destIndex = 0;
     console.log(destination.index)
     console.log(rows)
     let newRows : any[] = []
     if(source.droppableId !== destination.droppableId)
     {
      newRows = rows.map((row: any, index: number) => {
        //update the column id of the dragged row
        if (row.id.toString() === draggableId){
          row[currentView.config?.boardColumnId] = destColumn?.id;
        } 
      
        if (row.id === (destination.index<destTasks.length ?destTasks[destination.index]?.id:destTasks[destination.index-1]?.id))
        {
          //get the index of the row before which the dragged row needs to be inserted
          destIndex = (destination.index<destTasks.length? index:index+1);
        }
        //get the index of the dragged row
        if (row.id.toString() === draggableId)
        {
          sourceIndex = index;
        } 

        return row;
      })
     }
     else
     {
      newRows = rows.map((row: any, index: number) => {
        //if drag and drop is within the same column
        //if drag from destination have index greater than source index
        if(destination.index >= source.index)
        {
          if (row.id === (destination.index<destTasks.length-1?destTasks[destination.index+1]?.id:destTasks[destination.index]?.id))
          {
            //get the index of the row before which the dragged row needs to be inserted
            destIndex = (destination.index<destTasks.length-1? index:index+1);
          }
        }
        else
        {
          if (row.id === (destination.index<destTasks.length ?destTasks[destination.index]?.id:destTasks[destination.index-1]?.id))
          {
            //get the index of the row before which the dragged row needs to be inserted
            destIndex = (destination.index<destTasks.length? index:index+1);
          }
        }
        
        //get the index of the dragged row
        if (row.id.toString() === draggableId)
        {
          sourceIndex = index;
        } 

        return row;
      })
     }
      
        console.log(destIndex)
      //if source is before destination, then we need to decrement the destination index by 1
      if(sourceIndex<destIndex)
      {
        destIndex = destIndex-1;
      }
      console.log(sourceIndex)
      console.log(destIndex)
      const [changed] = newRows.splice(sourceIndex, 1);
      console.log(newRows)
      console.log(changed)
      console.log(destIndex)
      newRows.splice(destIndex, 0, changed);
      
      setRows(newRows);
  }
  const handleRowData = (row: any) => {
    setRowData(row);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided: any) => (
          provided.droppableProps && <Container ref={provided.innerRef} {...provided.droppableProps} className="board">
            {boardColumns && boardColumns.length>0 && boardColumns.map((boardColumn: any, index: number) => {
              // const column = testData.columns[columnId];
              const tasks = rows.filter((row: any) => row[kanbanConfig.boardColumnId] === boardColumn.id);
              
              return <KanbanColumn key={boardColumn.id} kanbanConfig={kanbanConfig} column={boardColumn} tasks={tasks} index={index} openNewRowPanel={() => { setVisibleAddRowPanel(true); }} handleRowData={handleRowData} />;
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
      
      <ViewFooter visibleAddRowPanel={visibleAddRowPanel} rowData={rowData} setVisibleAddRowPanel={setVisibleAddRowPanel} setRowData={setRowData} />
    </DragDropContext>
  );
};

const mapStateToProps = (state: any) => ({
  rows: state.view.rows,
  columns: state.view.columns,
  currentView: state.view.currentView
});

const mapDispatchToProps = {
  setRows
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanView);
