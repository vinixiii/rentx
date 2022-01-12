import React, {
  createContext,
  useState,
  useContext,
  ReactNode
} from 'react';

import { api } from '../services/api';

// Dados do usuário
interface IUser {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
};

// O que virá da API e será salvo no state
interface IAuthState {
  token: string;
  user: IUser;
};

// Credenciais para fazer login
interface ISignInCredentials {
  email: string;
  password: string;
};

// O que será compartilhado com toda a aplicação
interface IAuthContextData {
  user: IUser;
  signIn: (credentials: ISignInCredentials) => Promise<void>;
};

interface IAuthProviderProps {
  children: ReactNode;
};

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children } : IAuthProviderProps) {
  const [data, setData] = useState<IAuthState>({} as IAuthState);
  
  async function signIn({ email, password } : ISignInCredentials) {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    
    api.defaults.headers.authorization = `Bearer ${token}`;
    setData({ token, user });
  };

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
