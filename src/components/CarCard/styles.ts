import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 126px;
  background-color: ${({ theme }) => theme.colors.secondaryBackground};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  margin-bottom: 16px;
`;

export const Details = styled.View`
  
`;

export const Brand = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const About = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-top: 16px;
`;

export const Rent = styled.View`
  margin-right: 24px;
`;

export const Period = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.textDetail};
  text-transform: uppercase;
`;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.secondary500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.main};
`;

export const Type = styled.View`
  
`;

export const CarImage = styled.Image`
  width: 167px;
  height: 85px;
`;
