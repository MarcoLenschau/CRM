/**
 * Base properties extended by all dialog component prop interfaces.
 * Provides consistent control over dialog visibility and dismissal across the application.
 *
 * @property isOpen - Controls whether the dialog is visible or hidden
 * @property onClose - Callback function executed when user dismisses or closes the dialog
 * @category Interfaces
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export interface BaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
