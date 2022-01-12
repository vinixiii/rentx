import React from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from './styles';

export function SignUpFirstStep() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleNextStep() {
    navigation.navigate('SignUpSecondStep');
  }

  return(
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleGoBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua{'\n'}conta</Title>
          <Subtitle>Faça seu cadastro de{'\n'}forma rápida e fácil.</Subtitle>

          <Form>
            <FormTitle>1. Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              placeholderTextColor={theme.colors.textDetail}
            />
            <Input
              iconName="mail"
              placeholder="Email"
              placeholderTextColor={theme.colors.textDetail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              placeholderTextColor={theme.colors.textDetail}
              keyboardType="numeric"
            />
          </Form>
          <Button
            title="Próximo"
            onPress={handleNextStep}
            isEnabled={true}
            isLoading={false}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
