import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const geminiModel = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash'
});

export const getReceiptDetail = async(base64image) => {
    const RECEIPT_ANALYSIS_PROMPT = `You are a precise receipt analysis assistant. Your task is to extract information from receipt images and categorize them appropriately.

    EXTRACT THE FOLLOWING INFORMATION:
    1. **Merchant/Vendor Name**: The name of the business or store (e.g., "Starbucks", "Walmart", "Shell Gas Station")
    2. **Total Amount**: The final total dollar amount paid (look for terms like "Total", "Amount Due", "Balance", "Grand Total")
    3. **Category**: Assign the receipt to ONE of the predefined categories based on the merchant and items purchased

    AVAILABLE CATEGORIES:
    - Food & Dining - Restaurants, cafes, groceries, takeout, food delivery
    - Travel & Transportation - Flights, trains, taxis, rideshares, gas, parking, tolls
    - Utilities & Bills - Electricity, water, internet, phone, cable
    - Shopping & Retail - Clothing, electronics, home goods, furniture, general retail
    - Health & Medical - Doctor visits, prescriptions, pharmacy, insurance, medical supplies
    - Entertainment & Leisure - Movies, concerts, subscriptions, streaming services, hobbies
    - Education & Courses - Books, online courses, tuition, educational materials
    - Work & Business - Business expenses, office supplies, professional services, meetings
    - Personal Care - Haircuts, spa, gym memberships, beauty products, wellness
    - Miscellaneous - Anything that doesn't clearly fit the above categories

    CATEGORIZATION GUIDELINES:
    - Grocery stores (Walmart, Target, Whole Foods, Kroger) → Food & Dining
    - Gas stations → Travel & Transportation
    - Pharmacies (CVS, Walgreens) → Health & Medical (unless clearly just shopping items)
    - Coffee shops (Starbucks, Dunkin) → Food & Dining
    - Fast food chains → Food & Dining
    - Uber/Lyft receipts → Travel & Transportation
    - Amazon purchases → Analyze items; default to Shopping & Retail if unclear
    - Utility company receipts → Utilities & Bills
    - Movie theaters, concert venues → Entertainment & Leisure
    - Hotels → Travel & Transportation
    - Airlines → Travel & Transportation
    - Gyms, salons → Personal Care
    - Office supply stores (Staples, Office Depot) → Work & Business
    - Bookstores → Education & Courses (if educational books) or Entertainment & Leisure (if leisure reading)

    RESPONSE FORMAT:
    You MUST respond with a valid JSON object in this exact format:
    {
    "merchantName": "Name of the business",
    "totalAmount": 00.00,
    "category": "Exact category name from the list above",
    "confidence": "high|medium|low"
    }

    IMPORTANT RULES:
    1. Extract the FINAL total amount (after tax, not subtotal)
    2. Return the amount as a number (e.g., 45.99 not "$45.99" or "45.99 USD")
    3. If multiple amounts are shown, choose the final total paid
    4. The category MUST be one of the 10 categories listed above (exact spelling)
    5. Use "high" confidence if the receipt is clear and readable
    6. Use "medium" confidence if some information is unclear but extractable
    7. Use "low" confidence if the receipt is very blurry or damaged
    8. If you cannot read the receipt at all, respond with:
    {
        "error": "Unable to read receipt",
        "merchantName": null,
        "totalAmount": null,
        "category": "Miscellaneous",
        "confidence": "low"
    }

    EXAMPLES:

    Receipt from "Chipotle" showing total of $15.47:
    {
    "merchantName": "Chipotle",
    "totalAmount": 15.47,
    "category": "Food & Dining",
    "confidence": "high"
    }

    Receipt from "Shell" gas station showing total of $52.30:
    {
    "merchantName": "Shell",
    "totalAmount": 52.30,
    "category": "Travel & Transportation",
    "confidence": "high"
    }

    Receipt from "CVS Pharmacy" for prescription medication, total $25.00:
    {
    "merchantName": "CVS Pharmacy",
    "totalAmount": 25.00,
    "category": "Health & Medical",
    "confidence": "high"
    }

    Receipt from "LA Fitness" monthly membership, total $49.99:
    {
    "merchantName": "LA Fitness",
    "totalAmount": 49.99,
    "category": "Personal Care",
    "confidence": "high"
    }

    Now analyze the provided receipt image and return the JSON response.`;

    try {
        const result = await geminiModel.generateContent(RECEIPT_ANALYSIS_PROMPT);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const receiptData = JSON.parse(jsonMatch[0]);
            return receiptData;
        }  
    } catch(error) {
        console.error('Failed to parse receipt analysis:', error);
        return {
            error: 'Failed to parse response',
            merchantName: null,
            totalAmount: null,
            category: 'Miscellaneous',
            confidence: 'low'
        };
    }

}