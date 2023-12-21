import { width } from 'components/Theme/Responsive';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const PageStyle = {
  Content: styled.View``,
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
    margin: 10px;
  `,

  ProductImage: styled.Image`
    width: ${Dimensions.get('screen').width * 0.22}px;
    border-radius: 4px;
  `,

  ProductContent: styled.View`
    flex: 1;
    margin-left: 10px;
  `,

  ProductTitle: styled.Text`
    font-size: ${Math.floor(width(4.5))};
    font-weight: 400;
  `,

  ProductSummary: styled.Text`
    margin-vertical: 3px;
    text-align: justify;
    font-size: ${Number(Math.ceil(width(3)))};
    height: ${Number(Math.floor(width(20)))};
  `,
  SeeMore: styled.View`
    align-self: center;
  `,
};
