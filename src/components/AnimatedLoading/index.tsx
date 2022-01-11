import React from 'react';
import LottieView from 'lottie-react-native';

import animatedCar from '../../assets/animated_car.json';

import {
  Container
} from './styles';

export function AnimatedLoading() {
  return(
    <Container>
      <LottieView
        source={animatedCar}
        style={{ height: 160 }}
        resizeMode="contain"
        autoPlay
        loop
      />
    </Container>
  );
};
