import { toast } from 'react-hot-toast';
import { isBrowser } from './getToken';

const useToast = () => {
  const Success = (text: string) => {
    return isBrowser() ?
      toast.success(text, {
        duration: 3000,
        position: 'top-right',
        style: {
          border: '1px solid #0070F9',
          padding: '12px ',
          fontWeight: '700',
        },
      }) : "";
  };

  const Error = (text: string) => {
    return isBrowser() ?
      toast.error(text, {
        duration: 3000,
        position: 'top-right',
        style: {
          border: '1px solid #F44336',
          padding: '12px ',
          fontWeight: '700',
        },
      }) : "";
  };

  return {
    Success,
    Error,
  };
};

export default useToast;
