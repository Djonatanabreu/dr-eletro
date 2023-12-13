import React, { useEffect, useState } from 'react';
import HomeHeader from 'screens/_headers/Home';
import { ContainerPage } from 'components/commons';
import { View, useWindowDimensions } from 'react-native';
import { Props } from 'interfaces/routes.interface';
import NewsList from './NewsList';
import { Banners } from './Banner';
import { useUserStore } from 'store/user';
import { GreetingTitle } from './styles';
import { DialyPhrases } from './DialyPhrases';
import { FlatList } from 'react-native-gesture-handler';

import useAuthStore from 'store/auth';

import ModalScreen from 'components/Modals/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore } from 'store';
import { visibility } from '../../../components/Modals/LoginModal/store/sliceLoginModalVisibility';

interface IPhrasesProps {
  autor: string;
  nome: string;
}

const Home = ({ route, navigation }: Props) => {
  const [phrasesList, setPhrasesList] = useState<IPhrasesProps[]>([
    { autor: '', nome: '' },
    { autor: '', nome: '' },
  ]);

  const [isClosed, setIsClosed] = useState<boolean>(false);
  const { user } = useUserStore(state => state);

  const signed = useAuthStore(state => state.signed);

  const dispatch = useDispatch<AppDispatch>();

  const visibilitySelector = useSelector(
    (state: AppStore) => state.loginModalVisibility
  );

  const { width } = useWindowDimensions();

  const [isLoading, setIsLoading] = useState(false);

  async function getPhrasesData() {
    await fetch(
      'https://www.duotecnologia.com/app/api/ca_integrativa/frases.php?usuario_id=37'
    )
      .then(response => response.json())
      .then(data => setPhrasesList(data.data));
  }

  useEffect(() => {
    if (!signed && !visibilitySelector.condition) {
      dispatch(visibility({ isVisible: true }));
    }

    getPhrasesData();
  }, []);

  const handleNewsNavigate = news => {
    navigation.navigate('NewsRoutes', {
      screen: 'NewsDetail',
      params: {
        id: news.id,
        titulo: news.titulo,
        imagem: `https://duotecnologia.com/app/images/noticias/${news.imagem}`,
        descricao: news.descricao,
        resumo: news.resumo,
      },
    });
  };

  return (
    <ContainerPage
      style={{
        paddingHorizontal: width * 0.08,
        gap: 15,
        paddingVertical: width * 0.06,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[]}
        renderItem={null}
        keyExtractor={item => item}
        ListHeaderComponentStyle={{ gap: 10, marginBottom: 10 }}
        ListFooterComponentStyle={{ gap: 20 }}
        ListHeaderComponent={
          <>
            <HomeHeader />
            <GreetingTitle.Title style={{ fontSize: 28 }}>
              Olá,{' '}
              <GreetingTitle.Title style={{ fontStyle: 'italic' }}>
                {user?.nome}
              </GreetingTitle.Title>
            </GreetingTitle.Title>
            <View
              style={{
                gap: 10,
                alignItems: 'center',
                paddingVertical: 15,
              }}
            >
              <DialyPhrases
                author={phrasesList[0].autor}
                phrase={phrasesList[0].nome}
              />
            </View>
          </>
        }
        ListFooterComponent={
          <>
            <Banners />
            <NewsList handleNavigate={handleNewsNavigate} />
          </>
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
