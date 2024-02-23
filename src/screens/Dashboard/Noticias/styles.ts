import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { DefaultTheme } from 'styles/default';

export const PageStyle = {
  Content: styled.View`
    width: 100%;
    gap: 10px;
    margin-bottom: 50px;
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

  NewsItemContainer: styled.View`
    flex-direction: row;
    margin: 10px;
  `,

  NewsImage: styled.Image`
    width: ${Dimensions.get('screen').width * 0.42}px;
    height: ${Dimensions.get('screen').height * 0.13}px;
    border-radius: 4px;
    gap: 8px;
  `,

  NewsContent: styled.View`
    flex: 1;
    margin-left: 10px;
  `,

  NewsTitle: styled.Text`
    font-size: 14px;
    font-weight: 400;
  `,

  NewsSummary: styled.Text`
    margin-top: 5px;
    font-size: 14px;
  `,
  SeeMore: styled.Text`
    margin-top: 5px;
    font-size: 10px;
    align-self: flex-end;
  `,
};
