import { useEffect, useState } from 'react';
import { createAxiosInstance } from '@/utils/axios';

export function useAuth(): { isValid: boolean | null; user: string | null } {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedToken =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (storedToken) {
      const axiosInstance = createAxiosInstance();
      axiosInstance
        .get('/dashboard', {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          setIsValid(true);
          setUser(response.data.user_name);
        })
        .catch(() => setIsValid(false));
    } else {
      setIsValid(false);
    }
  }, []);

  return { isValid, user };
}
