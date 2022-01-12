import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';

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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');

  const schema = yup.object().shape({
    driverLicense: yup
      .string()
      .required('A CNH é obrigatória.'),
    email: yup
      .string()
      .required('O email é obrigatório.')
      .email('Digite um email válido!'),
    name: yup
      .string()
      .required('O nome é obrigatório.'),
  });

  function handleGoBack() {
    navigation.goBack();
  };

  async function handleNextStep() {
    try {
      const data = { name, email, driverLicense };
      await schema.validate(data);

      navigation.navigate('SignUpSecondStep', { user: data });
    } catch (error: any) {
      if(error instanceof yup.ValidationError) Alert.alert('Oops!', error.message); 
    }
  };

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
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="Email"
              placeholderTextColor={theme.colors.textDetail}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              placeholderTextColor={theme.colors.textDetail}
              keyboardType="numeric"
              onChangeText={setDriverLicense}
              value={driverLicense}
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
