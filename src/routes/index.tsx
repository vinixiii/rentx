import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

import { useAuth } from '../hooks/auth';
import { AnimatedLoading } from '../components/AnimatedLoading';

export function Routes() {
  const { user, isLoading } = useAuth();

  return(
    isLoading
    ? <AnimatedLoading />
    :
    <NavigationContainer>
      { user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>    
  );
};
