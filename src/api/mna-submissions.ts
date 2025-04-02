import { NextApiRequest, NextApiResponse } from 'next';

interface MNASubmission {
  answers: Record<string, number>;
  score: number;
  submittedAt: Date;
}

// 這裡可以替換成實際的資料庫連接
const submissions: MNASubmission[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只允許POST請求' });
  }

  try {
    const submission: MNASubmission = req.body;
    
    // 在實際應用中，這裡應該將數據存儲到資料庫
    submissions.push(submission);
    
    // 返回成功響應
    res.status(200).json({ 
      message: '提交成功',
      submissionId: submissions.length
    });
  } catch (error) {
    console.error('提交處理錯誤:', error);
    res.status(500).json({ message: '服務器錯誤' });
  }
} 