


import { Box } from '@mui/material';
import BoardHeader from './BoardHeader';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';

export default function KanbanBoard() {
  return (
    <Box sx={{ 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      flexDirection: 'column', 
      overflow: 'hidden' 
    }}>
      
      <BoardHeader />

      <Box sx={{
        display: 'flex',
        gap: 3,
        padding: 3,
        flexGrow: 1,
        backgroundColor: '#ffffff',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}>

        <KanbanColumn title="To Do">
          <TaskCard title="Learn React" description="Understand components and props" />
          <TaskCard title="Learn MUI" description="Use Box, Card, and Typography" />
        </KanbanColumn>

        <KanbanColumn title="In Progress">
          <TaskCard title="Build Static Layout" description="Write simple code without logic" />
        </KanbanColumn>

        <KanbanColumn title="Done">
          <TaskCard title="Setup Project" description="Create Vite React TS app" />
        </KanbanColumn>

      </Box>
    </Box>
  );
}
