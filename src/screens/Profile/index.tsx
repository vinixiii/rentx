import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import * as ImagePicker from 'expo-image-picker';

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
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  
  function handleSignOut() {
    console.log('Oi');
  };

  function handleOptionChange(selectedOption: 'dataEdit' | 'passwordEdit') {
    setOption(selectedOption);
  };

  async function handleAvatarSelect() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if(result.cancelled) {
      return;
    }

    if(result.uri) {
      setAvatar(result.uri);
    }
  }

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
              { !!avatar && <Photo source={{ uri: avatar }} /> }
              <AddPhotoButton onPress={handleAvatarSelect}>
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
                    onChangeText={setName}
                  />
                  <Input
                    iconName="mail"
                    editable={false}
                    defaultValue={user.email}
                  />
                  <Input
                    iconName="credit-card"
                    placeholder="CNH"
                    placeholderTextColor={theme.colors.textDetail}
                    keyboardType="numeric"
                    defaultValue={user.driver_license}
                    onChangeText={setDriverLicense}
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
