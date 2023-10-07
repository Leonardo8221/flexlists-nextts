import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchRows, setCurrentView } from "../../redux/actions/viewActions";
import KanbanColumn from "./KanbanColumn";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { styled } from "@mui/material/styles";
import ViewFooter from "../../components/view-footer/ViewFooter";
import { ChoiceModel } from "src/models/ChoiceModel";
import { FlatWhere, View } from "src/models/SharedModels";
import { KanbanConfig } from "src/models/ViewConfig";
import { ViewField } from "src/models/ViewField";
import { listContentService } from "src/services/listContent.service";
import { FlexlistsError, isSucc } from "src/models/ApiResponse";
import { setFlashMessage } from "src/redux/actions/authAction";
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";
import Head from "next/head";

type KanbanViewProps = {
  columns: ViewField[];
  currentView: View;
  rows: any[];
  open: boolean;
  translations: TranslationText[];
  refresh: Boolean;
  fetchRows: () => void;
  setCurrentView: (view: View) => void;
  clearRefresh: () => void;
};

const KanbanView = ({
  translations,
  currentView,
  columns,
  rows,
  open,
  refresh,
  fetchRows,
  setCurrentView,
  clearRefresh,
}: KanbanViewProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const [visibleAddRowPanel, setVisibleAddRowPanel] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [boardColumns, setBoardColumns] = useState<ChoiceModel[]>(
    columns.find((x) => x.id === currentView.config?.boardColumnId)?.config
      ?.values as ChoiceModel[]
  );
  const [kanbanConfig, setKanbanConfig] = useState<KanbanConfig>(
    currentView.config as KanbanConfig
  );
  const [mode, setMode] = useState<"view" | "create" | "update" | "comment">(
    "view"
  );

  const Container = styled("div")(({ theme }) => ({
    display: "flex",
    padding: "16px",
    height: `${windowHeight - (open ? 279 : 235)}px`,
    overflow: "auto",
    [theme.breakpoints.up("md")]: {
      height: `${windowHeight - 193}px`,
    },
  }));

  useEffect(() => {
    if (refresh) fetchRows();
  }, [refresh]);

  useEffect(() => {
    clearRefresh();
  }, [rows]);

  useEffect(() => {
    setWindowHeight(window.innerHeight);

    let newView: View = Object.assign({}, currentView);
    newView.conditions = [];

    for (let i = 0; i < boardColumns.length; i++) {
      const filter: FlatWhere = {
        left: kanbanConfig.boardColumnId,
        leftType: "Field",
        right: boardColumns[i].id,
        rightType: "SearchString",
        cmp: "eq",
      } as FlatWhere;

      newView.conditions.push(filter);
      if (i < boardColumns.length - 1) newView.conditions.push("Or");
    }

    setCurrentView(newView);
    fetchRows();
  }, []);

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const destColumn = boardColumns.find(
      (x) => x.id.toString() === destination.droppableId
    );
    const destTasks = rows.filter(
      (row: any) => row[kanbanConfig.boardColumnId] === destColumn?.id
    );

    //console.log("source, dest", source.index, destination.index, destTasks);
    let targetId: number | undefined = undefined;

    if (source.droppableId !== destination.droppableId) {
      console.log("moved to another board");
      // update content with destination board
      targetId =
        destTasks[destination.index]?.id ??
        (destTasks && destTasks.length > 0
          ? destTasks[destTasks.length - 1].id
          : null);
      // move to another board;
      const updateRowRespone = await listContentService.updateContents(
        currentView.id,
        [
          {
            id: parseInt(draggableId),
            [kanbanConfig.boardColumnId]: destColumn?.id,
          },
        ]
      );
      if (targetId) {
        // console.log(
        //   destination.index,
        //   parseInt(draggableId),
        //   targetId
        //   //destTasks[destination.index].id
        // );
        await reorderContents(parseInt(draggableId), targetId);
      }
    } else {
      // console.log(
      //   destination.index,
      //   parseInt(draggableId),
      //   targetId,
      //   destTasks[destination.index].id
      // );
      if (destination.index && destination.index > 0) {
        if (source.index > destination.index) {
          targetId = destTasks[destination.index - 1].id;
        } else {
          targetId = destTasks[destination.index].id;
        }
      }
      await reorderContents(
        parseInt(draggableId),
        targetId
        //destTasks[destination.index].id
      );
    }
    fetchRows();
  };

  const reorderContents = async (
    sourceContentId: number,
    targetContentId?: number
  ) => {
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
    setMode("view");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Head>
        <title>{t("Kanban Page Title")}</title>
        <meta name="description" content={t("Kanban Meta Description")} />
        <meta name="keywords" content={t("Kanban Meta Keywords")} />
      </Head>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided: any) =>
          provided.droppableProps && (
            <Container
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="board"
            >
              {boardColumns &&
                boardColumns.length > 0 &&
                boardColumns.map((boardColumn: any, index: number) => {
                  // const column = testData.columns[columnId];
                  const tasks = rows.filter(
                    (row: any) =>
                      row[kanbanConfig.boardColumnId] === boardColumn.id
                  );

                  return (
                    <KanbanColumn
                      translations={translations}
                      key={boardColumn.id}
                      kanbanConfig={kanbanConfig}
                      column={boardColumn}
                      tasks={tasks}
                      index={index}
                      openNewRowPanel={() => {
                        setVisibleAddRowPanel(true);
                      }}
                      handleRowData={handleRowData}
                    />
                  );
                })}
              {provided.placeholder}
            </Container>
          )
        }
      </Droppable>

      <ViewFooter
        visibleAddRowPanel={visibleAddRowPanel}
        rowData={rowData}
        setVisibleAddRowPanel={setVisibleAddRowPanel}
        setRowData={setRowData}
        translations={translations}
        mode={mode}
        setMode={setMode}
      />
    </DragDropContext>
  );
};

const mapStateToProps = (state: any) => ({
  rows: state.view.rows,
  columns: state.view.columns,
  currentView: state.view.currentView,
});

const mapDispatchToProps = {
  fetchRows,
  setCurrentView,
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanView);
