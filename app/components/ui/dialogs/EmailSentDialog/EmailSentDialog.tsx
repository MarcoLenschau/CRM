'use client';

import { EmailSentDialogProps } from '@/app/interfaces/emailsentdialog.interface';

/**
 * Modal confirmation dialog confirming successful email delivery with recipient information.
 * Displays recipient email and success message in German localization.
 *
 * @param isOpen - Controls dialog visibility
 * @param onClose - Callback function executed when dialog is dismissed
 * @param recipientEmail - Email address of the recipient for confirmation display
 * @return Rendered email sent confirmation dialog
 * @throws Error if onClose callback fails; dialog remains visible but button is clickable
 * @category Dialogs
 * @security Modal prevents background interaction; email address displayed for user verification
 * @performance Lightweight confirmation component with minimal re-renders
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function EmailSentDialog({ isOpen, onClose, recipientEmail }: EmailSentDialogProps) {
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
        
        <h2 className="text-2xl font-bold text-white mb-4">Email versendet!</h2>
        
        {recipientEmail && (
          <div className="bg-zinc-700 rounded-lg p-4 mb-6 text-sm">
            <p className="text-gray-400">Empfänger</p>
            <p className="text-white font-semibold">{recipientEmail}</p>
          </div>
        )}
        
        <p className="text-gray-400 text-sm mb-6">Deine Email wurde erfolgreich versendet.</p>
        <button onClick={onClose} className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-semibold text-sm">Fertig</button>
      </div>
    </div>
  );
}
