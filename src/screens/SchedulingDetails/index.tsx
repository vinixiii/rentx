import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

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
  Footer
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
  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const { car, dates } = route.params as IParams;

  const [isLoading, setIsLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState({} as IRentalPeriod);

  const rentTotal = Number(dates.length * car.rent.price);

  async function handleConfirmRental() {
    try {
      setIsLoading(true);
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);      
      const unavaiableDates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates
      ];

      await api.post('/schedules_byuser', {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
      });
      
      api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavaiableDates,
      }).then(() => navigation.navigate('Confirmation', {
        title: 'Carro alugado!',
        message: 'Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.',
        nextScreenRouteName: 'Home',
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

  return(
    <Container>
      <Header>
        <BackButton onPress={handleGoBack}/>
      </Header>
      
      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {
            car.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))
          }
        </Accessories>

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
            <RentalPriceQuota>R$ {car.rent.price} x{dates.length} diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Confirmar"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          isEnabled={!isLoading}
          isLoading={isLoading}
        />
      </Footer>
    </Container>
  );
};
