import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
`;

export const IconWrapper = styled.View`
  width: 56px;
  height: 56px;
  margin-right: 2px;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  align-items: center;
  justify-content: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  padding: 0 24px;
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
`;
