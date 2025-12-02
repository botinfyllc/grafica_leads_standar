import createAxiosInstance from '@/utils/axios';
const api = createAxiosInstance();

interface LoginParams {
  email: string;
  password: string;
}

export default function useLogin() {
  const login = async ({ email, password }: LoginParams) => {
    const id_empresa = 1; // ID de la empresa fija
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        id_empresa,
      });
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      throw error;
    }
  };
  return { login };
}
