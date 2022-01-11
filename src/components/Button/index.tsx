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
  isLight?: boolean;
}

export function Button({
  title,
  color,
  isEnabled = true,
  isLoading = false,
  isLight = false,
  ...rest
} : IButtonProps) {
  const theme = useTheme();

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
        : <Title isLight={isLight}>{title}</Title>
      }
    </Container>
  );
};
