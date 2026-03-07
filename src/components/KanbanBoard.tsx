import { useState } from 'react';
import { Box } from '@mui/material';
import BoardHeader from './BoardHeader';
import KanbanColumn from './KanbanColumn';
import NewTaskDialog from './NewTaskDialog';
import NewColumnDialog from './NewColumnDialog';
import type { Column } from './types';

// Dummy data using our types, just to see the design
const MOCK_COLUMNS: Column[] = [
  {
    id: "c1",
    title: "To Do",
    tasks: [
      { id: "t1", title: "Setup Database", description: "Create TODO li" },
      { id: "t2", title: "Design UI", description: "Create Figma mockups" }
    ]
  },
  {
    id: "c2",
    title: "In Progress",
    tasks: [
      { id: "t3", title: "Learn React", description: "Understand components" }
    ]
  }
];

export default function KanbanBoard() {
  // UI State for opening/closing dialogs
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isColumnDialogOpen, setIsColumnDialogOpen] = useState(false);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Header */}
      <BoardHeader onOpenAddColumn={() => setIsColumnDialogOpen(true)} />

      {/* Board Columns Area */}
      <Box sx={{
        display: 'flex',
        gap: 3,
        padding: 3,
        flexGrow: 1,
        backgroundColor: '#ffffff',
        overflowX: 'auto'
      }}>
        {MOCK_COLUMNS.map((column) => (
          <KanbanColumn 
            key={column.id} 
            column={column} 
            onOpenAddTask={() => setIsTaskDialogOpen(true)} 
          />
        ))}
      </Box>

      {/* Dialog Components (Hidden until their state is true) */}
      <NewTaskDialog 
        open={isTaskDialogOpen} 
        onClose={() => setIsTaskDialogOpen(false)} 
      />
      
      <NewColumnDialog 
        open={isColumnDialogOpen} 
        onClose={() => setIsColumnDialogOpen(false)} 
      />

    </Box>
  );
}
