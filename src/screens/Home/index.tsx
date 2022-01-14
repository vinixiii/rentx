import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { Alert, StatusBar, StyleSheet, BackHandler } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring
} from 'react-native-reanimated';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';
import { database } from '../../database';

import { CarCard } from '../../components/CarCard';
import { AnimatedLoading } from '../../components/AnimatedLoading';

import { api } from '../../services/api';
import { ICarDTO } from '../../dtos/ICarDTO';
import { Car as CarModel } from '../../database/models/Car';

import Logo from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles';
import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping/index';

const AnimatedButton = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const [isLoading, setIsLoading] = useState(false);
  const [carList, setCarList] = useState<CarModel[]>([]);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  function handleShowCarDetails(car: CarModel) {
    navigation.navigate('CarDetails', { car });
  };

  function handleShowMyCars() {
    navigation.navigate('MyCars');
  };

  async function offlineSync() {
    await synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        const { data } = await api
        .get(`/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

        const { changes, latestVersion } = data;

        return { changes, timestamp: latestVersion};
      },
      pushChanges: async ({ changes }) => {
        const user = changes.users;
        await api.post('/users/sync', user);
      }
    });
  }

  useEffect(() => {
    async function getCars() {
      setIsLoading(true);
      try {
        const carCollection = database.get<CarModel>('cars')
        const cars = await carCollection.query().fetch();

        setCarList(cars);
      } catch (error) {
        console.error(`file: src/screens/Home\nfunction: getCars\nerror: ${error as string}`);
        Alert.alert('Não foi possível listar os carros');
      } finally {
        setIsLoading(false);
      }
    };
    
    getCars();
  }, []);

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    e.preventDefault();
    return;
  }), [navigation]);

  useEffect(() => {
    if(netInfo.isConnected) {
      offlineSync();
    }
  }, [netInfo.isConnected]);

  return(
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!isLoading && <TotalCars>Total de {carList.length} carros</TotalCars>}          
        </HeaderContent>
      </Header>

      {
        isLoading 
        ? <AnimatedLoading />
        : 
        <>
          <CarList
            data={carList}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) =>
              <CarCard data={item} onPress={() => handleShowCarDetails(item)} />
            }
          />
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View
              style={[myCarsButtonStyle, {
                position: 'absolute',
                bottom: 12,
                right: 12,
              }]}
            >
              <AnimatedButton
                onPress={handleShowMyCars}
                style={[styles.button, {
                  backgroundColor: theme.colors.main
                }]}
              >
                <Ionicons
                  name="ios-car-sport"
                  size={32}
                  color={theme.colors.shape}
                />
              </AnimatedButton>
            </Animated.View>
          </PanGestureHandler>
        </>
      }
    </Container>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
