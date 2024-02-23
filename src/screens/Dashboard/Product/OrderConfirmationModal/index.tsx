import { useState } from 'react';
import { View, Modal } from 'react-native';

import { height, width } from 'components/Theme/Responsive';
import { Text } from 'components/Text/Text';
import { Colors } from 'components/Theme';
import { NewButton } from 'components/Button/NewButton/NewButton';
import { ScrollView } from 'react-native-gesture-handler';
import { useUserStore } from 'store/user';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'components/Icon/Icon';
import { whatsapp } from 'assets/img';
import { Spacer } from 'components/Spacer/Spacer';
import { ButtonText } from 'screens/Auth/Login/styles';
import { useNavigation } from '@react-navigation/native';
import { Title } from 'components/commons';
import Button from 'components/Button';
import useAuthStore from 'store/auth';

interface IAddressUnit {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
}

const OrderConfirmationModal = ({
  isVisible,
  onClose,
  onConfirm,
  onCloseModal,
}) => {
  const { user } = useUserStore(state => state);
  const setSigned = useAuthStore(state => state.setSigned);
  const { navigate } = useNavigation();

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 10,
            alignSelf: 'center',
            width: width(85),
            marginTop: height(10),
            backgroundColor: user ? Colors.Base : Colors.White,
            marginBottom: 10,
            paddingVertical: 20,
            borderRadius: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          {!user ? (
            <View
              style={{
                justifyContent: 'space-around',
                width: '80%',
                height: height(65),
                alignSelf: 'center',
                gap: 20,
                marginTop: 10,
              }}
            >
              <Title>
                Olá, se deseja usar o app completo, finalize o seu cadastro ou
                entre com uma conta!
              </Title>
              <Button
                onPress={() => {
                  setSigned(false);
                  onCloseModal();
                }}
                label="Login"
                color="primary"
                variantType="block"
              />
            </View>
          ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <View style={{ width: width(75) }}>
                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      marginHorizontal: 5,
                    }}
                    onPress={onClose}
                  >
                    <Icon name="CloseIcon" />
                  </TouchableOpacity>
                </View>
              </View>
              <Spacer amount={1} />
              <Text textAlign="center" color="LightGrey" size={24}>
                Confirme o endereço de entrega
              </Text>
              <Spacer amount={4} />
              <View
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  width: '90%',
                  padding: 10,
                  borderRadius: 20,
                  gap: 15,
                }}
              >
                <View style={{ width: width(65) }}>
                  <Text size={14} color="LightGrey">
                    CEP :
                  </Text>
                  <Text size={16} color="LightGrey">
                    {user?.cep}
                  </Text>
                </View>
                <View style={{ width: width(65) }}>
                  <Text size={14} color="LightGrey">
                    Bairro :
                  </Text>
                  <Text size={16} color="LightGrey">
                    {user?.bairro}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: width(45) }}>
                    <Text size={14} color="LightGrey">
                      Logradouro :
                    </Text>
                    <Text size={16} color="LightGrey">
                      {user?.logradouro}
                    </Text>
                  </View>
                  <View style={{ width: width(20) }}>
                    <Text textAlign="center" size={14} color="LightGrey">
                      Número :
                    </Text>
                    <Text textAlign="center" size={16} color="LightGrey">
                      {user?.numero}
                    </Text>
                  </View>
                </View>
              </View>
              <Spacer amount={10} />
              <NewButton
                buttonText={'Confirmar'}
                buttonColor="Secondary"
                onPress={onConfirm}
                iconButton={'right'}
                icon={whatsapp}
              />
              <Spacer amount={10} />
              <TouchableOpacity onPress={() => navigate('Profile')}>
                <ButtonText style={{ fontSize: 16, color: Colors.LightGrey }}>
                  Editar endereço no meu perfil
                </ButtonText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
};

export default OrderConfirmationModal;
