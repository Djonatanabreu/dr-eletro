import Button from 'components/Button';
import { OrderCardContainer } from 'components/CardContainer/OrderCardContainer';
import { Spacer } from 'components/Spacer/Spacer';
import { Text } from 'components/Text/Text';
import { Colors } from 'components/Theme';
import { width } from 'components/Theme/Responsive';
import { Title } from 'components/commons';
import { useEffect, useState } from 'react';
import { ImageSourcePropType, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BackHeader from 'screens/_headers/Back';
import api from 'services/api';
import useAuthStore from 'store/auth';
import { useCompanyStore } from 'store/company';
import { useUserStore } from 'store/user';

interface IOderUnitProps {
  id: string;
  status_venda_id: string;
  clientes_app_id: string;
  codigo: string;
  produtos_id: string;
}

interface IClientOrderListProps {
  titulo: string;
  valor: string;
  status_venda_id: number;
  imagem: ImageSourcePropType;
}

export default function Orders({ navigation }) {
  const [orderData, setOrderData] = useState<IClientOrderListProps[]>([]);
  const [clientOrderList, setClientOrderList] = useState([]);
  const { company_id } = useCompanyStore(state => state);
  const setSigned = useAuthStore(state => state.setSigned);
  const { user } = useUserStore();

  const fetchOrdersList = async () => {
    try {
      const response = await api.get('/lista_vendas.php', {
        params: { usuario_id: company_id },
      });

      const filterOrdersByClient = () => {
        return response.data.filter(order => {
          return order.clientes_app_id === user?.id;
        });
      };

      const { data: res } = await api.get('/lista_produtos.php', {
        params: { usuario_id: company_id },
      });

      const dataOrders: any = [];

      filterOrdersByClient().forEach(({ produtos_id, valor, ...rest }) => {
        const orderProducts = res.data.find(({ id }) => {
          return produtos_id === id;
        });
        if (!orderProducts) {
          return;
        }
        dataOrders.push({ ...orderProducts, ...rest, order_value: valor });
      });

      setClientOrderList(filterOrdersByClient());
      setOrderData(dataOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrdersList();
  }, []);

  return (
    <ScrollView
      style={{ paddingHorizontal: width(5), backgroundColor: Colors.White }}
    >
      <BackHeader title="Minhas Compras" />
      {!user ? (
        <View
          style={{ width: '80%', alignSelf: 'center', gap: 20, marginTop: 150 }}
        >
          <Title>
            Olá, se deseja usar o app completo, finalize o seu cadastro ou entre
            com uma conta!
          </Title>
          <Button
            onPress={() => {
              setSigned(true);
              navigation.navigate('LoginRoutes', {
                screen: 'login',
              });
            }}
            label="Login"
            color="primary"
            variantType="block"
          />
        </View>
      ) : (
        <>
          <Spacer amount={5} />
          <View style={{ alignItems: 'center', gap: width(5) }}>
            <View>
              <OrderCardContainer productOrdersItems={orderData} />
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}
