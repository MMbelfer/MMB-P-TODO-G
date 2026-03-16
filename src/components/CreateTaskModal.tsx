import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { apiClient } from '../api/client';

interface CreateTaskModalProps {
  columnId: string | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateTaskModal({ columnId, onClose, onSuccess }: CreateTaskModalProps) {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');

  const handleSave = () => {
    // אם אין עמודה פעילה, אין לנו לאן לשייך את המשימה
    if (!columnId) return;

    const newTask = {
      id: "task-" + Date.now(),
      title: taskTitle,
      description: taskDesc,
      columnId: columnId // שיוך המשימה לעמודה הספציפית
    };

    // שליחת המשימה לשרת
    apiClient.post('/tasks', newTask)
      .then(() => {
        setTaskTitle('');
        setTaskDesc('');
        onClose();
        onSuccess(); // קריאה לרענון השקט של הנתונים מהשרת
      })
      .catch((error) => console.error("Error saving task:", error));
  };

  // המודאל פתוח רק אם יש columnId (כלומר הוא לא null)
  return (
    <Dialog open={!!columnId} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Task</DialogTitle>
      
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField 
          label="Task Title" 
          variant="outlined" 
          fullWidth 
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <TextField 
          label="Description" 
          variant="outlined" 
          multiline 
          rows={3} 
          fullWidth 
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
        />
      </DialogContent>
      
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSave} variant="contained" disableElevation>Save Task</Button>
      </DialogActions>
    </Dialog>
  );
}