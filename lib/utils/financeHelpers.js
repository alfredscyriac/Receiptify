import createClient from "./supabaseClient";

// Get receipts from the last 30 days
export const getLast30DaysReceipts = async () => {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    console.error(userError);
    return { receipts: [], error: 'Not authenticated' };
  }

  // Get all user's receipts first
  const { data: allReceipts, error } = await supabase
    .from('receipts')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching receipts:', error);
    return { receipts: [], error: error.message };
  }

  console.log('Total receipts:', allReceipts?.length || 0);

  // If user has receipts, filter by last 30 days
  if (!allReceipts || allReceipts.length === 0) {
    return { receipts: [], error: null };
  }

  // Filter receipts created in the last 30 days
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(now.getDate() - 30);

  console.log('Current date:', now.toISOString());
  console.log('30 days ago:', thirtyDaysAgo.toISOString());

  const receipts = allReceipts.filter(receipt => {
    if (!receipt.created_at) {
      return false;
    }

    const createdDate = new Date(receipt.created_at);
    return createdDate >= thirtyDaysAgo && createdDate <= now;
  });

  console.log('Receipts created in last 30 days:', receipts.length);

  return { receipts, error: null };
};

// Calculate total spending
export const calculateTotalSpending = (receipts) => {
  return receipts.reduce((total, receipt) => {
    return total + (parseFloat(receipt.total_amount) || 0);
  }, 0);
};

// Calculate spending by category
export const calculateCategoryBreakdown = (receipts) => {
  const categoryTotals = {};

  receipts.forEach((receipt) => {
    const category = receipt.category || 'Miscellaneous';
    const amount = parseFloat(receipt.total_amount) || 0;

    if (categoryTotals[category]) {
      categoryTotals[category] += amount;
    } else {
      categoryTotals[category] = amount;
    }
  });

  // Convert to array and sort by amount (descending)
  return Object.entries(categoryTotals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
};

// Get category colors for pie chart
export const getCategoryColor = (category) => {
  const colors = {
    'Food & Dining': '#3b82f6',           // blue
    'Travel & Transportation': '#8b5cf6', // purple
    'Utilities & Bills': '#f59e0b',       // amber
    'Shopping & Retail': '#ec4899',       // pink
    'Health & Medical': '#10b981',        // emerald
    'Entertainment & Leisure': '#f97316', // orange
    'Education & Courses': '#06b6d4',     // cyan
    'Work & Business': '#6366f1',         // indigo
    'Personal Care': '#14b8a6',           // teal
    'Miscellaneous': '#6b7280',           // gray
  };

  return colors[category] || '#6b7280';
};

// Generate financial advice using Gemini AI
export const generateFinancialAdvice = async (totalSpending, categoryBreakdown) => {
  try {
    // Prepare data for Gemini
    const categoryData = {};
    categoryBreakdown.forEach(({ category, amount }) => {
      categoryData[category] = amount;
    });

    const response = await fetch('/api/generate-financial-advice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        totalSpending,
        categoryBreakdown: categoryData,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to generate advice');
    }

    return { advice: result.advice, error: null };
  } catch (error) {
    console.error('Error generating financial advice:', error);
    return { advice: null, error: error.message };
  }
};
