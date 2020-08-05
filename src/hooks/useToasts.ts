import { useState } from 'react';
import { AlertConfig } from '../types';

type ToastsHook = {
  alert: AlertConfig;
  showAlert: (text: string) => void;
};

export default function useToasts(): ToastsHook {
  const [alert, setAlert] = useState({ open: false, text: '' } as AlertConfig);

  const showAlert = (text: string): void => {
    setAlert({ open: true, text });
    setTimeout(() => {
      setAlert({ open: false, text: '' });
    }, 2500);
  };

  return { alert, showAlert };
}
