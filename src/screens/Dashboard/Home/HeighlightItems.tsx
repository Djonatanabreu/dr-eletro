import {
  FlatList,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import ScrollableProductItem from './ScrollableProductItem';
import { Colors } from 'components/Theme';
import api from 'services/api';
import { useCompanyStore } from 'store/company';
import { useEffect, useState } from 'react';
import { IProductHomeItemType } from './ScrollableProductItem/types';
import { useNavigation } from '@react-navigation/native';

export const HeilightItems = () => {
  const [productList, setProductList] = useState<IProductHomeItemType[]>([]);
  const { width, height } = useWindowDimensions();
  const { company_id } = useCompanyStore(state => state);

  const { navigate } = useNavigation();

  const fetchProductList = async () => {
    // setIsLoading(true);
    try {
      const { data: response } = await api.get('/lista_produtos.php', {
        params: {
          usuario_id: company_id,
        },
      });

      setProductList(response.data);
      // setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProductDetailsNavigate = product => {
    navigate('ProductRoutes', {
      screen: 'ProductDetails',
      params: { ...product },
    });
  };

  useEffect(() => {
    fetchProductList();
  }, []);

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

      <FlatList
        data={productList}
        key={item => item.id}
        renderItem={({ item }) => (
          <ScrollableProductItem
            imagem={item.imagem}
            titulo={item.titulo}
            valor={item.valor}
            handlerBuyProduct={() => handleProductDetailsNavigate(item)}
          />
        )}
        horizontal={true}
        contentContainerStyle={{
          gap: 5,
          marginTop: 5,
        }}
      />
    </View>
  );
};
