import { Box, Typography, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface BoardHeaderProps {
  onOpenAddColumn: () => void;
}

export default function BoardHeader({ onOpenAddColumn }: BoardHeaderProps) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 2,
      backgroundColor: '#f5f540',
      borderBottom: '1px solid #4b2727',
    }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
       The Git UglyDo
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField variant="outlined" size="small" placeholder="Search..." />
        <Button variant="contained" disableElevation startIcon={<AddIcon />} onClick={onOpenAddColumn}>
          Create Column
        </Button>
      </Box>
    </Box>
  );
}