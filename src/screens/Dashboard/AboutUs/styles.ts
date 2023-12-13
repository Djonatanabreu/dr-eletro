import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';
import { Dimensions } from 'react-native';

export const PageStyle = {
  Image: styled.Image`
    width: ${parseInt(`${Math.floor(Dimensions.get('screen').width * 1.25)}`)};
    position: relative;
  `,
  Content: styled.View`
    padding: 0px 20px;
    gap: 5px;
  `,
  Text: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[22]};
    font-weight: 500;
    text-align: justify;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
  `,
  Title: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[22]};
    font-weight: 800;
    text-align: center;
    color: ${({ theme }: { theme: DefaultTheme }) => theme.primary};
  `,
};
