import React, { useEffect, useState } from 'react';

import { Container, ContainerPage, ContentScroll } from 'components/commons';
import BackHeader from 'screens/_headers/Back';
import { useCompanyStore } from 'store/company';
import api from 'services/api';
import {
  ImageSourcePropType,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { PageStyle } from './styles';
import { NewsListType } from './Types';
import { FlatList } from 'react-native-gesture-handler';
import NewsItem from './NewsItem';

const Noticias = ({ route, navigation }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [newsList, setNewsList] = useState<NewsListType[]>([]);
  const [highlightNewsList, setHighlightNewsList] = useState<NewsListType[]>(
    []
  );
  const { width } = useWindowDimensions();
  const { height } = useWindowDimensions();

  const company_id = useCompanyStore(state => state.company_id);

  const handleGetNews = async () => {
    try {
      setIsLoading(true);

      const { data: response } = await api.get('/lista_noticias.php', {
        params: {
          usuario_id: company_id,
        },
      });

      console.log(response.data);
      const filterNewsListByStatus = response.data.filter(news => {
        return news.status === '1';
      });

      const filterNewsListHighlight = filterNewsListByStatus.filter(news => {
        return news.destaque === '1';
      });

      setNewsList(filterNewsListByStatus);
      setHighlightNewsList(filterNewsListHighlight);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetNews();
  }, []);

  const onHandleNews = (id: number) => {
    newsList.map(news => {
      if (news.id === id) {
        navigation.navigate('NewsDetail', {
          titulo: news.titulo,
          imagem: `https://duotecnologia.com/app/images/noticias/${news.imagem}`,
          descricao: news.descricao,
          resumo: news.resumo,
        });
      }
    });
  };

  const renderHeader = () => (
    <View style={{ height: height * 0.25 }}>
      <TouchableOpacity
        style={{ position: 'relative', zIndex: 0 }}
        key={highlightNewsList[0].id}
        onPress={() => onHandleNews(highlightNewsList[0].id)}
      >
        <PageStyle.NewsImage
          style={{ width: width * 0.8, height: height * 0.22 }}
          source={{
            uri: `https://www.app.duotecnologia.com/images/noticias/${highlightNewsList[0].imagem}`,
          }}
        />
        <PageStyle.SeeMore>VEJA MAIS...</PageStyle.SeeMore>
      </TouchableOpacity>
    </View>
  );

  return (
    <Container style={{ paddingHorizontal: width * 0.05, marginBottom: 10 }}>
      <ContainerPage>
        <BackHeader title="Notícias" />
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          {!isLoading && (
            <PageStyle.Content>
              <FlatList
                data={newsList}
                keyExtractor={item => item.id.toString()}
                // ListHeaderComponent={renderHeader}
                renderItem={({ item }) => (
                  <NewsItem
                    onPress={() => onHandleNews(item.id)}
                    titulo={item.titulo}
                    imagem={
                      `https://www.app.duotecnologia.com/images/noticias/${item.imagem}` as ImageSourcePropType
                    }
                  />
                )}
              />
            </PageStyle.Content>
          )}
        </View>
      </ContainerPage>
    </Container>
  );
};

export default Noticias;
