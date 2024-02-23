import { Spacer } from 'components/Spacer/Spacer';
import { Text } from 'components/Text/Text';
import { Colors } from 'components/Theme';
import { width } from 'components/Theme/Responsive';

import { ImageSourcePropType, View } from 'react-native';
import { OrderProductUnit } from './OrderProductUnit';
import api from 'services/api';
import { useCompanyStore } from 'store/company';
import { useState } from 'react';

interface IOderCardProps {
  productOrdersItems: {
    titulo: string;
    valor: string;
    codigo: string;
    imagem: ImageSourcePropType;
    produtos_id: string;
    status_venda_id: string;
  }[];
}

export const OrderCardContainer = ({
  productOrdersItems = [],
}: IOderCardProps) => {
  const totalPrice = productOrdersItems.reduce((total, product) => {
    return total + parseFloat(product.valor);
  }, 0);

  return (
    <View>
      <View style={{ gap: width(5) }}>
        {productOrdersItems.map(product => {
          return (
            <View
              key={product.codigo}
              style={{
                width: width(85),
                backgroundColor: Colors.LightGrey,
                borderRadius: width(4),
                padding: 10,
              }}
            >
              <OrderProductUnit
                codigo={product.codigo}
                statusColor={
                  product.status_venda_id === '1'
                    ? Colors.Secondary
                    : product.status_venda_id === '2'
                    ? Colors.Base
                    : Colors.Red
                }
                status={
                  product.status_venda_id === '1'
                    ? 'Aguardando'
                    : product.status_venda_id === '2'
                    ? 'Aprovada'
                    : 'Cancelada'
                }
                title={product.titulo}
                price={product.valor}
                image={product.imagem}
              />
              <Spacer amount={4} />
              <View style={{ alignItems: 'flex-end' }}>
                {/* TOTAL PRICE <Text fontWeight="600" size={18} color="MediumGrey">
                  Total: R$ {totalPrice.toFixed(2)}
                </Text> */}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};
