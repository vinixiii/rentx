import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AppStackRoutes } from './app.stack.routes';
import { MyCars } from '../screens/MyCars';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';


const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes() {
  const theme = useTheme();
  return(
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.textDetail,
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? getBottomSpace() - 20 : 0,
          height: 78,
          backgroundColor: theme.colors.primaryBackground
        }
      }}
    >
      <Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: (({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ))
        }}
      />
      <Screen
        name="Profile"
        component={MyCars}
        options={{
          tabBarIcon: (({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ))
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: (({ color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          ))
        }}
      />
    </Navigator>
  );
};
