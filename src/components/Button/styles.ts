import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

interface IButtonProps {
  color?: string;
}

interface ITextProps {
  isLight?: boolean;
}

export const Container = styled(RectButton) <IButtonProps>`
  width: 100%;
  padding: 18px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.main
  };
`;

export const Title = styled.Text<ITextProps>`
  font-family: ${({ theme }) => theme.fonts.primary500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, isLight }) => isLight ? theme.colors.title : theme.colors.shape};
`;
