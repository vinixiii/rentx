import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode
} from 'react';

import { api } from '../services/api';
import { database } from '../database';
import { User } from '../database/models/User';

// Dados do usuário
interface IUser {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
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
  const [data, setData] = useState<IUser>({} as IUser);
  
  async function signIn({ email, password } : ISignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });
  
      const { token, user } = response.data;
      
      api.defaults.headers.authorization = `Bearer ${token}`;

      const userCollection = database.get<User>('users');
      await database.write(async () => {
        await userCollection.create(( newUser ) => {
          newUser.user_id = user.id,
          newUser.name = user.name,
          newUser.email = user.email,
          newUser.driver_license = user.driver_license,
          newUser.avatar = user.avatar,
          newUser.token = token
        });
      });

      setData({ ...user, token });
    } catch (error) {
      throw new Error(error as string);
    }    
  };

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<User>('users');
      const response = await userCollection.query().fetch();
      
      if(response.length > 0) {
        const userData = response[0]._raw as unknown as IUser;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData);
      }
    }

    loadUserData()
  })

  return (
    <AuthContext.Provider value={{ user: data, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
