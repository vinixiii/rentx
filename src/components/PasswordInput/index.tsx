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
  iconName: React.ComponentProps<typeof Feather>['name']
}

export function PasswordInput({
  iconName,
  ...rest
} : IInputProps) {
  const theme = useTheme();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function handleChangePasswordVisibility() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return(
    <Container>
      <IconWrapper>
        <Feather
          name={iconName}
          size={20}
          color={theme.colors.text}
        />
      </IconWrapper>

      <TextInput
        secureTextEntry={isPasswordVisible}
        {...rest}
      />

      <VisibilityPasswordIconWrapper onPress={handleChangePasswordVisibility}>
        <Feather
          name={isPasswordVisible ? 'eye' : 'eye-off'}
          size={18}
          color={theme.colors.text}
        />
      </VisibilityPasswordIconWrapper>
    </Container>
  );
};
