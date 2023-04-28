import { Box } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { styled } from '@mui/material/styles';
import ProgressBar from '../../components/progress-bar/ProgressBar';

type Props = {
  task: any;
  index: number;
  editRow: (id: string) => void;
};

const Container = styled('div')(({ theme }) => ({
  boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  padding: '16px',
  marginBottom: '16px',
  backgroundColor: 'white'
}));

const Label = styled('div')(({ theme }) => ({
  fontSize: '12px',
  textTransform: 'uppercase',
  margin: '8px 0 4px 0'
}));

const progressValue = (phase: string) => phase === 'In progress' ? 50 : phase === 'Testing' ? 70 : phase === 'Done' ? 100 : 0;

const KanbanTask = (props: Props) => {
  const { task, index, editRow } = props;

  const getColorByImportance = (importance: string) => {
    return importance === 'Very important' ? '#FFB7B7' : '#FFEBB7';
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: any) =>
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{ border: `1px solid ${getColorByImportance(task.importance)}` }}
          onClick={() => { editRow(task.id); }}
        >
          <Box>
            <Label>Task Name</Label>
            <Box>{task.task_name}</Box>
          </Box>
          <Box>
            <Label>User(s)</Label>
            <img
              alt="avatar"
              height={24}
              src='/assets/images/avatars/avatar_1.jpg'
              loading="lazy"
              style={{ borderRadius: '50%' }}
              className="edit_row"
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <Box sx={{ width: '50%' }}>
              <Label>Progress</Label>
              <Box sx={{ marginTop: 1 }}>
                <ProgressBar value={progressValue(task.phase)} />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Label>Deadline</Label>
              <Box>{task.date.split(' ')[0]}</Box>
            </Box>
          </Box>
        </Container>
      }
    </Draggable>
  );
};

export default KanbanTask;
