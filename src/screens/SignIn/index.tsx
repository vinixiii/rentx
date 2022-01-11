import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Form,
  Footer,
  ButtonWrapper
} from './styles';

export function SignIn() {
  const theme = useTheme();

  return(
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <Title>
          Estamos {'\n'}
          quase lá
        </Title>

        <Subtitle>
          Faça seu login para começar {'\n'}
          uma experiência incrível.
        </Subtitle>
      </Header>

      <Form>
        <Input
          iconName="mail"
          placeholder="E-mail"
          placeholderTextColor={theme.colors.textDetail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <PasswordInput
          iconName="lock"
          placeholder="Senha"
          placeholderTextColor={theme.colors.textDetail}
        />
      </Form>

      <Footer>
        <ButtonWrapper>
          <Button
            title="Entrar"
            onPress={() => {}}
            isEnabled={false}
            isLoading={false}
          />
        </ButtonWrapper>
        <Button
          title="Criar conta gratuita"
          onPress={() => {}}
          color={theme.colors.secondaryBackground}
          isEnabled={false}
          isLoading={false}
          isLight
        />
      </Footer>
    </Container>
  );
};
