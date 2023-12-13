import styled from 'styled-components/native';
import { DefaultTheme, defaultTheme } from '../../styles/default';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

export const Container = styled.View`
  flex: 1;
  padding: 10px 0px;
  background-color: ${defaultTheme.secondary};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  max-height: ${height * 0.9}px;
`;

export const HeaderStyle = {
  Title: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[26]};
    color: #000;
    padding: 0px 10px;
    font-family: 'Agrandir';
    z-index: 5;
  `,
  Content: styled.View``,
  Footer: styled.View`
    margin-top: auto;
    align-items: center;
  `,
  Center: styled.View`
    padding-left: 5px;
    gap: ${Math.floor(height * 0.025)}px;
  `,
  Img: styled.Image`
    height: 255px;
    width: 100%;
  `,
  Text: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[12]};
    color: #fff;
    font-family: 'Agrandir';
  `,
  Item: styled.TouchableOpacity`
    align-items: center;
    flex-direction: row;
  `,
  Name: styled.Text`
    font-size: ${({ theme }: { theme: DefaultTheme }) => theme.fonts.size[18]};
    font-family: 'Agrandir';
    color: #fff;
  `,
};
