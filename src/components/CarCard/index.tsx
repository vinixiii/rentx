import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { ICarDTO } from '../../dtos/ICarDTO';

import GasolineSvg from '../../assets/gasoline.svg';

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage
} from './styles';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface ICarCardProps extends RectButtonProps {
  data: ICarDTO;
};

export function CarCard({ data, ...rest } : ICarCardProps) {
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return(
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{ uri: data.thumbnail }}
        resizeMode="contain"
      />
    </Container>
  );
};
