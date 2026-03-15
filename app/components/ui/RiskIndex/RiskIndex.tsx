'use client';

import { QuickTipTooltip } from '@/app/components/ui/QuickTip/QuickTip';

interface RiskIndexProps {
  riskPercentage?: number;
}

/**
 * Risk assessment indicator component displaying customer risk level with visual percentage gauge.
 * Shows risk category label, percentage value, and helpful tooltip explaining risk assessment.
 *
 * @param riskPercentage - Risk percentage value (0-100) determining risk level category, defaults to 30%
 * @return Rendered risk index card with visual gauge and category label
 * @throws Error if riskPercentage is not a valid number; renders with default value
 * @category UI Components
 * @security Displays risk assessment data; useful for decision support in customer interactions
 * @performance Static component receiving risk value as prop; includes inline tooltip
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function RiskIndex({ riskPercentage = 30 }: RiskIndexProps) {
  const getRiskLabel = (percentage: number) => {
    if (percentage < 10) return 'Low Risk';
    if (percentage < 30) return 'Moderate Risk';
    if (percentage < 60) return 'High Risk';
    return 'Critical Risk';
  };

  const getRiskColor = () => 'from-red-900/40 to-red-900/15 border-red-700/50';

  const getRiskTextColor = () => 'text-red-400';

  const getSeverityEmoji = (percentage: number) => {
    if (percentage < 10) return '🟢';
    if (percentage < 30) return '🟡';
    if (percentage < 60) return '🟠';
    return '🔴';
  };

  return (
    <div className={`bg-gradient-to-br ${getRiskColor()} rounded-xl p-4 border backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <p className="text-xs font-bold text-red-300 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span>{getSeverityEmoji(riskPercentage)}</span>
            Risk Assessment
          </p>
    
        </div>
    
        <QuickTipTooltip text="" tooltipText="Based on the ratio of failed and warning actions to total actions" color="red"/>
      </div>
      <div className="flex items-baseline gap-2 mt-4">
            <div className={`text-3xl font-black ${getRiskTextColor()}`}>{riskPercentage}%</div>
            <p className={`text-xs font-semibold ${getRiskTextColor()} opacity-80`}>{getRiskLabel(riskPercentage)}</p>
          </div>
      <div className="mt-8">
        <div className="grid grid-cols-4 gap-1">
          {[
            { threshold: 10, label: 'Low', color: 'from-green-500 to-green-400' },
            { threshold: 30, label: 'Moderate', color: 'from-yellow-500 to-yellow-400' },
            { threshold: 60, label: 'High', color: 'from-orange-500 to-orange-400' },
            { threshold: 100, label: 'Critical', color: 'from-red-600 to-red-500' }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col gap-0.5">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  riskPercentage >= item.threshold 
                    ? `bg-gradient-to-r ${item.color} shadow-lg`
                    : 'bg-red-900/20 border border-red-700/20'
                }`}
              ></div>
              <span className="text-xs text-gray-400 font-semibold text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}