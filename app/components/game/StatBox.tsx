interface StatBoxProps {
  label: string;
  value: number | string;
  subValue?: string;
  icon?: React.ReactNode;
  isHighlight?: boolean;
  isGold?: boolean;
  trend?: 'up' | 'down' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function StatBox({ 
  label, 
  value, 
  subValue, 
  icon,
  isHighlight,
  isGold,
  trend,
  size = 'md',
  className = ''
}: StatBoxProps) {
  const valueColor = isGold ? 'text-[#FFD700]' : 
                    isHighlight ? 'text-[#FF4500]' : 
                    'text-white';

  const trendColor = trend === 'up' ? 'text-green-500' :
                    trend === 'down' ? 'text-red-500' :
                    'text-gray-400';

  return (
    <div className={`${className} bg-black/20 rounded-sm`}>
      <div className="flex items-center justify-between px-2 py-1.5">
        {/* Label - Left side */}
        <div className="text-gray-400/90 text-[10px] font-medium tracking-wider uppercase">
          {subValue ? (
            <div className="flex flex-col items-start leading-none">
              <span>{label}</span>
              <span className="text-[8px] text-gray-500">{subValue}</span>
            </div>
          ) : (
            <span>{label}</span>
          )}
        </div>

        {/* Value and Trend - Right side */}
        <div className="flex items-center gap-1">
          <span className={`font-mono font-bold ${valueColor} text-xs tabular-nums`}>
            {value}
          </span>
          {trend && (
            <span className={`${trendColor} text-[10px] font-bold leading-none ml-0.5 transition-colors duration-200`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
} 