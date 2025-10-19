import { generateFinancialReport } from '@/lib/utils/gemini';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { totalSpending, categoryBreakdown } = req.body;

    if (!totalSpending || !categoryBreakdown) {
      return res.status(400).json({ error: 'Missing required data' });
    }

    // Call Gemini AI to generate financial report
    const advice = await generateFinancialReport(totalSpending, categoryBreakdown);

    if (!advice) {
      return res.status(500).json({ error: 'Failed to generate financial advice' });
    }

    return res.status(200).json({ success: true, advice });
  } catch (error) {
    console.error('Error generating financial advice:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate financial advice'
    });
  }
}
