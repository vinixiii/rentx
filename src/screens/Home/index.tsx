import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { CarCard } from '../../components/CarCard';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars
} from './styles';

export function Home() {
  const car = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
    thumbnail: 'https://production.autoforce.com/uploads/version/profile_image/3188/model_main_comprar-tiptronic_87272c1ff1.png',    
  };

  const car2 = {
    brand: 'Porshe',
    name: 'Panamera',
    rent: {
      period: 'Ao dia',
      price: 340,
    },
    thumbnail: 'https://cdn.picpng.com/porsche/porsche-view-29291.png',  
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

      <CarCard data={car} />
      <CarCard data={car2} />
    </Container>
  );
};
