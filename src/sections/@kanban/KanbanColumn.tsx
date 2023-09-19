import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { connect } from 'react-redux';
import KanbanTask from './KanbanTask';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { styled } from '@mui/material/styles';
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
import { ChoiceModel } from 'src/models/ChoiceModel';
import { KanbanConfig } from 'src/models/ViewConfig';
import { TranslationText } from "src/models/SharedModels";
import { getTranslation } from "src/utils/i18n";

type KanbanColumnProps = {
  index: number;
  rows: any;
  column: ChoiceModel;
  tasks: any;
  kanbanConfig: KanbanConfig;
  translations: TranslationText[];
  openNewRowPanel: () => void;
  handleRowData: (row: any) => void;
};

const Container = styled('div')(({ theme }) => ({
  boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  backgroundColor: 'white',
  marginRight: '30px',
  width: 'calc(100vw - 30px)',
  [theme.breakpoints.up('sm')]: {
    width: '345px'
  },
}));

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '16px 16px 0 16px',
  width: 'calc(100vw - 30px)',
  [theme.breakpoints.up('sm')]: {
    width: '345px'
  }
}));

const Title = styled('div')(({ theme }) => ({
  textTransform: 'uppercase',
  fontSize: '12px'
}));

const TaskList = styled('div')(({ theme }) => ({
  padding: '16px',
  height: 'inherit',
  overflowY: 'auto',
  [theme.breakpoints.up('md')]: {
    height: `${window.innerHeight - 274}px`
  }
}));

const KanbanColumn = ({ index, rows, column, tasks,kanbanConfig, translations, openNewRowPanel, handleRowData }: KanbanColumnProps) => {
  const t = (key: string): string => {
    return getTranslation(key, translations);
  };
  const theme = useTheme();
  const newRow = { phase: column.label };

  const lists = [
    {
      label: t("Rename List"),
      value: 'rename_list'
    },
    {
      label: t("Delete List"),
      value: 'delete_list'
    },
    {
      label: t("Duplicate"),
      value: 'duplicate'
    },
    {
      label: t("Archive"),
      value: 'archive'
    }
  ];

  const addRow = () => {
    handleRowData(newRow);
    openNewRowPanel();
  };

  const editRow = (id: string) => {
    rows.forEach((row: any) => {
      if (row.id === id) handleRowData(row);
    });

    openNewRowPanel();
  };

  return (
    <Draggable draggableId={`${column.id}`} index={index}>
    {(provided: any) =>
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <Header>
          <Box sx={{ display: 'flex' }}>
            <Title>{column.label}</Title>
            <Box sx={{ marginLeft: 1, borderRadius: '5px', border: '1px solid rgba(0, 0, 0, 0.1)', fontSize: '12px', width: '20px', height: '20px', textAlign: 'center' }}>{tasks.length}</Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
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
                cursor: 'pointer'
              }}
              onClick={addRow}
            />
            <CDropdown id="kanban_action" className="list_action">
              <CDropdownToggle color="secondary">
                <Box
                  component="span"
                  className="svg-color"
                  sx={{
                    width: 24,
                    height: 24,
                    display: 'inline-block',
                    bgcolor: '#16385C',
                    mask: `url(/assets/icons/dots.svg) no-repeat center / contain`,
                    WebkitMask: `url(/assets/icons/dots.svg) no-repeat center / contain`,
                    cursor: 'pointer',
                    marginTop: '-4px',
                    marginLeft: '8px'
                  }}
                />
              </CDropdownToggle>
              <CDropdownMenu>
                {lists.map((list) => (
                  <CDropdownItem href="#" key={list.label}>{list.label}</CDropdownItem>  
                ))}
              </CDropdownMenu>
            </CDropdown>
          </Box>
        </Header>
        <Droppable droppableId={`${column.id}`} type="task">
          {(provided: any) =>
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task: any, index: number) => <KanbanTask kanbanConfig={kanbanConfig} key={task.id} task={task} index={index} editRow={editRow} />)}
            {provided.placeholder}
          </TaskList>
          }
        </Droppable>
      </Container>
    }
    </Draggable>
  );
};

const mapStateToProps = (state: any) => ({
  rows: state.view.rows
});

export default connect(mapStateToProps)(KanbanColumn);
