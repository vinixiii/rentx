import React from 'react';
import { useTheme } from 'styled-components';
import { SvgProps } from 'react-native-svg';

import {
  Container,
  Name
} from './styles';

interface IAccessoryProps {
  name: string;
  icon: React.FC<SvgProps>;
}

export function Accessory({ 
  name,
  icon: Icon
} : IAccessoryProps) {
  const theme = useTheme();

  return(
    <Container>
      <Icon 
        width={32}
        height={32}
        fill={theme.colors.title}
      />
      <Name>{name}</Name>
    </Container>
  );
};
