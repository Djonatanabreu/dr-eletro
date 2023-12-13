import { Dimensions } from 'react-native';

import { colorNames, Colors } from './Colors';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

interface ILayout {
  paddingHorizontal: number;
  window: {
    width: number;
    height: number;
  };
  isSmallDevice: boolean;
  activeOpacty: number;
  rippleColor: colorNames | string;
}

export const Layout: ILayout = {
  paddingHorizontal: width * (5 / 100),
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375 || height < 491,

  activeOpacty: 0.6,
  rippleColor: Colors.Grey,
};
