import { useState } from 'react'; // <-- מחקנו את useEffect!
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { apiClient } from '../api/client';
import type { Task } from './types';

interface CreateTaskModalProps {
  columnId: string | null;
  taskToEdit?: Task | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateTaskModal({ columnId, taskToEdit, onClose, onSuccess }: CreateTaskModalProps) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  // שומרים את "היסטוריית העבר" כדי שנדע מתי משהו השתנה
  const [prevTaskToEdit, setPrevTaskToEdit] = useState<Task | null | undefined>(undefined);
  const [prevColumnId, setPrevColumnId] = useState<string | null | undefined>(undefined);

  // הדרך התקנית והמומלצת של React לעדכן סטייט בלי useEffect:
  // אם לחצנו על משימה אחרת, או פתחנו עמודה חדשה - תאפס מיד את השדות!
  if (taskToEdit !== prevTaskToEdit || columnId !== prevColumnId) {
    setPrevTaskToEdit(taskToEdit);
    setPrevColumnId(columnId);
    setTaskTitle(taskToEdit ? taskToEdit.title : '');
    setTaskDesc(taskToEdit ? taskToEdit.description : '');
  }

  const handleSave = () => {
    if (taskToEdit) {
      apiClient.patch(`/tasks/${taskToEdit.id}`, { title: taskTitle, description: taskDesc })
        .then(() => { onClose(); onSuccess(); });
    } else if (columnId) {
      const newTask = { id: "task-" + Date.now(), title: taskTitle, description: taskDesc, columnId: columnId };
      apiClient.post('/tasks', newTask)
        .then(() => { onClose(); onSuccess(); });
    }
  };

  const isOpen = !!columnId || !!taskToEdit;

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{taskToEdit ? 'ערוך משימה' : 'צור משימה חדשה'}</DialogTitle>
      
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField label="כותרת המשימה" variant="outlined" fullWidth value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
        <TextField label="תיאור" variant="outlined" multiline rows={3} fullWidth value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} />
      </DialogContent>
      
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose} color="inherit">ביטול</Button>
        <Button onClick={handleSave} variant="contained" disableElevation>
          {taskToEdit ? 'עדכן משימה' : 'שמור משימה'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}