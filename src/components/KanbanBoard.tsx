import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import BoardHeader from './BoardHeader';
import KanbanColumn from './KanbanColumn';
import CreateTaskModal from './CreateTaskModal';
import CreateColumnModal from './CreateColumnModal';
import { useBoardData } from '../hooks/useBoardData';
import { apiClient } from '../api/client';
import type { Task, Column } from './types';

export default function KanbanBoard() {
  const { columns, isLoading, fetchColumns } = useBoardData();

  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [columnToEdit, setColumnToEdit] = useState<Column | null>(null);

  if (isLoading) {
    return <Typography sx={{ color: 'white', p: 3 }}>טוען נתונים...</Typography>;
  }

  const handleDeleteColumn = (columnId: string) => {
    if (!window.confirm(' אתה בטוח שברצונך למחוק עמודהו?')) return;
    apiClient.delete(`/columns/${columnId}`).then(() => fetchColumns());
  };

  const handleDeleteTask = (taskId: string) => {
    if (!window.confirm('אתה בטוח למחוק משימה זו')) return;
    apiClient.delete(`/tasks/${taskId}`).then(() => fetchColumns());
  };

  const handleEditColumn = (column: Column) => setColumnToEdit(column);
  const handleEditTask = (task: Task) => setTaskToEdit(task);

 
  const handleMoveTask = (taskId: string, newColumnId: string) => {

    apiClient.patch(`/tasks/${taskId}`, { columnId: newColumnId })
      .then(() => fetchColumns()) //
      .catch((err) => console.error("Error moving task:", err));
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <BoardHeader onOpenCreateColumn={() => setIsColumnModalOpen(true)} />

      <Box sx={{ 
        display: 'flex', 
        gap: 3, 
        padding: 3, 
        flexGrow: 1, 
        backgroundColor: '#2f1ba1',
        overflowX: 'auto', 
        alignItems: 'flex-start' 
      }}>
        {columns.map((column) => (
          <KanbanColumn 
            key={column.id} 
            column={column} 
            onOpenCreateTask={() => setActiveColumnId(column.id)} 
            onDeleteColumn={handleDeleteColumn}
            onDeleteTask={handleDeleteTask}
            onEditColumn={handleEditColumn}
            onEditTask={handleEditTask}
            onMoveTask={handleMoveTask} 
          />
        ))}
      </Box>

      <CreateTaskModal 
        columnId={activeColumnId} 
        taskToEdit={taskToEdit} 
        onClose={() => { setActiveColumnId(null); setTaskToEdit(null); }} 
        onSuccess={fetchColumns} 
      />
      
      <CreateColumnModal 
        open={isColumnModalOpen || !!columnToEdit} 
        columnToEdit={columnToEdit}
        onClose={() => { setIsColumnModalOpen(false); setColumnToEdit(null); }} 
        onSuccess={fetchColumns}
      />

    </Box>
  );
}