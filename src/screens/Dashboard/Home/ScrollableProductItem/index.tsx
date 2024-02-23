import React from 'react';

import { width } from 'components/Theme/Responsive';
import { Image, View } from 'react-native';
import { Text } from 'components/Text/Text';
import { NewButton } from 'components/Button/NewButton/NewButton';
import { Spacer } from 'components/Spacer/Spacer';
import { IProductHomeItemType } from './types';

const ScrollableProductItem = ({
  titulo,
  description,
  imagem,
  valor,
  handlerBuyProduct,
}: IProductHomeItemType) => {
  return (
    <View
      style={{
        width: width(24),
        height: width(36),
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Image
        style={{ width: width(20), height: width(20) }}
        source={{
          uri: `https://www.app.duotecnologia.com/images/produtos/${imagem}`,
        }}
      />
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        textAlign="center"
        color="Alternative"
        size={12}
      >
        {titulo}
      </Text>
      <Spacer amount={0.5} />
      <Text color="Alternative" size={12}>
        R$: {valor}
      </Text>
      <Spacer amount={0.9} />
      <NewButton
        buttonText="Comprar"
        buttonHeight={20}
        buttonWidth={70}
        fontSize={10}
        onPress={handlerBuyProduct}
      />
    </View>
  );
};

export default ScrollableProductItem;
