import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';

import { BackButton } from '../../components/BackButton';
import { Calendar, IMarkedDateProps, IDateDataProps, generateInterval } from '../../components/Calendar';
import { Button } from '../../components/Button';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { ICarDTO } from '../../dtos/ICarDTO';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  ButtonWrapper,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValueWrapper,
  DateValue,
  Content,
  Footer
} from './styles';

interface IRentalPeriod {
  start: number;
  formattedStart: string;
  end: number;
  formattedEnd: string;
};

interface IParams {
  car: ICarDTO
}

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const { car } = route.params as IParams;

  const [lastSelectedDate, setLastSelectedDate] = useState({} as IDateDataProps);
  const [markedDates, setMarkedDates] = useState({} as IMarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState({} as IRentalPeriod);
  
  function handleConfirmRentalPeriod() {
    if(!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert('Selecione um período para o aluguel do carro.');
    } else {
      navigation.navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates),
      });
    }
  };

  function handleGoBack() {
    navigation.goBack();
  }

  function handleChangeDate(date: IDateDataProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if(start.timestamp > end.timestamp) {
      start = end;
      end = start;
    };

    setLastSelectedDate(end);

    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    //Formatando as datas
    const firstDate = Object.keys(interval)[0];
    const lastDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      formattedStart: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      formattedEnd: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
    })
  };

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
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValueWrapper selected={!!rentalPeriod.formattedStart}>
              <DateValue>
                {rentalPeriod.formattedStart}
              </DateValue>
            </DateValueWrapper>
          </DateInfo>
          
          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValueWrapper selected={!!rentalPeriod.formattedEnd}>
              <DateValue>{rentalPeriod.formattedEnd}</DateValue>
            </DateValueWrapper>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRentalPeriod}
        />
      </Footer>
    </Container>
  );
};
