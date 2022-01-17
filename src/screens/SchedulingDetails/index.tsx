import React, { useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { useNetInfo } from '@react-native-community/netinfo';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { ICarDTO } from '../../dtos/ICarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceTitle,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
  OfflineInfo
} from './styles';

interface IParams {
  car: ICarDTO;
  dates: string[];
}

interface IRentalPeriod {
  start: string;
  end: string;
}

export function SchedulingDetails() {
  const netInfo = useNetInfo();
  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const { car, dates } = route.params as IParams;

  const [isLoading, setIsLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState({} as IRentalPeriod);
  const [carUpdated, setCarUpdated] = useState<ICarDTO>({} as ICarDTO);

  const rentTotal = Number(dates.length * car.price);

  async function handleConfirmRental() {
    try {
      setIsLoading(true);
      
      await api.post('/rentals', {
        user_id: 1,
        car_id: car.id,
        start_date: new Date(dates[0]),
        end_date: new Date(dates[dates.length - 1]),
        total: rentTotal
      })
      .then(() => navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: 'Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.',
        nextScreenRouteName: 'StackHome',
      }));
    } catch (error) {
      console.error(`file: src/screens/SchedulingDetails\nfunction: handleConfirmRental\nerror: ${error as string}`);
      Alert.alert('Não foi possível alugar o carro.');
      setIsLoading(false);
    }
  };

  function handleGoBack() {
    navigation.goBack();
  };

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
  }, []);

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

      <Header>
        <BackButton onPress={handleGoBack}/>
      </Header>
      
      <CarImages>
        <ImageSlider imagesUrl={
          !!carUpdated.photos
          ? carUpdated.photos 
          : [{ id: car.thumbnail , photo: car.thumbnail }]
        } />
      </CarImages>
      
      <Content>
        {
          netInfo.isConnected === false &&
            <OfflineInfo>
              Conecte-se a internet para confirmar a locação!
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

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.secondaryBackground}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.textDetail}
          />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceTitle>Total</RentalPriceTitle>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ {netInfo.isConnected === true ? car.price : '...' } x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {netInfo.isConnected === true ? rentTotal : '...' } </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Confirmar"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          isEnabled={netInfo.isConnected === true && !isLoading}
          isLoading={isLoading}
        />
      </Footer>
    </Container>
  );
};
