import React, { useState, useEffect } from 'react';
import { Alert, FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { CarCard } from '../../components/CarCard';
import { AnimatedLoading } from '../../components/AnimatedLoading';

import { ICarDTO } from '../../dtos/ICarDTO';
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

interface ICarListProps {
  user_id: string;
  car: ICarDTO,
  startDate: string,
  endDate: string,
  id: string;
};

export function MyCars() {
  const theme = useTheme();
  const navigation = useNavigation();  

  const [isLoading, setIsLoading] = useState(true);
  const [myCars, setMyCars] = useState<ICarListProps[]>([]);

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    async function getCars() {
      try {
        const response = await api.get('schedules_byuser?user_id=1');
        setMyCars(response.data);
      } catch (error) {
        console.error(`file: src/screens/MyCars\nfunction: getCars\nerror: ${error as string}`);
        Alert.alert('Não foi possível listar os carros');
      } finally {
        setIsLoading(false);
      }
    }

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
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      
                      <AntDesign
                        name="arrowright"
                        size={14}
                        color={theme.colors.textDetail}
                        style={{ marginHorizontal: 10 }}
                      />

                      <CarFooterDate>{item.endDate}</CarFooterDate>
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
