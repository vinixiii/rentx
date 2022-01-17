import React, { useState, useEffect } from 'react';
import { Alert, FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { CarCard } from '../../components/CarCard';
import { AnimatedLoading } from '../../components/AnimatedLoading';

import { ICarDTO } from '../../dtos/ICarDTO';
import { Car as CarModel } from '../../database/models/Car';
import { api } from '../../services/api';

import {
  Container,
  Header,
  ButtonWrapper,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarsWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate
} from './styles';

interface IDataProps {
  id: string;
  car: CarModel;
  start_date: string,
  end_date: string,
};

export function MyCars() {
  const theme = useTheme();
  const navigation = useNavigation();
  const isScreenFocused = useIsFocused();

  const [isLoading, setIsLoading] = useState(true);
  const [myCars, setMyCars] = useState<IDataProps[]>([]);

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function getCars() {
      try {
        const response = await api.get('/rentals');
        const formattedData = response.data.map((data: IDataProps) => {
          return {
            id: data.id,
            car: data.car,
            start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
            end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
          }
        });

        setMyCars(formattedData);
      } catch (error) {
        console.error(`file: src/screens/MyCars\nfunction: getCars\nerror: ${error as string}`);
        Alert.alert('Não foi possível listar os carros');
      } finally {
        setIsLoading(false);
      }
    }

    getCars();
  }, [isScreenFocused]);

  return(
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <ButtonWrapper>
          <BackButton
            color={theme.colors.secondaryBackground}
            onPress={handleGoBack}
          />
        </ButtonWrapper>

        <Title>
          Seus agendamentos, {'\n'}
          estão aqui.
        </Title>

        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>

        {
          isLoading
          ? <AnimatedLoading />
          :
          <Content>
            <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>{myCars.length}</AppointmentsQuantity>
            </Appointments>

            <FlatList
              data={myCars}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <CarsWrapper>
                  <CarCard data={item.car} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.start_date}</CarFooterDate>
                      
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color={theme.colors.textDetail}
                        style={{ marginHorizontal: 10 }}
                      />

                      <CarFooterDate>{item.end_date}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarsWrapper>
              )}
              showsVerticalScrollIndicator={false}          
            />
          </Content>
        }
    </Container>
  );
};
