import React, { useEffect, useState } from 'react';
import { Container, HeaderStyle } from './styles';

import { View } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import {
  calendar,
  header,
  home,
  ideia,
  noticias,
  profile,
  sair,
  about,
  carrinho,
  compras,
} from '../../assets/img';
import { logout } from '../../utils/functions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { visibility } from 'components/Modals/LoginModal/store/sliceLoginModalVisibility';

const DrawerCustom = (props: any) => {
  const navigation = props.navigation;
  const dispatch = useDispatch<AppDispatch>();

  let routes = [
    {
      name: 'Home',
      icon: home,
      nav: () => {
        navigation.navigate('Home');
      },
    },
    {
      name: 'Meu perfil',
      icon: profile,
      nav: () => navigation.navigate('Profile'),
    },
    {
      name: 'Minha Agenda',
      icon: calendar,
      nav: () =>
        navigation.navigate('ScheduleRoutes', {
          screen: 'MySchedule',
        }),
    },
    {
      name: 'Minhas Ideias',
      icon: ideia,
      nav: () => {
        navigation.navigate('MyIdeas');
      },
    },
    {
      name: 'Produtos',
      icon: carrinho,
      nav: () =>
        navigation.navigate('ProductRoutes', {
          screen: 'ProductCategoryList',
        }),
    },
    // {
    //   name: 'Meus Pedidos',
    //   icon: compras,
    //   nav: () => navigation.navigate('Orders'),
    // },
    {
      name: 'Notícias',
      icon: noticias,
      nav: () =>
        navigation.navigate('NewsRoutes', {
          screen: 'Noticias',
        }),
    },
    {
      name: 'Sobre Nós',
      icon: about,
      nav: () => navigation.navigate('AboutUs'),
    },
    {
      name: 'Sair',
      icon: sair,
      nav: () => {
        logout();
        dispatch(visibility({ isVisible: false, condition: true }));
        navigation.navigate('LoginRoutes');
      },
    },
  ];

  return (
    <Container>
      <HeaderStyle.Content>
        <HeaderStyle.Img source={header} />
      </HeaderStyle.Content>
      <HeaderStyle.Center>
        {routes.map(el => (
          <HeaderStyle.Item key={el.name} onPress={() => el.nav()}>
            <View
              style={{
                width: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={el.icon}
                style={{ width: 25, height: 25 }}
                resizeMode="cover"
              />
            </View>
            <HeaderStyle.Name>{el.name}</HeaderStyle.Name>
          </HeaderStyle.Item>
        ))}
      </HeaderStyle.Center>
      <HeaderStyle.Footer>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              'https://www.app.duotecnologia.com/aplicativo/politica-de-privacidade-15/'
            )
          }
        >
          <HeaderStyle.Text>Política de privacidade</HeaderStyle.Text>
        </TouchableOpacity>
      </HeaderStyle.Footer>
    </Container>
  );
};

export default DrawerCustom;
