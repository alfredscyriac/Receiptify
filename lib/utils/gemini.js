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
    3. **Receipt Date**: The date shown on the receipt (format: YYYY-MM-DD), if no date on receipt the the date of the request (formated: YYYY-MM-DD)
    4. **Category**: Assign the receipt to ONE of the predefined categories based on the merchant and items purchased

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
    "receiptDate": "YYYY-MM-DD",
    "category": "Exact category name from the list above",
    "confidence": "high|medium|low"
    }

    IMPORTANT RULES:
    1. Extract the FINAL total amount (after tax, not subtotal)
    2. Return the amount as a number (e.g., 45.99 not "$45.99" or "45.99 USD")
    3. Extract the receipt date in YYYY-MM-DD format, if no date in receipt then use the current date (e.g., "2024-01-15")
    4. If multiple amounts are shown, choose the final total paid
    5. The category MUST be one of the 10 categories listed above (exact spelling)
    6. Use "high" confidence if the receipt is clear and readable
    7. Use "medium" confidence if some information is unclear but extractable
    8. Use "low" confidence if the receipt is very blurry or damaged
    9. If you cannot read the receipt at all, respond with:
    {
        "error": "Unable to read receipt",
        "merchantName": null,
        "totalAmount": null,
        "receiptDate": null,
        "category": "Miscellaneous",
        "confidence": "low"
    }

    EXAMPLES:

    Receipt from "Chipotle" showing total of $15.47:
    {
    "merchantName": "Chipotle",
    "totalAmount": 15.47,
    "receiptDate": "2025-06-23",
    "category": "Food & Dining",
    "confidence": "high"
    }

    Receipt from "Shell" gas station showing total of $52.30:
    {
    "merchantName": "Shell",
    "totalAmount": 52.30,
    "receiptDate": "2024-10-31",
    "category": "Travel & Transportation",
    "confidence": "high"
    }

    Receipt from "CVS Pharmacy" for prescription medication, total $25.00:
    {
    "merchantName": "CVS Pharmacy",
    "totalAmount": 25.00,
    "receiptDate": "2023-12-01",
    "category": "Health & Medical",
    "confidence": "high"
    }

    Receipt from "LA Fitness" monthly membership, total $49.99:
    {
    "merchantName": "LA Fitness",
    "totalAmount": 49.99,
    "receiptDate": "2025-10-18",
    "category": "Personal Care",
    "confidence": "high"
    }

    Now analyze the provided receipt image and return the JSON response.`;

    try {
        const result = await geminiModel.generateContent([
            RECEIPT_ANALYSIS_PROMPT,
            {
                inlineData: {
                    data: base64image, 
                    mimeType: 'image/jpeg'
                }
            }
        ]);

        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const receiptData = JSON.parse(jsonMatch[0]);
            return receiptData;
        }  

        throw new Error('No JSON found in response')
    } catch(error) {
        console.error('Failed to parse receipt analysis:', error);
        return {
            error: 'Failed to parse response',
            merchantName: null,
            totalAmount: null,
            receiptDate: null,
            category: 'Miscellaneous',
            confidence: 'low'
        };
    }
}

export const generateFinancialReport = async(total_expense, all_expenses) => {
    const FINANCIAL_REPORT_PROMPT = `You are an expert financial advisor. Generate a concise financial report based on this spending data from the last 30 days.

SPENDING DATA:
- Total Spent: $${total_expense.toFixed(2)}
- Category Breakdown: ${JSON.stringify(all_expenses, null, 2)}

YOUR REPORT SHOULD INCLUDE:

1. SPENDING OVERVIEW (2-3 sentences)
   - Brief assessment of overall spending
   - Identify top spending category
   - Key observation

2. CATEGORY INSIGHTS
   - Highlight the top 2-3 categories
   - Mention any concerning trends or patterns

3. ACTIONABLE SAVINGS TIPS (3-4 tips)
   - Provide SPECIFIC, PRACTICAL advice based on their actual spending
   - Focus on categories where they spent the most
   - Include estimated potential savings
   - Make each tip immediately actionable

TONE:
- Professional but friendly
- Constructive and supportive
- Use specific numbers from their data
- Be concise (200-400 words total)

FORMAT:
- Use simple markdown formatting
- Use **bold** for key numbers
- Use bullet points for lists
- NO emojis

EXAMPLE:

**Spending Overview**
You spent $842.50 in the last 30 days. Your highest expense category was Food & Dining at $325, representing 39% of your total spending. Overall, your spending shows room for optimization in daily expenses.

**Category Breakdown**
- **Food & Dining:** $325.00 (39%)
- **Shopping & Retail:** $280.00 (33%)
- **Transportation:** $145.50 (17%)

**Savings Opportunities**

1. **Reduce Dining Expenses:** You spent $325 on food and dining. Meal prepping 2-3 lunches per week instead of eating out could save approximately $80-100 per month.

2. **Review Shopping Habits:** Your retail spending was $280. Before making purchases, wait 24 hours to determine if items are needs or wants. This could reduce impulse buying by 20-30%.

3. **Optimize Transportation:** At $145.50 for transportation, consider carpooling twice a week or combining errands into single trips to save $30-40 monthly on fuel.

Now generate the financial report based on the provided spending data.`;

    try {
        const result = await geminiModel.generateContent(FINANCIAL_REPORT_PROMPT);
        const response = await result.response;
        const text = response.text();

        // Return the text directly (it's already markdown formatted)
        return text;
    } catch(error) {
        console.error('Failed to generate financial report:', error);
        return null;
    }
}
    