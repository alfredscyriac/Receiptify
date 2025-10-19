import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  getLast30DaysReceipts,
  calculateTotalSpending,
  calculateCategoryBreakdown,
  getCategoryColor,
  generateFinancialAdvice,
} from '@/lib/utils/financeHelpers';
import FinancePieChart from '@/components/FinancePieChart';
import { Lock, TrendingUp, DollarSign, Lightbulb } from 'lucide-react';

export default function FinanceDashboard() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAdvice, setLoadingAdvice] = useState(false);
  const [totalSpending, setTotalSpending] = useState(0);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [hasAccess, setHasAccess] = useState(false);
  const [financialAdvice, setFinancialAdvice] = useState(null);
  const router = useRouter();

  useEffect(() => {
    loadFinanceData();
  }, []); 

  const loadFinanceData = async () => {
    setLoading(true); 

    const { receipts, error } = await getLast30DaysReceipts(); 

    if(error) {
      console.error('Error loading finance data:', error); 
      setLoading(false);
      return;
    }
    setReceipts(receipts); 

    if (receipts.length >= 5) {
      setHasAccess(true);
      const total = calculateTotalSpending(receipts);
      const breakdown = calculateCategoryBreakdown(receipts);
      setTotalSpending(total);
      setCategoryBreakdown(breakdown);

      // Generate financial advice
      loadFinancialAdvice(total, breakdown);
    } else {
      setHasAccess(false);
    }

    setLoading(false);
  };

  const loadFinancialAdvice = async (total, breakdown) => {
    setLoadingAdvice(true);
    const { advice, error } = await generateFinancialAdvice(total, breakdown);

    if (!error && advice) {
      setFinancialAdvice(advice);
    }
    setLoadingAdvice(false);
  }; 

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center relative overflow-hidden'>
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent" />

        {/* Animated background elements - very prominent */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-white rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-cyan-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-pink-300 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-[650px] h-[650px] bg-indigo-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="text-center relative z-10">
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-white'>
              Loading your financial overview..
          </p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className='min-h-screen text-white relative overflow-hidden'>
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent" />

        {/* Animated background elements - very prominent */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-white rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-cyan-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-pink-300 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 w-[650px] h-[650px] bg-indigo-400 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 relative z-10">
          <h1 className='text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 bg-clip-text text-transparent'>
            Financial Dashboard
          </h1>
          <div className='bg-gray-800 rounded-xl p-12 text-center border border-gray-700'>
            <div className='bg-gray-700 bg-opacity-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6'>
              <Lock className='w-10 h-10 text-purple-400'/>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Unlock your financial insights</h2>
            <p className="text-gray-400 text-lg mb-6">
              You need at least <span className="text-purple-400 font-semibold">5 receipts</span> from the last 30 days to access your financial dashboard.
            </p>

            <div className="bg-gray-700 bg-opacity-30 rounded-lg p-6 mb-6">
              <p className="text-gray-300 mb-2">Current Progress:</p>
              <div className="flex items-center justify-center gap-4">
                <div className='text-3xl font-bold text-purple-400'>{receipts.length}</div>
                <div className="text-2xl text-gray-500">/</div>
                <div className="text-3xl font-bold text-gray-400">5</div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 mt-4">
                <div
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(receipts.length / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            <p className="text-gray-400">
              Upload <span className="text-purple-400 font-semibold">{5 - receipts.length} more receipt{5 - receipts.length !== 1 ? 's' : ''}</span> to unlock detailed spending analysis and personalized financial advice.
            </p>

            <button
              onClick={() => router.push('/dashboard')}
              className="mt-8 bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 hover:from-purple-700 hover:via-purple-600 hover:to-cyan-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Main dashboard (user has 5+ receipts)
  return (
    <div className="min-h-screen text-white font-inter relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-glow to-accent" />

      {/* Animated background elements - very prominent */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-white rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-[900px] h-[900px] bg-cyan-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-pink-300 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-[650px] h-[650px] bg-indigo-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">

        <p className="text-center text-gray-400 mb-8">
          Last 30 days • {receipts.length} transaction{receipts.length !== 1 ? 's' : ''}
        </p>

        {/* Main Summary Card with Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Total Spending Card */}
          <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-cyan-500 rounded-xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Total Spending</h2>
            </div>
            <p className="text-5xl font-bold text-white mb-2">
              ${totalSpending.toFixed(2)}
            </p>
            <p className="text-purple-100">in the last 30 days</p>
          </div>

          {/* Pie Chart */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-200">Spending Breakdown</h3>
            <FinancePieChart
              categoryBreakdown={categoryBreakdown}
              totalSpending={totalSpending}
            />
          </div>
        </div>

        {/* Category Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-purple-400" />
            Spending by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryBreakdown.map(({ category, amount }) => (
              <div
                key={category}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-200"
              >
                <div
                  className="w-12 h-1 rounded-full mb-3"
                  style={{ backgroundColor: getCategoryColor(category) }}
                ></div>
                <h3 className="text-lg font-medium text-gray-200 mb-2">{category}</h3>
                <p className="text-3xl font-bold text-white">${amount.toFixed(2)}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {((amount / totalSpending) * 100).toFixed(1)}% of total
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Advice Section */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-600 bg-opacity-20 rounded-full p-3">
              <Lightbulb className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-purple-400">Financial Insights</h2>
          </div>

          {loadingAdvice ? (
            <div className="flex items-center gap-3 text-gray-400">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-500"></div>
              <p>Generating personalized financial advice...</p>
            </div>
          ) : financialAdvice ? (
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 whitespace-pre-wrap">{financialAdvice}</div>
            </div>
          ) : (
            <p className="text-gray-400">
              Unable to generate financial advice at this time. Please try again later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
