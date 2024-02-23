import { Text } from 'components/Text/Text';
import { Colors } from 'components/Theme';
import { height, width } from 'components/Theme/Responsive';
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';

import { defaultTheme } from 'styles/default';

interface ICardContainerProps {
  name: string;
  handleCardPress: () => void;
  imagem: ImageSourcePropType;
}

export const CardContainer = ({
  name,
  handleCardPress,
  imagem,
}: ICardContainerProps) => {
  return (
    <TouchableOpacity
      onPress={handleCardPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: width(80),
        backgroundColor: Colors.Black,
        height: width(40),
        borderRadius: width(7),
      }}
    >
      <Image
        style={{
          width: '100%',
          height: '100%',
          borderRadius: width(7),
          position: 'absolute',
          opacity: 0.55,
        }}
        source={{
          uri: `https://www.app.duotecnologia.com/images/categorias-produtos/${imagem}`,
        }}
      />
      <Text
        fontFamily="Agrandir"
        letterSpacing={1}
        color="White"
        size={30}
        fontWeight="400"
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};
