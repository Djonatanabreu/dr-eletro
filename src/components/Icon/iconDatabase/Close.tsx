import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const CloseIcon = (props: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 35 35" fill="none" {...props}>
    <Path
      stroke="#737373"
      strokeWidth={6}
      d="m2.415 2 30.67 31.5M33.5 2.414 2 33.086"
    />
  </Svg>
);
