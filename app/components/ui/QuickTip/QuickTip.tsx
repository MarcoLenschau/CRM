import { QuickTipProps } from '@/app/interfaces/quicktip.interface';

export default function QuickTip({ text, width = 'w-full' }: QuickTipProps) {
  return (
    <div className={`bg-zinc-800 rounded-lg border-2 border-zinc-700 p-5 backdrop-blur-sm ${width}`}>
      <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        Quick Tip
      </h3>
      <p className="text-xs text-gray-300 leading-relaxed">
        {text}
      </p>
    </div>
  );
}
