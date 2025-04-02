import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
  success: boolean;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: '只接受 POST 請求', success: false });
  }

  try {
    const { answers, score, submittedAt } = req.body;

    // TODO: 在這裡添加資料庫連接和資料儲存邏輯
    console.log('收到問卷提交：', { answers, score, submittedAt });

    return res.status(200).json({ 
      message: '問卷提交成功', 
      success: true 
    });
  } catch (error) {
    console.error('處理問卷提交時發生錯誤：', error);
    return res.status(500).json({ 
      message: '處理問卷提交時發生錯誤', 
      success: false 
    });
  }
} 