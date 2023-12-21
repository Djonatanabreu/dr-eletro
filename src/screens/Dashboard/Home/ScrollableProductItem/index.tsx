import React from 'react';

import { IProductItemType } from 'screens/Dashboard/Product/ProductList/types';
import { width } from 'components/Theme/Responsive';
import { Image, View } from 'react-native';
import { Text } from 'components/Text/Text';
import { NewButton } from 'components/Button/NewButton/NewButton';
import { Spacer } from 'components/Spacer/Spacer';

const ScrollableProductItem = ({
  titulo,
  description,
  imagem,
  onPress,
}: IProductItemType) => {
  return (
    <View style={{ width: width(20), height: 140, alignItems: 'center' }}>
      <Image
        style={{ width: 80, height: 70 }}
        source={{
          uri: 'https://www.app.duotecnologia.com/images/produtos/forno-eletrico-29.jpg',
        }}
      />
      <Text color="Alternative" size={14}>
        {'Title of Item'}
      </Text>
      <Spacer amount={0.5} />
      <Text color="Alternative" size={14}>
        R$: {'320,30'}
      </Text>
      <Spacer amount={0.9} />
      <NewButton
        buttonText="Comprar"
        buttonHeight={20}
        buttonWidth={70}
        fontSize={10}
      />
    </View>
  );
};

export default ScrollableProductItem;
