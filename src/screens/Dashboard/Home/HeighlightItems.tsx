import { ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { defaultTheme } from 'styles/default';
import ProductItem from '../Product/ProductList/ProductItem';
import ScrollableProductItem from './ScrollableProductItem';
import { Colors } from 'components/Theme';

export const HeilightItems = ({}) => {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        width: width * 0.84,
        height: width * 0.5,
        padding: 8,
        gap: 3,
      }}
    >
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 16,
          color: Colors.Alternative,
          fontWeight: 500,
          marginTop: 3,
        }}
      >
        Produtos em Destaque
      </Text>

      <ScrollView
        style={{
          height: '60%',
        }}
      >
        <ScrollableProductItem />
      </ScrollView>
    </View>
  );
};
