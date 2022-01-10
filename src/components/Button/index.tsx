import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

import {
  Container,
  Title
} from './styles';

interface IButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  isEnabled?: boolean;
  isLoading?: boolean;
}

export function Button({
  title,
  color,
  isEnabled = true,
  isLoading = false,
  ...rest
} : IButtonProps) {
  const theme = useTheme();

  console.log('----------');
  console.log('isEnabled:', isEnabled);
  console.log('isLoading:', isLoading);

  return(
    <Container
      color={color}
      enabled={isEnabled}
      style={{ opacity: (isEnabled === false || isLoading === true) ? 0.5 : 1 }}
      {...rest}
    >
      {
        isLoading
        ? <ActivityIndicator color={theme.colors.shape} />
        : <Title>{title}</Title>
      }
    </Container>
  );
};
