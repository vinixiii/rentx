import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { useTheme } from 'styled-components';
import { useNetInfo } from '@react-native-community/netinfo';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { ICarDTO } from '../../dtos/ICarDTO';
import { Car as CarModel } from '../../database/models/Car';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { api } from '../../services/api';

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  OfflineInfo
} from './styles';

interface IParams {
  car: CarModel
}

export function CarDetails() {
  const netInfo = useNetInfo();
  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const { car } = route.params as IParams;

  const [carUpdated, setCarUpdated] = useState<ICarDTO>({} as ICarDTO);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;  
  });

  const headerAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value,
        [0, 160],
        [200, 80],
        Extrapolate.CLAMP
      )
    }
  });

  const carSliderAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value,
        [0, 130],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  });

  function handleShowRentalPeriodChoice() {
    navigation.navigate('Scheduling', { car });
  };

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if(netInfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netInfo.isConnected]);

  return(
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Animated.View style={[headerAnimation, styles.header, { backgroundColor: theme.colors.secondaryBackground }]}>
        <Header>
          <BackButton onPress={handleGoBack}/>
        </Header>
        <Animated.View style={[carSliderAnimation]}>
          <CarImages>
            <ImageSlider imagesUrl={
              !!carUpdated.photos
              ? carUpdated.photos 
              : [{ id: car.thumbnail , photo: car.thumbnail }]
            } />
          </CarImages>
        </Animated.View>
      </Animated.View>
      
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: getStatusBarHeight() + 180,
          alignItems: 'center',
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {
          netInfo.isConnected === false &&
            <OfflineInfo>
              Conecte-se a internet para ver mais detalhes do carro!
            </OfflineInfo>
        }

        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>
              R$ {netInfo.isConnected === true ? car.price : '...' }
            </Price>
          </Rent>
        </Details>

        {
          carUpdated.accessories &&
          <Accessories>
            {
              carUpdated.accessories.map(accessory => (
                <Accessory
                  key={accessory.type}
                  name={accessory.name}
                  icon={getAccessoryIcon(accessory.type)}
                />
              ))
            }
          </Accessories>
        }
        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title={"Escolher período do aluguel"}
          onPress={handleShowRentalPeriodChoice}
          isEnabled={netInfo.isConnected === true}
        />
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  }
})
