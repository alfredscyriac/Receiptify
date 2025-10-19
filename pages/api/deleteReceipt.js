import createAdminClient from "@/lib/utils/supabaseAdmin";

export default async function deleteReceipts(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    const supabase = createAdminClient(req, res)
    const { userId, receiptId } = req.body || {}

    if (!userId || !receiptId) {
        return res.status(400).json({ error: 'Missing userId or receiptId' })
    }

    // verify the receipt belongs to the user
    const { data: receipt, error: fetchError } = await supabase
        .from("receipts")
        .select("*")
        .eq("user_id", userId)
        .eq("id", receiptId)

    if (fetchError) {
        return res.status(500).json({ error: fetchError })
    }
    if (!receipt || receipt.length === 0) {
        return res.status(403).json({ message: "Not allowed" })
    }

    // delete using the same server-side client
    const { data, error } = await supabase
        .from("receipts")
        .delete()
        .eq("id", receiptId) 

    if (error) {
        return res.status(500).json({ error })
    }
    return res.status(200).json({ data })
}