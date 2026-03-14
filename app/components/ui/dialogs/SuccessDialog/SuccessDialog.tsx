import { SuccessDialogProps } from '@/app/interfaces/successdialog.interface';

export default function SuccessDialog({ 
  isOpen, 
  onClose, 
  title, 
  message,
  detailLabel,
  detailValue,
  buttonText = 'Fertig'
}: SuccessDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-lg p-6 max-w-md w-full mx-4 border-2 border-zinc-500 text-center">
        <div className="mb-4 flex justify-center">
          <div className="bg-green-600 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        
        {(detailLabel && detailValue) && (
          <div className="bg-zinc-700 rounded-lg p-4 mb-6 text-sm">
            <p className="text-gray-400">{detailLabel}</p>
            <p className="text-white font-semibold break-all">{detailValue}</p>
          </div>
        )}
        
        <p className="text-gray-400 text-sm mb-6">{message}</p>
        <button onClick={onClose} className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-semibold text-sm transition-colors">
          {buttonText}
        </button>
      </div>
    </div>
  );
}
