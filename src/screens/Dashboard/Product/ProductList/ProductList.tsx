import { width } from 'components/Theme/Responsive';
import { ImageSourcePropType, ScrollView, View } from 'react-native';
import BackHeader from 'screens/_headers/Back';
import ProductItem from './ProductItem';
import api from 'services/api';
import { useCompanyStore } from 'store/company';
import { useEffect, useState } from 'react';
import { ProductListType } from './types';
import LoadingComponent from 'components/Loading';
import { Colors } from 'components/Theme';

interface IProductCategory {
  productCategoryName: string;
  productCategoryId: string;
}

export default function ProductList({ route, navigation }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productList, setProductList] = useState<ProductListType[]>([]);
  const [productCategory, setProductCategory] = useState<IProductCategory>({
    productCategoryName: '',
    productCategoryId: '',
  });
  const { productCategoryName, productCategoryId } = route.params!;

  useEffect(() => {
    setProductCategory({ productCategoryName, productCategoryId });
  }, []);

  const { company_id } = useCompanyStore(state => state);

  const fetchProductList = async () => {
    setIsLoading(true);
    try {
      const { data: response } = await api.get('/lista_produtos.php', {
        params: {
          usuario_id: company_id,
        },
      });
      const filteredProductList = response.data.filter(
        ({ categorias_produtos_id }: { categorias_produtos_id: string }) => {
          return String(productCategoryId) === String(categorias_produtos_id);
        }
      );
      setProductList(filteredProductList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // const filterProductByCategory = () => {
  //   const filteredProductList = productList.filter(product => {
  //     return (
  //       String(productCategoryId) === String(product.categorias_produtos_id)
  //     );
  //   });
  //   console.log(filteredProductList);
  // };

  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <ScrollView
      style={{
        paddingHorizontal: width(5),
        paddingVertical: width(5),
        backgroundColor: Colors.White,
      }}
    >
      {!isLoading ? (
        <>
          <BackHeader title={productCategoryName} />
          <View style={{ marginBottom: width(10) }}>
            {productList.map(product => {
              return (
                <ProductItem
                  key={product.id}
                  onPress={() =>
                    navigation.navigate('ProductDetails', {
                      ...product,
                      category: productCategory.productCategoryName,
                    })
                  }
                  description={product.resumo}
                  titulo={product.titulo}
                  imagem={
                    `https://www.app.duotecnologia.com/images/produtos/${product.imagem}` as ImageSourcePropType
                  }
                />
              );
            })}
          </View>
        </>
      ) : (
        <LoadingComponent isVisible={isLoading} />
      )}
    </ScrollView>
  );
}
