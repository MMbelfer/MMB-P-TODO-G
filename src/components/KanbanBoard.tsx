import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import BoardHeader from './BoardHeader';
import KanbanColumn from './KanbanColumn';
import CreateTaskModal from './CreateTaskModal';
import CreateColumnModal from './CreateColumnModal';
import { useBoardData } from '../hooks/useBoardData';

export default function KanbanBoard() {
  const { columns, isLoading, fetchColumns } = useBoardData();

  // במקום לשמור "האם המודאל פתוח (כן/לא)", נשמור את ה-ID של העמודה.
  // אם הערך הוא null - המודאל סגור. אם יש ID - המודאל פתוח עבור העמודה הזו.
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);

  if (isLoading) {
    return <Typography sx={{ color: 'white', p: 3 }}>Loading board data...</Typography>;
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <BoardHeader onOpenCreateColumn={() => setIsColumnModalOpen(true)} />

      <Box sx={{ display: 'flex', gap: 3, padding: 3, flexGrow: 1, backgroundColor: '#2f1ba1' }}>
        {columns.map((column) => (
          <KanbanColumn 
            key={column.id} 
            column={column} 
            // כעת כשאנחנו לוחצים על הפלוס בעמודה, אנחנו שומרים איזה עמודה זו!
            onOpenCreateTask={() => setActiveColumnId(column.id)} 
          />
        ))}
      </Box>

      <CreateTaskModal 
        columnId={activeColumnId} 
        onClose={() => setActiveColumnId(null)} 
        onSuccess={fetchColumns} 
      />
      <CreateColumnModal 
        open={isColumnModalOpen} 
        onClose={() => setIsColumnModalOpen(false)} 
        onSuccess={fetchColumns}
      />

    </Box>
  );
}