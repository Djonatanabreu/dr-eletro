import React, { useEffect, useState } from 'react';
import HomeHeader from 'screens/_headers/Home';
import { ContainerPage } from 'components/commons';
import { Image, View, useWindowDimensions } from 'react-native';
import { Props } from 'interfaces/routes.interface';
import { Banners } from './Banner';
import { useUserStore } from 'store/user';
import { FlatList } from 'react-native-gesture-handler';
import { bottomImage } from '../../../assets/img';

import useAuthStore from 'store/auth';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore } from 'store';
import { visibility } from '../../../components/Modals/LoginModal/store/sliceLoginModalVisibility';
import { watermark } from '../../../assets/img';
import { InputAutocomplete } from 'components/Inputs/InputAutocomplete';
import { useForm } from 'react-hook-form';
import { NewButton } from 'components/Button/NewButton/NewButton';
import { Spacer } from 'components/Spacer/Spacer';
import { HeilightItems } from './HeighlightItems';
import { SearchInput } from './SearchInput';
import api from 'services/api';
import { useCompanyStore } from 'store/company';

const Home = ({ route, navigation }: Props) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const { user } = useUserStore(state => state);
  const [productList, setProductList] = useState([]);

  const signed = useAuthStore(state => state.signed);

  const dispatch = useDispatch<AppDispatch>();

  const visibilitySelector = useSelector(
    (state: AppStore) => state.loginModalVisibility
  );

  const { company_id } = useCompanyStore(state => state);

  const {
    control,
    setFocus,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<{ search: string }>({
    defaultValues: {
      search: '',
    },
  });

  const search = watch('search');

  const fetchProductList = async () => {
    // setIsLoading(true);
    try {
      const { data: response } = await api.get('/lista_produtos.php', {
        params: {
          usuario_id: company_id,
        },
      });
      const filteredProductList = response.data.includes(product => {});
      setProductList(response.data);

      // setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const { width } = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProductList();
    if (!signed && !visibilitySelector.condition) {
      dispatch(visibility({ isVisible: true }));
    }
  }, []);

  useEffect(() => {
    if (search) {
      const newValue = productList.find((prod: any) => prod.id === search);
      navigation.navigate('ProductRoutes', {
        screen: 'ProductDetails',
        params: newValue,
      });
    }
  }, [search]);

  const handleGetCity = async cidadeId => {
    try {
      const { data: response } = await api.get('/buscaCidade.php', {
        params: {
          usuario_id: company_id,
          estado_id: user?.estado_id,
          cidade_id: cidadeId,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetUser = async () => {
    try {
      const { data: response } = await api.get('/buscar_dados.php', {
        params: {
          id: user?.id,
        },
      });

      const { cidade } = await handleGetCity(response?.cidade_id);

      useUserStore.getState().setUser({
        ...response,
        nome: response?.nome,
        email: response?.email,
        cep: response?.cep,
        cidade: cidade,
        cidade_id: response?.cidade_id,
        estado: response?.estado_id,
        logradouro: response?.logradouro,
        numero: response?.numero,
        bairro: response?.bairro,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <ContainerPage
      style={{
        paddingHorizontal: width * 0.08,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[]}
        renderItem={null}
        keyExtractor={item => item}
        ListHeaderComponent={
          <View>
            <HomeHeader />
            <Image
              style={{ width: 65, height: 65, alignSelf: 'center' }}
              source={watermark}
              resizeMode="contain"
            />
            <View
              style={{
                width: width * 0.8,
                alignSelf: 'center',
              }}
            >
              <InputAutocomplete
                name="search"
                loading={isLoading}
                placeholder="O que você procura?"
                items={productList.map((slug: any) => ({
                  id: slug.id,
                  title: `${slug.titulo}`,
                }))}
                control={control}
              />
            </View>
            <Spacer amount={3} />
          </View>
        }
        ListFooterComponent={
          <View style={{ alignItems: 'center' }}>
            <Banners />
            <Spacer amount={2} />
            <NewButton
              buttonText="Solicitar Assistência"
              buttonHeight={60}
              buttonWidth={210}
              buttonColor="Secondary"
              onPress={() => navigation.navigate('TechnicalAssistance')}
            />
            <Spacer amount={1} />
            <HeilightItems />
            <Image
              source={bottomImage}
              resizeMode="contain"
              style={{ width: width * 0.8, height: width * 0.35 }}
            />
            <Spacer amount={3} />
          </View>
        }
      />

      {/* <ModalScreen
        onNavigateToLogin={() => {
          setIsClosed(true);
          dispatch(visibility({ isVisible: false, condition: true }));
          navigation.navigate('LoginRoutes');
        }}
        onClose
      /> */}
    </ContainerPage>
  );
};

export default Home;
