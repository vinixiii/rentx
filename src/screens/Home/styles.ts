import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.primaryBackground};
`;

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary400};
  font-size: 24px;
`;
