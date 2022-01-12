import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  IconWrapper,
  TextInput
} from './styles';

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
};

export function Input({
  iconName,
  value,
  ...rest
} : IInputProps) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  };

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  return(
    <Container>
      <IconWrapper isFocused={isFocused}>
        <Feather
          name={iconName}
          size={20}
          color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text}
        />
      </IconWrapper>
      <TextInput
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
    </Container>
  );
};
