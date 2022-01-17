import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useNetInfo } from '@react-native-community/netinfo';

import { Car as CarModel } from '../../database/models/Car';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

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
import theme from '../../global/styles/theme';

interface ICarCardProps extends RectButtonProps {
  data: CarModel;
};

export function CarCard({ data, ...rest } : ICarCardProps) {
  const netInfo = useNetInfo();
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return(
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>
              R$ {netInfo.isConnected === true ? data.price : '...' }
            </Price>
          </Rent>

          <Type>
            <MotorIcon fill={theme.colors.textDetail} />
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
