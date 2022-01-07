import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList
} from './styles';

export function Home() {
  const navigation = useNavigation();

  const car = {
    brand: 'Porshe',
    name: 'Panamera',
    rent: {
      period: 'Ao dia',
      price: 340,
    },
    thumbnail: 'https://cdn.picpng.com/porsche/porsche-view-29291.png',  
  };

  function handleShowCarDetails() {
    navigation.navigate('CarDetails');
  };

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
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarList
        data={[1, 2, 3, 4, 5, 6, 7]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) =>
          <CarCard data={car} onPress={handleShowCarDetails} />
        }
      />
    </Container>
  );
};
