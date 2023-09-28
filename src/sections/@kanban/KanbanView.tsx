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
import { listContentService } from "src/services/listContent.service";
import { FlexlistsError, isSucc } from "src/models/ApiResponse";
import { setFlashMessage } from "src/redux/actions/authAction";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";
import Head from 'next/head';

type KanbanViewProps = {
  columns: ViewField[];
  currentView:View;
  rows: any[];
  open: boolean;
  translations: TranslationText[];
  setRows: (columns: any) => void;
  fetchRows: () => void;
  setCurrentView: (view: View) => void;
};

const KanbanView = ({ translations, currentView,columns, rows, open, setRows, fetchRows, setCurrentView }: KanbanViewProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  // const [testData, setTestData] = useState<any>();
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [boardColumns, setBoardColumns] = useState<ChoiceModel[]>(columns.find((x)=>x.id === currentView.config?.boardColumnId)?.config?.values as ChoiceModel[]);
  const [kanbanConfig,setKanbanConfig] = useState<KanbanConfig>(currentView.config as KanbanConfig);
  const Container = styled('div')(({ theme }) => ({
    display: 'flex',
    padding: '16px',
    height: `${windowHeight - (open ? 279 : 235)}px`,
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
      height: `${windowHeight - 193}px`,
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

    const destColumn = boardColumns.find((x) => x.id.toString() === destination.droppableId);
    const destTasks = rows.filter((row: any) => row[kanbanConfig.boardColumnId] === destColumn?.id);

    if (source.droppableId !== destination.droppableId) {
      // update content with destination board
    }

    reorderContents(parseInt(draggableId), destTasks[destination.index].id);
  };

  const reorderContents = async (sourceContentId: number, targetContentId: number) => {
    const reorderContentResponse = await listContentService.reordercontents(
      currentView.id,
      sourceContentId,
      targetContentId
    );
    
    if (isSucc(reorderContentResponse)) {
      setFlashMessage({
        message: "Reordered successfully",
        type: "success",
      });

      return;
    } else {
      setFlashMessage({
        type: "error",
        message: (reorderContentResponse as FlexlistsError).message,
      });

      return;
    }
  };

  const handleRowData = (row: any) => {
    setRowData(row);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Head>
        <title>{t("Kanban Page Title")}</title>
        <meta name="description" content={t("Kanban Meta Description")} />
        <meta name="keywords" content={t("Kanban Meta Keywords")} />
      </Head>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided: any) => (
          provided.droppableProps && <Container ref={provided.innerRef} {...provided.droppableProps} className="board">
            {boardColumns && boardColumns.length>0 && boardColumns.map((boardColumn: any, index: number) => {
              // const column = testData.columns[columnId];
              const tasks = rows.filter((row: any) => row[kanbanConfig.boardColumnId] === boardColumn.id);
              
              return <KanbanColumn translations={translations} key={boardColumn.id} kanbanConfig={kanbanConfig} column={boardColumn} tasks={tasks} index={index} openNewRowPanel={() => { setVisibleAddRowPanel(true); }} handleRowData={handleRowData} />;
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
      
      <ViewFooter visibleAddRowPanel={visibleAddRowPanel} rowData={rowData} setVisibleAddRowPanel={setVisibleAddRowPanel} setRowData={setRowData} translations={translations} />
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
