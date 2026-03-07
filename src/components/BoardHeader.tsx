import { Box, Typography, TextField, Button } from '@mui/material';

interface BoardHeaderProps {
  onOpenCreateColumn: () => void;
}

export default function BoardHeader({ onOpenCreateColumn }: BoardHeaderProps) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 2,
      backgroundColor: '#e98f8f',
      borderBottom: '1px solid #07050c'
    }}>
      <Typography variant="h5">
        My Git UglyDo
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField variant="outlined" size="small" placeholder="Search..." />
        <Button variant="contained" onClick={onOpenCreateColumn} disableElevation>
          Create Column
        </Button>
      </Box>
    </Box>
  );
}