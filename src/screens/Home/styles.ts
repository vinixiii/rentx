import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import { ICarDTO } from '../../dtos/ICarDTO';

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primaryBackground};
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: flex-end;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 32px 24px; 
`;

export const TotalCars = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.textDetail};
`;

export const CarList = styled(
    FlatList as new (props: FlatListProps<ICarDTO>) => FlatList<ICarDTO>
  ).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 24,
  },
})``;
