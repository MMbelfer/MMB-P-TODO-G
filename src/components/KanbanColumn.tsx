import { Box, Typography, Button } from '@mui/material';
import TaskCard from './TaskCard';
import type { Column } from './types';

interface KanbanColumnProps {
  column: Column;
  onOpenCreateTask: () => void;
}

export default function KanbanColumn({ column, onOpenCreateTask }: KanbanColumnProps) {
  return (
    <Box sx={{
      backgroundColor: '#3da038',
      padding: 2,
      borderRadius: 2,
      width: 300,
      minWidth: 300,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {column.title}
      </Typography>

      {/* Map through tasks automatically */}
      <Box sx={{ flexGrow: 1 }}>
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>

      {/* Button opens the modal */}
      <Button onClick={onOpenCreateTask} variant="text" sx={{ marginTop: 1, textTransform: 'none' }}>
        + Add new task
      </Button>
    </Box>
  );
}