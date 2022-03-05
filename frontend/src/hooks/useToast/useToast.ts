import { toast } from 'react-toastify';

interface ReturnToast {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warn: (message: string) => void;
}

const useToast = (): ReturnToast => {
  const conf = {
    position: toast.POSITION.BOTTOM_LEFT,
  };
  const success = (message: string) => {
    toast.success(message, conf);
  };
  const error = (message: string) => {
    toast.error(message, conf);
  };
  const info = (message: string) => {
    toast.info(message, conf);
  };
  const warn = (message: string) => {
    toast.warn(message, conf);
  };

  return {
    success,
    error,
    info,
    warn,
  };
};

export default useToast;
