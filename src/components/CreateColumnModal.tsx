import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface CreateColumnModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateColumnModal({ open, onClose }: CreateColumnModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Column</DialogTitle>
      
      <DialogContent sx={{ mt: 1 }}>
        <TextField label="Column Name" variant="outlined" fullWidth />
      </DialogContent>
      
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={onClose} variant="contained" disableElevation>Save Column</Button>
      </DialogActions>
    </Dialog>
  );
}