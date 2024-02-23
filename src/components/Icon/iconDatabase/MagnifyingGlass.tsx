import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
export const MagnifyingGlass = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" {...props}>
    <Path
      fill="#FF8203"
      d="M11.965 0C5.35 0 0 5.227 0 11.69c0 6.464 5.35 11.691 11.965 11.691 2.361 0 4.547-.677 6.4-1.827L27.01 30 30 27.077l-8.534-8.316c1.534-1.967 2.464-4.403 2.464-7.07C23.93 5.226 18.58 0 11.965 0Zm0 2.75c5.067 0 9.15 3.99 9.15 8.94 0 4.951-4.083 8.94-9.15 8.94s-9.15-3.989-9.15-8.94c0-4.95 4.083-8.94 9.15-8.94Z"
    />
  </Svg>
);
