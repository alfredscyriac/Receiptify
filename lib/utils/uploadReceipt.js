import createClient from "./supabaseClient";

export const uploadReceipt = async(file, userId) => {
    try {
        const supabase = createClient()

        console.log('Converting image to base64')
        const base64 = await fileToBase64(file)

        console.log('Analyzing receipt with AI')
        const response = await fetch('/api/analyze-receipt', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({ base64Image: base64 }),
        })

        const analysisResult = await response.json()

        if (!response.ok || !analysisResult.success) {
            throw new Error(analysisResult.error || 'Failed to analyze receipt')
        }

        const analysis = analysisResult.analysis

        // Upload image to supabase storage
        console.log('Uploading image to storage')
        const fileExt = file.name.split('.').pop()
        const fileName = `${userId}/${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage.from('receipts').upload(fileName, file, {
            cacheControl: '3600', 
            upsert: false
        })

        if (uploadError) {
            throw uploadError
        }

        // get public url for receipt images
        const { data: { publicUrl } } = supabase.storage.from('receipts').getPublicUrl(fileName)

        // save to database 
        console.log('Saving to database...')
        const { data: receiptData, error: dbError } = await supabase.from('receipts').insert({
            user_id: userId, 
            image_url: publicUrl, 
            store_name: analysis.merchantName,
            total_amount: analysis.totalAmount, 
            category: analysis.category, 
            receipt_date: analysis.receiptDate,
        }).select().single()

        if (dbError) {
            throw dbError
        }

        return {
            success: true,  
            receipt: receiptData, 
            analysis
        }
    } catch (error) {
        console.error('Error uploading receipt:', error)
        return {
            success: false, 
            error: error.message || 'Unknown error occured'
        }
    }
}

const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const base64 = reader.result.split(',')[1]
            resolve(base64)
        }
        reader.onerror = (error) => reject(error) 
    })
}