import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

interface NewColumnDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function NewColumnDialog({ open, onClose }: NewColumnDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Create New Column</DialogTitle>
      
      <DialogContent sx={{ marginTop: 1 }}>
        <TextField label="Column Title" variant="outlined" fullWidth />
      </DialogContent>
      
      <DialogActions sx={{ padding: 1 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={onClose} variant="contained" disableElevation>Create Column</Button>
      </DialogActions>
    </Dialog>
  );
}