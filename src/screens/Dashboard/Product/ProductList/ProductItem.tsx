import React from 'react';
import { PageStyle } from './styles';
import { IProductItemType } from './types';
import { NewButton } from 'components/Button/NewButton/NewButton';
import { width } from 'components/Theme/Responsive';
import { Text } from 'components/Text/Text';
import { View } from 'react-native';
import { Colors } from 'components/Theme';
import { Spacer } from 'components/Spacer/Spacer';
import { whatsapp } from 'assets/img';

const ProductItem = ({
  titulo,
  description,
  imagem,
  onPress,
}: IProductItemType) => {
  return (
    <PageStyle.Content>
      <PageStyle.ProductItemContainer>
        <PageStyle.ProductContent>
          <View
            style={{
              borderStyle: 'solid',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: Colors.Grey,
              alignSelf: 'center',
            }}
          >
            <PageStyle.ProductImage
              resizeMode="contain"
              source={{
                uri: imagem as string,
              }}
            />
          </View>
          <Spacer amount={0.5} />
          <PageStyle.ProductTitle numberOfLines={2} ellipsizeMode="tail">
            {titulo}
          </PageStyle.ProductTitle>

          {/* <PageStyle.ProductSummary>
            Descrição: {description}
          </PageStyle.ProductSummary> */}
          <PageStyle.SeeMore>
            <Spacer amount={0.5} />
            <NewButton
              buttonText="Comprar"
              buttonHeight={width(6)}
              buttonWidth={width(20)}
              onPress={onPress}
              fontSize={width(3)}
            />
          </PageStyle.SeeMore>
        </PageStyle.ProductContent>
      </PageStyle.ProductItemContainer>
    </PageStyle.Content>
  );
};

export default ProductItem;
