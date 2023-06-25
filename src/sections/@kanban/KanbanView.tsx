import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { setRows } from '../../redux/actions/viewActions';
import KanbanColumn from './KanbanColumn';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { styled } from '@mui/material/styles';
import ViewFooter from '../../components/view-footer/ViewFooter';
import { ChoiceModel } from "src/models/ChoiceModel";

type Props = {
  rows: any;
  open: boolean;
  setRows: (columns: any) => void;
};

const KanbanView = (props: Props) => {
  const { rows, open, setRows } = props;
  
  const [testData, setTestData] = useState<any>();
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [boardColumns, setBoardColumns] = useState<ChoiceModel[]>([]);
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

  useEffect(() => {
    const tasks: any = {};
    const inProgresstaskIds: string[] = [];
    const testingtaskIds: string[] = [];
    const donetaskIds: string[] = [];

    rows.map((row: any) => {
      const row_id = `task-${row.id}`;
      const task = {...row, id: row_id};

      task.id = row_id;
      tasks[row_id] = task;

      if (row.phase === 'In progress') inProgresstaskIds.push(row_id);
      else if (row.phase === 'Testing') testingtaskIds.push(row_id);
      else if (row.phase === 'Done') donetaskIds.push(row_id);
      else {}
    });

    const initialData = {
      tasks: tasks,
      columns: {
        'column-1': {
          id: 'column-1',
          title: 'In progress',
          taskIds: inProgresstaskIds,
        },
        'column-2': {
          id: 'column-2',
          title: 'Testing',
          taskIds: testingtaskIds,
        },
        'column-3': {
          id: 'column-3',
          title: 'Done',
          taskIds: donetaskIds,
        }
      },
      columnOrder: ['column-1', 'column-2', 'column-3']
    };

    setTestData(initialData);
  }, [rows]);

  const onDragEnd = (result: any) => {
    // if (!result.destination) return;
    // const { source, destination, draggableId } = result;

    // if (source.droppableId !== destination.droppableId) {
    //   const sourceColumn = testData.columns[source.droppableId];
    //   const destColumn = testData.columns[destination.droppableId];
    //   const sourceTasks = [...sourceColumn.taskIds];
    //   const destTasks = [...destColumn.taskIds];
    //   const [removed] = sourceTasks.splice(source.index, 1);
    //   destTasks.splice(destination.index, 0, removed);
      
    //   setTestData({
    //     ...testData,
    //     tasks: {
    //       ...testData.tasks,
    //       [removed]: {
    //         ...testData.tasks[removed],
    //         phase: destColumn.title
    //       }
    //     },
    //     columns: {
    //       ...testData.columns,
    //       [source.droppableId]: {
    //         ...sourceColumn,
    //         taskIds: sourceTasks,
    //       },
    //       [destination.droppableId]: {
    //         ...destColumn,
    //         taskIds: destTasks,
    //       }
    //     }
    //   });

    //   let sourceIndex = 0;
    //   let destIndex = 0;
      
    //   setRows(rows.map((row: any, index: number) => {
    //     if (row.id === parseInt(removed.split('-')[1])) row.phase = destColumn.title;
    //     if (row.id === parseInt(destTasks[destination.index + 1] ? destTasks[destination.index + 1].split('-')[1] : destTasks[destination.index - 1].split('-')[1])) destIndex = index;
    //     if (row.id === parseInt(draggableId.split('-')[1])) sourceIndex = index;

    //     return row;
    //   }));
      
    //   const [changed] = rows.splice(sourceIndex, 1);
    //   rows.splice(destIndex, 0, changed);
      
    //   setRows(rows);
    // } else {
    //   if (source.droppableId === "board") {
    //     const newColumnOrder = testData.columnOrder;
    //     const [removed] = newColumnOrder.splice(source.index, 1);
    //     newColumnOrder.splice(destination.index, 0, removed);

    //     setTestData({
    //       ...testData,
    //       columnOrder: newColumnOrder
    //     });
    //   } else {
    //     const column = testData.columns[source.droppableId];
    //     const copiedTasks = [...column.taskIds];
    //     const [removed] = copiedTasks.splice(source.index, 1);
    //     copiedTasks.splice(destination.index, 0, removed);
        
    //     setTestData({
    //       ...testData,
    //       columns: {
    //         ...testData.columns,
    //         [source.droppableId]: {
    //           ...column,
    //           taskIds: copiedTasks,
    //         }
    //       }
    //     });
    //   }
    // }
  };

  const handleRowData = (row: any) => {
    setRowData(row);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided: any) => (
          provided.droppableProps && <Container ref={provided.innerRef} {...provided.droppableProps} className="board">
            {/* {boardColumns && boardColumns.length>0 && boardColumns.map((boardColumn: any, index: number) => {
              const column = testData.columns[columnId];
              const tasks = column.taskIds.map((taskId: any) => testData.tasks[taskId]);
              
              return <KanbanColumn key={column.id} column={column} tasks={tasks} index={index} openNewRowPanel={() => { setVisibleAddRowPanel(true); }} handleRowData={handleRowData} />;
            })}
            {provided.placeholder} */}
          </Container>
        )}
      </Droppable>
      
      <ViewFooter visibleAddRowPanel={visibleAddRowPanel} rowData={rowData} setVisibleAddRowPanel={setVisibleAddRowPanel} setRowData={setRowData} />
    </DragDropContext>
  );
};

const mapStateToProps = (state: any) => ({
  rows: state.view.rows
});

const mapDispatchToProps = {
  setRows
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanView);
