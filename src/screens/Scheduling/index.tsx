import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Calendar } from '../../components/Calendar';
import { Button } from '../../components/Button';

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

export function Scheduling() {
  const theme = useTheme();

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
            onPress={() => console.log('Teste')}
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
            <DateValueWrapper selected={true}>
              <DateValue>
                19/09/1970
              </DateValue>
            </DateValueWrapper>
          </DateInfo>
          
          <ArrowSvg />

          <DateInfo>
            <DateTitle>Até</DateTitle>
            <DateValueWrapper selected={false}>
              <DateValue></DateValue>
            </DateValueWrapper>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
        />
      </Footer>
    </Container>
  );
};
