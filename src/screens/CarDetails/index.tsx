import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import {
  Container,
  Header,
  CarImages
} from './styles';

export function CarDetails() {
  return(
    <Container>
      <Header>
        <BackButton onPress={() => console.log('Teste')}/>
      </Header>
      
      <CarImages>
        <ImageSlider imagesUrl={['https://cdn.picpng.com/porsche/porsche-view-29291.png']} />
      </CarImages>
    </Container>
  );
};
