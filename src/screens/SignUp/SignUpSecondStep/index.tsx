import React, { useState } from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import { api } from '../../../services/api';

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from './styles';

export type ISignUpSecondStepParams = {
  user: {
    name: string,
    email: string,
    driverLicense: string
  }
};

export function SignUpSecondStep() {
  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const { user } = route.params as ISignUpSecondStepParams;
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleGoBack() {
    navigation.goBack();
  };

  async function handleRegister() {
    if(!password || !confirmPassword) {
      return Alert.alert('Oops', 'É necessário preencher os dois campos!')
    };

    if(password !== confirmPassword) {
      return Alert.alert('Oops', 'As senhas precisam ser iguais.')
    };

    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driverLicense,
      password,
    })
    .then(() => {
      navigation.navigate('Confirmation', {
        title: 'Conta criada!',
        message: 'Agora é só fazer login\ne aproveitar',
        nextScreenRouteName: 'SignIn'
      });
    })
    .catch((error: any) => {
      console.error(`file: src/screens/SignUp/SignUpSecondStep\nfunction: handleRegister\nerror: ${error.message}`);
      Alert.alert('Oops!', 'Não foi possível criar a conta.');
    });
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
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              placeholderTextColor={theme.colors.textDetail}
              onChangeText={setPassword}
              value={password}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Confirmar senha"
              placeholderTextColor={theme.colors.textDetail}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
            isEnabled={true}
            isLoading={false}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
