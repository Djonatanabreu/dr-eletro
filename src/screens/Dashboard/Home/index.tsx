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

import ModalScreen from 'components/Modals/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore } from 'store';
import { visibility } from '../../../components/Modals/LoginModal/store/sliceLoginModalVisibility';
import { watermark } from '../../../assets/img';
import { InputAutocomplete } from 'components/Inputs/InputAutocomplete';
import { useForm } from 'react-hook-form';
import { NewButton } from 'components/Button/NewButton/NewButton';
import { Spacer } from 'components/Spacer/Spacer';
import { HeilightItems } from './HeighlightItems';

const Home = ({ route, navigation }: Props) => {
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const { user } = useUserStore(state => state);

  const signed = useAuthStore(state => state.signed);

  const dispatch = useDispatch<AppDispatch>();

  const visibilitySelector = useSelector(
    (state: AppStore) => state.loginModalVisibility
  );

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

  const { width } = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!signed && !visibilitySelector.condition) {
      dispatch(visibility({ isVisible: true }));
    }
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
            <View style={{ width: '90%', paddingHorizontal: 15 }}>
              <InputAutocomplete
                name="search"
                loading={isLoading}
                placeholder="O que você procura?"
                items={[{ id: '', title: '' }]}
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
            />
            <Spacer amount={1} />
            <HeilightItems />
            <Image
              source={bottomImage}
              resizeMode="contain"
              style={{ width: '100%', height: 110 }}
            />
            <Spacer amount={3} />
          </View>
        }
      />

      <ModalScreen
        onNavigateToLogin={() => {
          setIsClosed(true);
          dispatch(visibility({ isVisible: false, condition: true }));
          navigation.navigate('LoginRoutes');
        }}
        onClose
      />
    </ContainerPage>
  );
};

export default Home;
