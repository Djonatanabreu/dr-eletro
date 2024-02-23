import { whatsapp } from 'assets/img';
import { NewButton } from 'components/Button/NewButton/NewButton';
import { Spacer } from 'components/Spacer/Spacer';
import { Text } from 'components/Text/Text';
import { Colors } from 'components/Theme';
import { width } from 'components/Theme/Responsive';
import { useEffect, useState } from 'react';
import { Image, Linking, ScrollView, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import BackHeader from 'screens/_headers/Back';
import OrderConfirmationModal from '../OrderConfirmationModal';
import { useUserStore } from 'store/user';

export default function ProductDetails({ route, navigation }: any) {
  const [visible, setVisible] = useState<boolean>(false);
  const productUnit = route?.params!;

  const { user } = useUserStore(state => state);

  useEffect(() => {
    route;
  }, []);

  console.log(user, route);

  return (
    <ScrollView
      style={{
        paddingHorizontal: width(5),
        backgroundColor: Colors.White,
        marginVertical: width(5),
      }}
    >
      <Spacer amount={2} />
      <BackHeader title={'Produto'} />
      <View style={{ alignItems: 'center' }}>
        <Spacer amount={1.5} />
        <Text color="MediumGrey" size={24}>
          {productUnit.category}
        </Text>
        <Spacer amount={2} />
        <View
          style={{
            borderRadius: width(6),
            borderStyle: 'solid',
            borderWidth: 1.5,
            borderColor: Colors.Grey,
          }}
        >
          <Image
            style={{ borderRadius: width(6) }}
            width={width(80)}
            height={width(80)}
            source={{
              uri: `https://www.app.duotecnologia.com/images/produtos/${productUnit.imagem}`,
            }}
          />
        </View>
        <Spacer amount={2} />
        <Text color="MediumGrey" size={30}>
          {productUnit.titulo}
        </Text>
        <Spacer amount={2} />
        <Text fontWeight={'800'} color="Base" size={24}>
          R$:{productUnit.valor}
        </Text>
        <Spacer amount={2} />
        <View style={{ width: width(90) }}>
          <RenderHTML
            contentWidth={width(90)}
            source={{
              html: `<div style='margin:0px; padding: 0px; text-align: justify'>Descrição:${productUnit.descricao}</div>`,
            }}
          />
        </View>
        <View>
          <Spacer amount={2} />
          <NewButton
            onPress={() => {
              setVisible(true);
            }}
            fontSize={18}
            buttonText="Comprar"
            buttonHeight={width(12)}
            buttonWidth={width(35)}
            iconButton={'left'}
            icon={whatsapp}
          />
          <Spacer amount={4} />
        </View>
        <OrderConfirmationModal
          onCloseModal={() => {
            navigation.navigate('LoginRoutes', {
              screen: 'login',
            });
            setVisible(false);
          }}
          onConfirm={() => {
            Linking.openURL(
              `${productUnit.link_compra}&text=Gostaria de adquirir o produto: ${productUnit.titulo}. Para entregar no meu endereço Cep: ${user?.cep}. Bairro: ${user?.bairro}. Rua: ${user?.logradouro}, Numero: ${user?.numero}.`
            );
            setVisible(false);
          }}
          isVisible={visible}
          onClose={() => setVisible(false)}
        />
      </View>
    </ScrollView>
  );
}
