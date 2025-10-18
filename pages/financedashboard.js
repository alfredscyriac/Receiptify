import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/utils/supabaseClient";

const ReceiptifyDashboard = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    fetchReceipts();
  }, []);

  useEffect(() => {
    if (receipts.length > 0) {
      renderChart();
    }
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [receipts]);

  const fetchReceipts = async () => {
    try {
      const { data, error } = await supabase
        .from("receipts")
        .select(
          "id, total_amount, category, receipt_date, merchant, created_at"
        )
        .order("receipt_date", { ascending: false });

      if (error) throw error;
      setReceipts(data || []);
    } catch (error) {
      console.error("Error fetching receipts:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalSpending = () => {
    return receipts.reduce(
      (sum, receipt) => sum + parseFloat(receipt.total_amount || 0),
      0
    );
  };

  const calculateCategorySpending = () => {
    const categoryTotals = {};
    receipts.forEach((receipt) => {
      const category = receipt.category || "Other";
      categoryTotals[category] =
        (categoryTotals[category] || 0) + parseFloat(receipt.total_amount || 0);
    });
    return categoryTotals;
  };

  const renderChart = () => {
    if (!chartRef.current) return;

    const categorySpending = calculateCategorySpending();
    const categories = Object.keys(categorySpending);
    const amounts = Object.values(categorySpending);
    const total = amounts.reduce((sum, amount) => sum + amount, 0);

    const colors = [
      "#a855f7", // purple
      "#06b6d4", // cyan
      "#6366f1", // indigo
      "#ec4899", // pink
      "#10b981", // green
      "#f59e0b", // amber
      "#ef4444", // red
      "#8b5cf6", // violet
    ];

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: categories.map((cat, idx) => {
          const percent = ((amounts[idx] / total) * 100).toFixed(1);
          return `${cat}: ${percent}%`;
        }),
        datasets: [
          {
            data: amounts,
            backgroundColor: colors.slice(0, categories.length),
            borderColor: "#1e293b",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "#94a3b8",
              padding: 15,
              font: {
                size: 13,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.parsed;
                return `$${value.toFixed(2)}`;
              },
            },
          },
        },
      },
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (receipts.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">
              Receiptify Dashboard{" "}
              <span className="text-sm text-indigo-400 font-normal ml-2">
                Beta
              </span>
            </h1>
          </div>
          <div className="text-center text-slate-400 text-lg mt-20">
            No receipts found in database
          </div>
        </div>
      </div>
    );
  }

  const totalSpending = calculateTotalSpending();

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">
            Receiptify Dashboard{" "}
            <span className="text-sm text-indigo-400 font-normal ml-2">
              Beta
            </span>
          </h1>
          <div className="flex gap-4">
            <button className="text-slate-400 hover:text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="text-slate-400 hover:text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">
          Financial Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Total Spending</span>
              <div className="bg-slate-700 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-cyan-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">
              ${totalSpending.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">
              Spending by Category
            </h3>
            <div className="h-80">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">
              Recent Transactions
            </h3>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 text-sm border-b border-slate-700">
                  <th className="text-left pb-3 font-medium">Merchant</th>
                  <th className="text-left pb-3 font-medium">Category</th>
                  <th className="text-left pb-3 font-medium">Date</th>
                  <th className="text-right pb-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {receipts.slice(0, 7).map((receipt) => (
                  <tr
                    key={receipt.id}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30"
                  >
                    <td className="py-4 text-white">
                      {receipt.merchant || "Unknown"}
                    </td>
                    <td className="py-4">
                      <span className="text-slate-300">
                        {receipt.category || "Other"}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400">
                      {formatDate(receipt.receipt_date)}
                    </td>
                    <td className="py-4 text-right text-white font-medium">
                      ${parseFloat(receipt.total_amount || 0).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    </div>
  );
};

export default ReceiptifyDashboard;
