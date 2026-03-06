import { Card, CardContent, Typography } from '@mui/material';

export default function TaskCard(props: { title: string, description: string }) {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {props.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}