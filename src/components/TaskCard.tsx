import { Card, CardContent, Typography, Box } from '@mui/material';
import type { Task } from './types';

// הגדרנו אילו נתונים ופונקציות הכרטיסייה צריכה לקבל מבחוץ
interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <Card 
      draggable // מילת קסם! אומרת לדפדפן שאפשר לגרור את האלמנט הזה
      onDragStart={(e) => e.dataTransfer.setData('taskId', task.id)} // שומר בזיכרון את ה-ID של המשימה שנגררת כרגע
      sx={{ 
        marginBottom: 2, 
        cursor: 'grab', // משנה את סמן העכבר ליד שאוחזת
        '&:active': { cursor: 'grabbing' }
      }}
    >
      <CardContent sx={{ paddingBottom: '16px !important' }}>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {task.description}
            </Typography>
          </Box>

          {/* אזור הכפתורים הקטנים */}
          <Box sx={{ display: 'flex', gap: 1, fontSize: '1.2rem' }}>
            <Box component="span" sx={{ cursor: 'pointer' }} onClick={() => onEdit && onEdit(task)} title="ערוך משימה">
              ✏️
            </Box>
            <Box component="span" sx={{ cursor: 'pointer' }} onClick={() => onDelete && onDelete(task.id)} title="מחק משימה">
              🗑️
            </Box>
          </Box>

        </Box>

      </CardContent>
    </Card>
  );
}