import React, { useState } from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

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
  About
} from './styles';

export function CarDetails() {  
  return(
    <Container>
      <Header>
        <BackButton onPress={() => console.log('Teste')}/>
      </Header>
      
      <CarImages>
        <ImageSlider imagesUrl={['https://www.seekpng.com/png/full/256-2561343_lamborghini-huracan.png']} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huaracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>{`R$ 580`}</Price>
          </Rent>
        </Details>

        <About>
          Este é automóvel desportivo. Surgiu do lendário touro de lide indultado na praça Real Maestranza de Sevilla. 
          É um belíssimo carro para quem gosta de acelerar.
        </About>
      </Content>
    </Container>
  );
};
