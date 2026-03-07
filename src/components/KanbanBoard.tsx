import { useState } from 'react';
import { Box } from '@mui/material';
import BoardHeader from './BoardHeader';
import KanbanColumn from './KanbanColumn';
import CreateTaskModal from './CreateTaskModal';
import CreateColumnModal from './CreateColumnModal';
import { type Column } from './types';

// Real data structure based on types.ts
const INITIAL_DATA: Column[] = [
  {
    id: 'c1',
    title: 'To Do',
    tasks: [
      { id: 't1', title: 'Learn React', description: 'Understand components and props' },
      { id: 't2', title: 'Learn Types', description: 'Use interfaces for data' }
    ]
  },
  {
    id: 'c2',
    title: 'Done',
    tasks: []
  }
];

export default function KanbanBoard() {
  // State for opening/closing modals (UI only)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header with trigger for Column Modal */}
      <BoardHeader onOpenCreateColumn={() => setIsColumnModalOpen(true)} />

      {/* Columns Area */}
      <Box sx={{
        display: 'flex',
        gap: 3,
        padding: 3,
        flexGrow: 1,
        backgroundColor: '#2f1ba1',
      }}>
        {INITIAL_DATA.map((column) => (
          <KanbanColumn 
            key={column.id} 
            column={column} 
            onOpenCreateTask={() => setIsTaskModalOpen(true)} 
          />
        ))}
      </Box>

      {/* Hidden Modals (Popups) */}
      <CreateTaskModal 
        open={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
      />
      
      <CreateColumnModal 
        open={isColumnModalOpen} 
        onClose={() => setIsColumnModalOpen(false)} 
      />

    </Box>
  );
}