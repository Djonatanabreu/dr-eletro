import React, { useState } from 'react';

import { Container, Content } from './styles';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { defaultTheme } from 'styles/default';

interface HomeHeader {}
const HomeHeader = () => {
  //const user = useUserStore(state => state.user);

  const navigation: any = useNavigation();

  return (
    <Container>
      <Content>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <FontAwesome5 name="bars" size={25} color={defaultTheme.secondary} />
        </TouchableOpacity>
      </Content>
    </Container>
  );
};

export default HomeHeader;
