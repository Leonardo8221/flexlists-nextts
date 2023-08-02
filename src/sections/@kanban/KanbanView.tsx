import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { setRows, fetchRows, setCurrentView } from '../../redux/actions/viewActions';
import KanbanColumn from './KanbanColumn';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { styled } from '@mui/material/styles';
import ViewFooter from '../../components/view-footer/ViewFooter';
import { ChoiceModel } from "src/models/ChoiceModel";
import { FlatWhere, View } from "src/models/SharedModels";
import { KanbanConfig } from "src/models/ViewConfig";
import { ViewField } from "src/models/ViewField";

type KanbanViewProps = {
  columns: ViewField[];
  currentView:View;
  rows: any[];
  open: boolean;
  setRows: (columns: any) => void;
  fetchRows: () => void;
  setCurrentView: (view: View) => void;
};

const KanbanView = ({currentView,columns, rows, open, setRows, fetchRows, setCurrentView }: KanbanViewProps) => {
  
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

    let newView: View = Object.assign({}, currentView);
    newView.conditions = [];

    for(let i = 0; i < boardColumns.length; i++) {
      const filter: FlatWhere = {
        left: kanbanConfig.boardColumnId,
        leftType: "Field",
        right: boardColumns[i].id,
        rightType: "SearchString",
        cmp: 'eq',
      } as FlatWhere;
  
      newView.conditions.push(filter);
      if (i < boardColumns.length -1) newView.conditions.push("Or");
    }
    
    setCurrentView(newView);
    fetchRows();
  }, []);

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
        const [changed] = boardColumns.splice(source.index, 1);
        boardColumns.splice(destination.index, 0, changed);
      } else {
        reorderRowMap(draggableId,source,destination)
      }
    }
  };
  const reorderRowMap = (draggableId:string,source:any,destination:any)=>{
     const destColumn = boardColumns.find((x)=>x.id.toString() === destination.droppableId);
     const destTasks = rows.filter((row: any) => row[kanbanConfig.boardColumnId] === destColumn?.id);
     let destinationIndex = ((source.droppableId === destination.droppableId && destination.index>source.index)? destination.index+1:destination.index);
     let sourceIndex = 0;
     let destIndex = 0;
     let newRows : any[] = rows.map((row: any, index: number) => {
      //update the column id of the dragged row
      if ((source.droppableId !== destination.droppableId)&& (row.id.toString() === draggableId)){
        row[currentView.config?.boardColumnId] = destColumn?.id;
      } 
    
      if (row.id === (destinationIndex<destTasks.length ?destTasks[destinationIndex]?.id:destTasks[destinationIndex-1]?.id))
      {
        //get the index of the row before which the dragged row needs to be inserted
        destIndex = (destinationIndex<destTasks.length? index:index+1);
      }
      //get the index of the dragged row
      if (row.id.toString() === draggableId)
      {
        sourceIndex = index;
      } 

      return row;
    })
      //if source is before destination, then we need to decrement the destination index by 1
      if(sourceIndex<destIndex)
      {
        destIndex = destIndex-1;
      }
      const [changed] = newRows.splice(sourceIndex, 1);
      newRows.splice(destIndex, 0, changed);
      console.log(newRows)
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
  setRows,
  fetchRows,
  setCurrentView
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanView);
