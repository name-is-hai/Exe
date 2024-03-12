import { getLSData } from '@/lib/utils';
import { useEffect, useState } from 'react';
const useAuthentication = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (getLSData('access_token')) {
        setIsAuth(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return { isAuth, isLoading };
};

export { useAuthentication };
