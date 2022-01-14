import styled, { css } from 'styled-components/native';
import { BorderlessButton, GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';

interface IOptionProps {
  active: boolean
}

export const Container = styled(GestureHandlerRootView)`
  background-color: ${({ theme }) => theme.colors.primaryBackground};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(227)}px;
  background-color: ${({ theme }) => theme.colors.header};
  padding: 0 24px;
  align-items: center;
`;

export const HeaderTop = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${getStatusBarHeight() + 18}px;
`;

export const HeaderTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary600};
  font-size: ${RFValue(25)}px;
  color: ${({ theme }) => theme.colors.secondaryBackground};
`;

export const LogoutButton = styled(BorderlessButton)`
  position: absolute;
  top: 6px;
  right: 0;
`;

export const PhotoContainer = styled.View`
  width: ${RFValue(185)}px;
  height: ${RFValue(185)}px;
  border-radius: ${RFValue(90)}px;
  background-color: ${({ theme }) => theme.colors.primaryBackground};
  margin-top: ${RFValue(48)}px;
  align-items: center;
  justify-content: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(180)}px;
  height: ${RFValue(180)}px;
  border-radius: ${RFValue(90)}px;
`;

export const AddPhotoButton = styled(RectButton)`
  width: ${RFValue(40)}px;
  height: ${RFValue(40)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.main};
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const Content = styled.View`
  padding: 0 24px;
  margin-top: ${RFValue(132)}px;
`;

export const Options = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.line};
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: ${RFValue(24)}px;
`;

export const Option = styled.TouchableOpacity<IOptionProps>`
  padding-bottom: ${RFValue(14)}px;
  ${({ theme, active }) => active && css`
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.main}
  `};
`;

export const OptionTitle = styled.Text<IOptionProps>`
  font-family: ${({ theme, active }) => active
    ? theme.fonts.secondary600 : theme.fonts.secondary400
  };
  font-size: ${RFValue(20)}px;
  color: ${({ theme, active }) => active
    ? theme.colors.title : theme.colors.textDetail
  };
`;

export const Section = styled.View``;
