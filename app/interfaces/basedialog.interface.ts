/**
 * Base Dialog Props - All dialog components have at least these properties
 */
export interface BaseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
