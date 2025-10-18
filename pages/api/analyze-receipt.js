import { getReceiptDetail } from "@/lib/utils/gemini";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const { base64Image } = req.body

        if (!base64Image) {
            return res.status(400).json({ error: 'No image provided'}) 
        }

        const analysis = await getReceiptDetail(base64Image)

        if (analysis.error) {
            return res.status(400).json({ error: analysis. error, analysis})
        }

        return res.status(200).json({ success: true, analysis })
    } catch (error) {
        console.error('Error analyzing receipt', error)
        return res.status(500).json({
            error: error.message || 'Failed to analyze receipt'
        })
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}