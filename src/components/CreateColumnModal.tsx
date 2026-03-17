import { useState } from 'react'; // <-- מחקנו את useEffect!
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { apiClient } from '../api/client';
import type { Column } from './types';

interface CreateColumnModalProps {
  open: boolean;
  columnToEdit?: Column | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateColumnModal({ open, columnToEdit, onClose, onSuccess }: CreateColumnModalProps) {
  
  const [columnTitle, setColumnTitle] = useState('');

  // שומרים את היסטוריית העבר
  const [prevColToEdit, setPrevColToEdit] = useState<Column | null | undefined>(undefined);
  const [prevOpen, setPrevOpen] = useState<boolean | undefined>(undefined);

  // בודקים שינויים בזמן אמת (בלי useEffect)
  if (columnToEdit !== prevColToEdit || open !== prevOpen) {
    setPrevColToEdit(columnToEdit);
    setPrevOpen(open);
    setColumnTitle(columnToEdit ? columnToEdit.title : '');
  }

  const handleSave = () => {
    if (columnToEdit) {
      apiClient.patch(`/columns/${columnToEdit.id}`, { title: columnTitle })
        .then(() => { onClose(); onSuccess(); });
    } else {
      const newColumn = { id: "col-" + Date.now(), title: columnTitle };
      apiClient.post('/columns', newColumn)
        .then(() => { onClose(); onSuccess(); });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{columnToEdit ? 'ערוך שם עמודה' : 'צור עמודה חדשה'}</DialogTitle>
      
      <DialogContent sx={{ mt: 1 }}>
        <TextField label="שם העמודה" variant="outlined" fullWidth value={columnTitle} onChange={(event) => setColumnTitle(event.target.value)} />
      </DialogContent>
      
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose} color="inherit">ביטול</Button>
        <Button onClick={handleSave} variant="contained" disableElevation>
          {columnToEdit ? 'עדכן עמודה' : 'שמור עמודה'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}