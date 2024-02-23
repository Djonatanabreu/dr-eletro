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
  iconButton?: boolean | 'left' | 'right';
  fontSize?: number;
  buttonWidth?: number | string;
  buttonHeight?: number | string;
  buttonColor?: colorNames;
}

export function NewButton({
  icon = lamp,
  buttonText = 'Text',
  iconButton = false,
  fontSize = 20,
  buttonWidth,
  buttonHeight,
  buttonColor = 'Base',
  ...props
}: INewButtonProps) {
  const { width } = useWindowDimensions();

  return (
    <TouchableOpacity
      style={{
        marginLeft: 5,
        backgroundColor: Colors[buttonColor],
        alignItems: 'center',
        justifyContent: 'center',
        width: buttonWidth || width / 2.2,
        height: buttonHeight || width / 8.5,
        borderRadius: 16,
        flexDirection: 'row',
      }}
      {...props}
    >
      {iconButton === 'left' && (
        <View
          style={{
            width: '20%',
            height: '85%',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 3,
          }}
        >
          <Image
            resizeMode="cover"
            source={icon}
            style={{
              width: width * 0.06,
              height: width * 0.06,
              marginRight: 6,
            }}
          />
        </View>
      )}
      <Text
        style={{
          color: '#fff',
          fontSize: fontSize,
          width: iconButton ? '60%' : '100%',
          textAlign: 'center',
          marginRight: iconButton ? 3 : 0,
          alignSelf: 'center',
        }}
      >
        {buttonText}
      </Text>
      {iconButton === 'right' && (
        <View
          style={{
            width: '20%',
            height: '85%',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 4,
          }}
        >
          <Image
            resizeMode="cover"
            source={icon}
            style={{ width: width * 0.06, height: width * 0.06 }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}
