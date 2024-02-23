import { CardContainer } from 'components/CardContainer/CardContainer';

import { Colors } from 'components/Theme';
import { width } from 'components/Theme/Responsive';
import { useEffect, useState } from 'react';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import BackHeader from 'screens/_headers/Back';
import api from 'services/api';
import { useCompanyStore } from 'store/company';

interface IProductCategoryUnit {
  id: string;
  nome: string;
  imagem: ImageSourcePropType;
}

export default function ProductCategoryList({ route, navigation }: any) {
  const [productCategoryList, setProductCategoryList] = useState<
    IProductCategoryUnit[]
  >([]);
  const { company_id } = useCompanyStore(state => state);

  const fetchProductCategoryList = async () => {
    try {
      const { data: response } = await api.get('/categorias_produtos.php', {
        params: {
          usuario_id: company_id,
        },
      });
      setProductCategoryList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductCategoryList();
  }, []);

  return (
    <ScrollView
      style={{
        paddingHorizontal: width(10),
        paddingVertical: width(5),
        backgroundColor: Colors.White,
      }}
    >
      <View style={{ gap: 15 }}>
        <BackHeader title="Produtos" />
        <View style={{ gap: 25, alignItems: 'center' }}>
          {productCategoryList.map(category => {
            return (
              <CardContainer
                imagem={category.imagem}
                handleCardPress={() =>
                  navigation.navigate('ProductRoutes', {
                    screen: 'ProductList',
                    params: {
                      productCategoryId: category.id,
                      productCategoryName: category.nome,
                    },
                  })
                }
                key={Math.random()}
                name={category.nome}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
