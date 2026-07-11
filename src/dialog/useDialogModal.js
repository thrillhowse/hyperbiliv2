import { useRef, useEffect } from 'react';

export function useDialogModal(open) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
    return () => {
      if (dialog.open) dialog.close();
    };
  }, [open]);
  return ref;
}
