import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface IProps {
  isFocused: boolean;
};

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

export const IconWrapper = styled.View<IProps>`
  width: 56px;
  height: 56px;
  margin-right: 2px;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  align-items: center;
  justify-content: center;

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `};
`;

export const TextInput = styled.TextInput<IProps>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  padding-left: 24px;
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};

  ${({ theme, isFocused }) => isFocused && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main};
  `};
`;

export const VisibilityPasswordIconWrapper = styled(RectButton)`
  width: 56px;
  height: 56px;
  align-items: center;
  justify-content: center;
`;
