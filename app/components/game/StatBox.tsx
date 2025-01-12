interface StatBoxProps {
  label: string;
  value: number | string;
  subValue?: string;
  icon?: React.ReactNode;
  isHighlight?: boolean;
  isGold?: boolean;
  trend?: 'up' | 'down' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
}

export default function StatBox({ 
  label, 
  value, 
  subValue, 
  icon,
  isHighlight,
  isGold,
  trend,
  size = 'md'
}: StatBoxProps) {
  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base'
  };

  const valueColor = isGold ? 'text-[#FFD700]' : 
                    isHighlight ? 'text-[#FF4500]' : 
                    'text-white';

  const trendColor = trend === 'up' ? 'text-green-500' :
                    trend === 'down' ? 'text-red-500' :
                    'text-gray-400';

  return (
    <div className={`text-center bg-black/20 rounded-lg ${sizeClasses[size]}`}>
      {icon && (
        <div className="text-gray-400 mb-1">{icon}</div>
      )}
      <div className={`font-bold ${valueColor} flex items-center justify-center gap-1`}>
        {value}
        {trend && (
          <span className={`${trendColor} text-xs`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
          </span>
        )}
      </div>
      {subValue && (
        <div className="text-gray-400 text-xs opacity-75">{subValue}</div>
      )}
      <div className="text-gray-400 text-xs">
        {label}
      </div>
    </div>
  );
} 