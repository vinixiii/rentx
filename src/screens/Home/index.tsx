import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { Alert, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { CarCard } from '../../components/CarCard';
import { Loading } from '../../components/Loading';

import { api } from '../../services/api';
import { ICarDTO } from '../../dtos/ICarDTO';

import Logo from '../../assets/logo.svg';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarsButton
} from './styles';

export function Home() {
  const navigation = useNavigation();
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [carList, setCarList] = useState<ICarDTO[]>([]);

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

      {
        isLoading 
        ? <Loading />
        : 
        <>
          <CarList
            data={carList}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) =>
              <CarCard data={item} onPress={() => handleShowCarDetails(item)} />
            }
          />
          <MyCarsButton onPress={handleShowMyCars}>
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </MyCarsButton>
        </>
      }
    </Container>
  );
};
