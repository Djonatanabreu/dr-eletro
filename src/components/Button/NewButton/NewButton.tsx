import { lamp } from 'assets/img';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  useWindowDimensions,
} from 'react-native';
import { Text } from 'react-native';
import { Colors, colorNames } from './../../Theme/Colors';

interface INewButtonProps extends TouchableOpacityProps {
  icon?: ImageSourcePropType;
  buttonText: string;
  iconButton?: boolean;
  fontSize?: number;
  buttonWidth?: number | string;
  buttonHeight?: number | string;
}

export function NewButton({
  icon = lamp,
  buttonText = 'Text',
  iconButton = false,
  fontSize = 20,
  buttonWidth,
  buttonHeight,

  ...props
}: INewButtonProps) {
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity
      style={{
        marginLeft: 5,
        backgroundColor: Colors.Base,
        alignItems: 'center',
        justifyContent: 'center',
        width: buttonWidth || width / 2.2,
        height: buttonHeight || width / 8.5,
        borderRadius: 16,
        flexDirection: 'row',
      }}
      {...props}
    >
      <Text
        style={{
          color: '#fff',
          fontSize: fontSize,
          width: iconButton ? '60%' : '100%',
          paddingHorizontal: 4,
          textAlign: 'center',
          marginLeft: 8,
        }}
      >
        {buttonText}
      </Text>
      {iconButton && (
        <View
          style={{
            width: '20%',
            height: '85%',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 4,
          }}
        >
          <Image source={icon} style={{ width: 30, height: 30 }} />
        </View>
      )}
    </TouchableOpacity>
  );
}
