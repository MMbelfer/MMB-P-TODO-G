import { Box, Typography, TextField, Button } from '@mui/material';

export default function BoardHeader() {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 2,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #cccccc'
    }}>
      <Typography variant="h5">
        To-do Board
      </Typography>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField variant="outlined" size="small" placeholder="Search..." />
        <Button variant="contained">
          Create Column
        </Button>
      </Box>
    </Box>
  );
}