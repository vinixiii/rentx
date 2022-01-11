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

import { CarCard } from '../../components/CarCard';
import { AnimatedLoading } from '../../components/AnimatedLoading';

import { api } from '../../services/api';
import { ICarDTO } from '../../dtos/ICarDTO';

import Logo from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles';

const AnimatedButton = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const theme = useTheme();
  const navigation = useNavigation();

  

  const [isLoading, setIsLoading] = useState(false);
  const [carList, setCarList] = useState<ICarDTO[]>([]);

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

  function handleShowCarDetails(car: ICarDTO) {
    navigation.navigate('CarDetails', { car });
  };

  function handleShowMyCars() {
    navigation.navigate('MyCars');
  };

  useEffect(() => {
    async function getCars() {
      setIsLoading(true);
      try {
        const response = await api.get('/cars');
        setCarList(response.data);
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
