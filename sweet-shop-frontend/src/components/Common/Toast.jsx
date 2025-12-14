import toast from 'react-hot-toast';

export const showToast = {
  success: (message) => {
    toast.success(message, {
      style: {
        background: '#10b981',
        color: 'white',
        borderRadius: '10px',
        padding: '16px',
      },
    });
  },
  error: (message) => {
    toast.error(message, {
      style: {
        background: '#ef4444',
        color: 'white',
        borderRadius: '10px',
        padding: '16px',
      },
    });
  },
  loading: (message) => {
    return toast.loading(message, {
      style: {
        borderRadius: '10px',
        padding: '16px',
      },
    });
  },
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },
};