import React from 'react';
import { StatusBar } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ConfirmButton } from '../../components/ConfirmButton';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer
} from './styles';

export type IConfirmationParams = {
  title: string;
  message: string;
  nextScreenRouteName: string;
};

export function Confirmation() {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const route = useRoute();
  const { title, message, nextScreenRouteName } = route.params as IConfirmationParams;

  function handleConfirm() {
    console.log(nextScreenRouteName);
    navigation.navigate(nextScreenRouteName as any);
  }

  return(
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton
          title="Ok"
          onPress={handleConfirm}
        />
      </Footer>
    </Container>
  );
};
