import { width } from 'components/Theme/Responsive';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const PageStyle = {
  Content: styled.View`
    align-items: center;
    margin-vertical: 10px;
    width: ${width(28)}px;
    height: ${width(40)}px;
  `,
  Text: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[18]};
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

  ProductItemContainer: styled.View`
    flex-direction: row;
  `,

  ProductImage: styled.Image`
    width: ${Dimensions.get('screen').width * 0.22}px;
    height: ${Dimensions.get('screen').height * 0.11}px;
    border-radius: 4px;
  `,

  ProductContent: styled.View`
    flex: 1;
  `,

  ProductTitle: styled.Text`
    font-size: ${Math.floor(width(4))}px;
    font-weight: 400;
    align-self: center;
    text-align: center;
  `,

  ProductSummary: styled.Text`
    margin-vertical: 3px;
    text-align: justify;
    font-size: ${Number(Math.ceil(width(3)))}px;
    height: ${Number(Math.floor(width(20)))}px;
  `,
  SeeMore: styled.View`
    align-self: center;
  `,
};
