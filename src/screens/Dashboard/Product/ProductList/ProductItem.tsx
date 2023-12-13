import React from 'react';
import { PageStyle } from './styles';
import { IProductItemType } from './types';
import { NewButton } from 'components/Button/NewButton/NewButton';
import { width } from 'components/Theme/Responsive';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';
import { Colors } from 'components/Theme';

const ProductItem = ({
  titulo,
  description,
  imagem,
  onPress,
}: IProductItemType) => {
  return (
    <PageStyle.Content>
      <PageStyle.ProductItemContainer>
        <View
          style={{
            borderStyle: 'solid',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: Colors.Grey,
          }}
        >
          <PageStyle.ProductImage
            resizeMode="contain"
            source={{
              uri: imagem as string,
            }}
          />
        </View>
        <PageStyle.ProductContent>
          <PageStyle.ProductTitle ellipsizeMode="tail">
            {titulo}
          </PageStyle.ProductTitle>

          <PageStyle.ProductSummary>
            Descrição: {description}
          </PageStyle.ProductSummary>
          <PageStyle.SeeMore>
            <NewButton
              buttonText="Mais Informações"
              buttonHeight={width(8)}
              buttonWidth={width(40)}
              onPress={onPress}
              fontSize={width(4)}
            />
          </PageStyle.SeeMore>
        </PageStyle.ProductContent>
      </PageStyle.ProductItemContainer>
    </PageStyle.Content>
  );
};

export default ProductItem;
