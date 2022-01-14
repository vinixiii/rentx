import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  AddPhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles';

export function Profile() {
  const theme = useTheme();
  const { user } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
  
  function handleSignOut() {
    console.log('Oi');
  };

  function handleOptionChange(selectedOption: 'dataEdit' | 'passwordEdit') {
    setOption(selectedOption);
  };

  return(
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <HeaderTitle>Editar perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather
                  name="power"
                  size={24}
                  color={theme.colors.shape}
                />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              <Photo source={{ uri: 'https://github.com/vinixiii.png' }} />
              <AddPhotoButton onPress={handleSignOut}>
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.shape}
                />
              </AddPhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() + 24 }}>
            <Options>
              <Option
                active={option === 'dataEdit'}
                onPress={() => handleOptionChange('dataEdit')}
              >
                <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === 'passwordEdit'}
                onPress={() => handleOptionChange('passwordEdit')}
              >
                <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
              </Option>
            </Options>
            
            {
              option === 'dataEdit' ? (
                <Section>
                  <Input
                    iconName="user"
                    placeholder="Nome"
                    placeholderTextColor={theme.colors.textDetail}
                    defaultValue={user.name}
                    // onChangeText={setName}
                    // value={name}
                  />
                  <Input
                    iconName="mail"
                    editable={false}
                    defaultValue={user.email}
                    // onChangeText={setEmail}
                    // value={email}
                  />
                  <Input
                    iconName="credit-card"
                    placeholder="CNH"
                    placeholderTextColor={theme.colors.textDetail}
                    keyboardType="numeric"
                    defaultValue={user.driver_license}
                    // onChangeText={setDriverLicense}
                    // value={driverLicense}
                  />
                </Section>
              ) : (
                <Section>
                  <PasswordInput
                    iconName="lock"
                    placeholder="Senha atual"
                    placeholderTextColor={theme.colors.textDetail}
                    // onChangeText={setName}
                    // value={name}
                  />
                  <PasswordInput
                    iconName="lock"
                    placeholder="Nova senha"
                    placeholderTextColor={theme.colors.textDetail}
                    // onChangeText={setName}
                    // value={name}
                  />
                  <PasswordInput
                    iconName="lock"
                    placeholder="Confirmar nova senha"
                    placeholderTextColor={theme.colors.textDetail}
                    // onChangeText={setName}
                    // value={name}
                  />
                </Section>
              )
            }
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
