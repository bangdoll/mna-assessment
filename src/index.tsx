import React from 'react';
import { MNAForm } from './MNAForm';
import { Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Container>
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          迷你營養評估（MNA）
        </Typography>
        <Typography variant="subtitle1" gutterBottom align="center" sx={{ mb: 4 }}>
          請依照您的實際情況填寫以下問題
        </Typography>
        <MNAForm />
      </Box>
    </Container>
  );
} 