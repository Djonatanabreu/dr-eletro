import styled from 'styled-components/native';
import { DefaultTheme } from '../../../styles/default';
import { Colors } from 'components/Theme';

export const Container = styled.View`
  justify-content: center;
  background-color: transparent;
  height: 60px;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
`;

export const Title = styled.Text`
  font-weight: 400;
  text-align: center;
  font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[22]};
  font-family: 'Agrandir';
  color: ${({ theme }: { theme: DefaultTheme }) => Colors.Secondary};
`;
