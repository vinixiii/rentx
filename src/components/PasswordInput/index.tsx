import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  IconWrapper,
  TextInput,
  VisibilityPasswordIconWrapper
} from './styles';

interface IInputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>['name'];
  value?: string;
};

export function PasswordInput({
  iconName,
  value,
  ...rest
} : IInputProps) {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);  
  
  function handleInputFocus() {
    setIsFocused(true);
  };
  
  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  function handleChangePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
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
        secureTextEntry={isPasswordVisible}
        isFocused={isFocused}
        {...rest}
      />

      <IconWrapper isFocused={isFocused}>
        <VisibilityPasswordIconWrapper
          onPress={handleChangePasswordVisibility}
        >
          <Feather
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={18}
            color={theme.colors.text}
          />
        </VisibilityPasswordIconWrapper>
      </IconWrapper>
    </Container>
  );
};
