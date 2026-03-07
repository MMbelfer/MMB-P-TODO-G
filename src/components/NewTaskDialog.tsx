import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface NewTaskDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function NewTaskDialog({ open, onClose }: NewTaskDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Task</DialogTitle>
      
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1 }}>
        <TextField label="Task Title" variant="outlined" fullWidth />
        <TextField label="Description" variant="outlined" multiline rows={3} fullWidth />
      </DialogContent>
      
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={onClose} variant="contained" disableElevation>Create Task</Button>
      </DialogActions>
    </Dialog>
  );
}