import React from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';

export default function Result() {
  const router = useRouter();
  const { score } = router.query;

  const getResultMessage = (score: number) => {
    if (score >= 12) {
      return {
        status: '營養狀況良好',
        description: '您的營養狀況良好，請繼續保持健康的生活方式。',
        color: 'success.main',
      };
    } else if (score >= 8) {
      return {
        status: '有營養不良風險',
        description: '您可能有營養不良的風險，建議諮詢營養師或醫師進行評估。',
        color: 'warning.main',
      };
    } else {
      return {
        status: '營養不良',
        description: '您可能有營養不良的情況，建議立即諮詢醫師進行評估和治療。',
        color: 'error.main',
      };
    }
  };

  if (!score) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const result = getResultMessage(Number(score));

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          評估結果
        </Typography>

        <Paper sx={{ p: 4, my: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h2" component="div" sx={{ color: result.color, mb: 2 }}>
              {score} 分
            </Typography>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              {result.status}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              {result.description}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/')}
            >
              返回首頁
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 