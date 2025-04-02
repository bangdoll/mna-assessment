import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Container,
  Paper,
} from '@mui/material';

interface Question {
  id: string;
  text: string;
  options: Array<{
    value: number;
    label: string;
  }>;
}

const screeningQuestions: Question[] = [
  {
    id: 'A',
    text: '過去三個月內，食慾不振、消化問題或吞嚥困難而導致食物攝取量減少？',
    options: [
      { value: 0, label: '食慾嚴重減少' },
      { value: 1, label: '食慾中度減少' },
      { value: 2, label: '沒有食慾減少' },
    ],
  },
  {
    id: 'B',
    text: '過去三個月內，體重減輕情況？',
    options: [
      { value: 0, label: '體重減輕超過3公斤' },
      { value: 1, label: '不知道' },
      { value: 2, label: '體重減輕1-3公斤' },
      { value: 3, label: '沒有體重減輕' },
    ],
  },
  {
    id: 'C',
    text: '活動能力？',
    options: [
      { value: 0, label: '臥床或坐輪椅' },
      { value: 1, label: '可以下床/離開輪椅，但不能外出' },
      { value: 2, label: '可以外出' },
    ],
  },
];

export const MNAForm: React.FC = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [activeStep, setActiveStep] = useState(0);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    try {
      const response = await fetch('/api/mna-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers,
          score,
          submittedAt: new Date(),
        }),
      });
      
      if (response.ok) {
        router.push(`/result?score=${score}`);
      } else {
        throw new Error('提交失敗');
      }
    } catch (error) {
      alert('提交時發生錯誤，請稍後再試');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          迷你營養評估（MNA）問卷
        </Typography>
        
        <Paper sx={{ p: 3, my: 3 }}>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {screeningQuestions.map((_, index) => (
              <Step key={index}>
                <StepLabel>第 {index + 1} 題</StepLabel>
              </Step>
            ))}
          </Stepper>

          {screeningQuestions.map((question, index) => (
            <Box key={question.id} sx={{ display: activeStep === index ? 'block' : 'none' }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <Typography variant="h6">
                    {question.text}
                  </Typography>
                </FormLabel>
                <RadioGroup
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, Number(e.target.value))}
                >
                  {question.options.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                {index > 0 && (
                  <Button onClick={() => setActiveStep(prev => prev - 1)}>
                    上一題
                  </Button>
                )}
                {index < screeningQuestions.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={() => setActiveStep(prev => prev + 1)}
                    disabled={!answers[question.id]}
                  >
                    下一題
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length !== screeningQuestions.length}
                  >
                    提交問卷
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Paper>
      </Box>
    </Container>
  );
}; 