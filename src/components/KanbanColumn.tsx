import { Box, Typography, Button } from '@mui/material';

export default function KanbanColumn(props: { title: string, children: React.ReactNode }) {
  return (
    <Box sx={{
      backgroundColor: '#122e65',
      padding: 2,
      borderRadius: 1 ,
      width: 300,
      minWidth: 300,
      display: 'flex',
      flexDirection: 'column'
    }}>
       {/* Column Title  */}
      <Typography variant="h6" sx={{ marginBottom: 2 }}color='rgb(17, 151, 73)' >
        {props.title}
      </Typography>

      {/* Cards go here */}
      <Box sx={{ flexGrow: 1 }}>
        {props.children}
      </Box>

      {/* Add Button */}
      <Button variant="text" sx={{ marginTop: 1, color: '#c51b1b' }}>
        -- Add new task --
      </Button>
    </Box>
  );
}