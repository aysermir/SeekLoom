// Flashcard.tsx

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface FlashcardProps {
  title: string;
  description: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ title, description }) => {
  return (
    <Card sx={{ minWidth: 275, margin: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Flashcard;
