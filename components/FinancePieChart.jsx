import { getCategoryColor } from '@/lib/utils/financeHelpers';

export default function FinancePieChart({ categoryBreakdown, totalSpending }) {
  if (!categoryBreakdown || categoryBreakdown.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  // Calculate percentages and create pie chart slices
  let currentAngle = 0;
  const slices = categoryBreakdown.map(({ category, amount }) => {
    const percentage = (amount / totalSpending) * 100;
    const angle = (percentage / 100) * 360;

    const slice = {
      category,
      amount,
      percentage,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      color: getCategoryColor(category),
    };

    currentAngle += angle;
    return slice;
  });

  // Create SVG pie chart
  const createPath = (startAngle, endAngle) => {
    const start = polarToCartesian(100, 100, 80, endAngle);
    const end = polarToCartesian(100, 100, 80, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', 100, 100,
      'L', start.x, start.y,
      'A', 80, 80, 0, largeArcFlag, 0, end.x, end.y,
      'Z'
    ].join(' ');
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-6">
        <svg viewBox="0 0 200 200" className="w-64 h-64">
          {slices.map((slice, index) => (
            <path
              key={index}
              d={createPath(slice.startAngle, slice.endAngle)}
              fill={slice.color}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {slices.map((slice, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: slice.color }}
              ></div>
              <span className="text-gray-300">{slice.category}</span>
            </div>
            <span className="text-gray-400 font-medium">
              {slice.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
