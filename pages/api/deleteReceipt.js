import { supabaseAdmin } from "@/lib/utils/supabaseAdmin";

export default async function deleteReceipts(req, res) {
    const { userId, receiptId } = req.body;

    const { data: receipt, error: fetchError } = await supabaseAdmin
        .from("receipts")
        .select("*")
        .eq("user_id", userId)
        .eq("id", receiptId)

    if (fetchError) {
        return res.status(500).json({ error: fetchError })
    }
    else if (!receipt || receipt.length === 0) {
        return res.status(403).json({ message: "Not allowed" })
    }

    const { data, error } = await supabaseAdmin
        .from("receipts")
        .delete()
        .eq("id", receiptId)
    
    if (error) {
        return res.status(500).json({ error })
    }
    return res.status(200).json({ data })
} 