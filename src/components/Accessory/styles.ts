import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  min-width: 26%;
  height: 92px;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
  margin-right: 12px;
  margin-bottom: 12px;
  padding: 16px;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.text};
`;
