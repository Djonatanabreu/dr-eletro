import { Text as RNText, StyleProp, TextStyle } from 'react-native';
import { colorNames, Colors } from '../Theme/Colors';

interface TextProps {
  children: React.ReactNode;
  color?: colorNames;
  size?: number;
  onPress?: () => void;
  textDecorationLine?: 'underline' | 'none';
  small?: boolean;
  regular?: boolean;
  textTransform?: TextStyle['textTransform'];
  fontWeight?: TextStyle['fontWeight'];
  letterSpacing?: TextStyle['letterSpacing'];
  fontFamily?: TextStyle['fontFamily'];
}

export const Text = ({
  children,
  onPress,
  color = 'White',
  size = 20,
  textDecorationLine,
  small,
  regular,
  fontWeight,
  textTransform,
  letterSpacing,
  fontFamily,
  ...rest
}: TextProps) => (
  <RNText
    onPress={onPress}
    style={{
      fontWeight: fontWeight,
      color: Colors[color],
      fontSize: size,
      textDecorationLine: textDecorationLine,
      width: (small && '45%') || (regular && '90%'),
      textTransform: textTransform,
      letterSpacing: letterSpacing,
      fontFamily: fontFamily,
    }}
    {...rest}
  >
    {children}
  </RNText>
);
