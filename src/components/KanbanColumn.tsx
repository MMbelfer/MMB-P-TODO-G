import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { TaskCard } from './TaskCard';
import type { Column } from './types';

interface KanbanColumnProps {
  column: Column;
  onOpenAddTask: () => void;
}

export default function KanbanColumn({ column, onOpenAddTask }: KanbanColumnProps) {
  return (
    <Box sx={{
      backgroundColor: '#f4f5f7',
      padding: 2,
      borderRadius: 2,
      width: 300,
      minWidth: 300,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Column Header */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        {column.title} ({column.tasks.length})
      </Typography>

      {/* Render Tasks dynamically */}
      <Box sx={{ flexGrow: 1 }}>
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>

      {/* Open Dialog Button */}
      <Button 
        onClick={onOpenAddTask} 
        startIcon={<AddIcon />} 
        sx={{ marginTop: 1, textTransform: 'none', justifyContent: 'flex-start' }}
      >
        Add new task
      </Button>
    </Box>
  );
}