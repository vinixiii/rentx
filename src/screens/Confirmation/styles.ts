import styled from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.header};
  padding-top: ${RFValue(48)}px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary600};
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  margin-top: ${RFValue(40)}px;
`;

export const Message = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  text-align: center;
  line-height: ${RFValue(25)}px;
  margin-top: ${RFValue(16)}px;
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  margin-top: ${RFValue(80)}px;
  margin-bottom: ${RFValue(46)}px;
`;
