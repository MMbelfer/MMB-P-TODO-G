import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import BoardHeader from './BoardHeader';
import KanbanColumn from './KanbanColumn';
import CreateTaskModal from './CreateTaskModal';
import CreateColumnModal from './CreateColumnModal';

//ההוק הקסטמי
import { useBoardData } from '../hooks/useBoardData';

export default function KanbanBoard() 
{  const { columns, isLoading } = useBoardData();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

// הAI חושב שצריך תנאי המתנה
  if (isLoading) {
    return <Typography sx={{ color: 'white', p: 3 }}>Loading board data...</Typography>;
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <BoardHeader onOpenCreateColumn={() => setIsColumnModalOpen(true)} />

      <Box sx={{
        display: 'flex',
        gap: 3,
        padding: 3,
        flexGrow: 1,
        backgroundColor: '#2f1ba1',
      }}>
    
        {columns.map((column) => (
          <KanbanColumn 
            key={column.id} 
            column={column} 
            onOpenCreateTask={() => setIsTaskModalOpen(true)} 
          />
        ))}
      </Box>

      <CreateTaskModal open={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} />
      <CreateColumnModal open={isColumnModalOpen} onClose={() => setIsColumnModalOpen(false)} />

    </Box>
  );
}