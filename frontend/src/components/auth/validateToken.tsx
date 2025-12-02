import { useAuth } from '@/hooks/auth';
import Unauthorized from './unauthorized';

type ValidateTokenProps = {
  children: (user: string | null) => React.ReactNode;
};

const ValidateToken = ({ children }: ValidateTokenProps) => {
  const { isValid, user } = useAuth();

  if (isValid === false) {
    return <Unauthorized />;
  }

  if (isValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-custom-blue-300 text-xl">Cargando...</span>
      </div>
    );
  }

  return <>{children(user)}</>;
};

export default ValidateToken;
