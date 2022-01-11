import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  IconWrapper,
  TextInput
} from './styles';

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function Input({
  iconName,
  ...rest
} : IInputProps) {
  const theme = useTheme();

  return(
    <Container>
      <IconWrapper>
        <Feather
          name={iconName}
          size={20}
          color={theme.colors.text}
        />
      </IconWrapper>
      <TextInput {...rest} />
    </Container>
  );
};
