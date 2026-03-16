import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { apiClient } from '../api/client';

// הוספנו את onSuccess למאפיינים שהקומפוננטה יודעת לקבל
interface CreateColumnModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void; 
}

export default function CreateColumnModal({ open, onClose, onSuccess }: CreateColumnModalProps) {
  
  const [columnTitle, setColumnTitle] = useState('');

  const handleSave = () => {
    //create new column
    const newColumn = {
      id: "col-" + Date.now(), 
      title: columnTitle,      
      tasks: []                
    };

    //post to server
    apiClient.post('/columns', newColumn)
      .then(() => {
        setColumnTitle(''); 
        onClose();          
        onSuccess(); // <--- הנה הקסם! במקום לרענן את הדף, אנחנו מבקשים מהלוח לרענן רק את הנתונים שלו
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Column</DialogTitle>
      
      <DialogContent sx={{ mt: 1 }}>
        <TextField 
          label="Column Name" 
          variant="outlined" 
          fullWidth 
          value={columnTitle}
          onChange={(event) => setColumnTitle(event.target.value)}
        />
      </DialogContent>
      
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSave} variant="contained" disableElevation>Save Column</Button>
      </DialogActions>
    </Dialog>
  );
}