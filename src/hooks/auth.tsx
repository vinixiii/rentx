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
  signOut: () => Promise<void>;
  updateUser: (user: IUser) => Promise<void>;
  isLoading: boolean;
};

interface IAuthProviderProps {
  children: ReactNode;
};

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children } : IAuthProviderProps) {
  const [data, setData] = useState<IUser>({} as IUser);
  const [isLoading, setIsLoading] = useState(true);
  
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

  async function signOut() {
    try {
      const userCollection = await database.get<User>('users');

      await database.write(async () => {
        const selectedUser = await userCollection.find(data.id);
        await selectedUser.destroyPermanently();
      });

      setData({} as IUser);
    } catch (error) {
      throw new Error(error as string);
    }
  };

  async function updateUser(user: IUser) {
    try {
      const userCollection = await database.get<User>('users');
      
      await database.write(async () => {
        const selectedUser = await userCollection.find(user.id);
        await selectedUser.update(( userData ) => {
          userData.name = user.name;
          userData.driver_license = user.driver_license;
          userData.avatar = user.avatar;
        });
      });

      setData(user);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<User>('users');
      const response = await userCollection.query().fetch();
      
      if(response.length > 0) {
        const userData = response[0]._raw as unknown as IUser;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData);
        setIsLoading(false);
      }

      setIsLoading(false);
    }

    loadUserData()
  })

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
