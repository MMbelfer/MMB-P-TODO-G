import { Box, Typography } from '@mui/material';
import TaskCard from './TaskCard';
import type { Column, Task } from './types';

interface KanbanColumnProps {
  column: Column;
  onOpenCreateTask: () => void;
  onEditTask?: (task: Task) => void;
  onDeleteTask?: (taskId: string) => void;
  onEditColumn?: (column: Column) => void;
  onDeleteColumn?: (columnId: string) => void;
  onMoveTask?: (taskId: string, newColumnId: string) => void; // <--- הוספנו פונקציה להזזת משימה!
}

export default function KanbanColumn({ 
  column, 
  onOpenCreateTask, 
  onEditTask, 
  onDeleteTask,
  onEditColumn,
  onDeleteColumn,
  onMoveTask
}: KanbanColumnProps) {
  
  return (
    <Box 
      // === קסם הגרירה מתרחש פה ===
      onDragOver={(e) => e.preventDefault()} // חובה! זה אומר לדפדפן: "מותר להפיל עליי דברים"
      onDrop={(e) => {
        const taskId = e.dataTransfer.getData('taskId'); // שולפים את ה-ID של המשימה שנגררה
        if (taskId && onMoveTask) {
          onMoveTask(taskId, column.id); // אומרים ללוח: "המשימה הזו נחתה בעמודה שלי!"
        }
      }}
      // ============================
      sx={{
        backgroundColor: '#ebecf0', 
        padding: 2,
        borderRadius: 2,
        width: 300,
        minWidth: 300,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%' 
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#172b4d' }}>
          {column.title}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, fontSize: '1.2rem' }}>
          <Box component="span" sx={{ cursor: 'pointer' }} onClick={onOpenCreateTask} title="הוסף משימה">➕</Box>
          <Box component="span" sx={{ cursor: 'pointer' }} onClick={() => onEditColumn && onEditColumn(column)} title="ערוך עמודה">✏️</Box>
          <Box component="span" sx={{ cursor: 'pointer' }} onClick={() => onDeleteColumn && onDeleteColumn(column.id)} title="מחק עמודה">🗑️</Box>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        {column.tasks?.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </Box>
    </Box>
  );
}