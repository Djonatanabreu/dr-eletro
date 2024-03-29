import React, { useEffect, useState } from 'react';

import { ContainerPage } from 'components/commons';
import { useCompanyStore } from 'store/company';
import api from 'services/api';
import { ImageSourcePropType, Text, View } from 'react-native';
import { PageStyle } from '../Noticias/styles';
import { NewsListType } from '../Noticias/Types';
import { FlatList } from 'react-native-gesture-handler';
import NewsItem from '../Noticias/NewsItem';
import { NewsStyle } from './styles';

const NewsList = ({ handleNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [newsList, setNewsList] = useState<NewsListType[]>([]);
  const [highlightNewsList, setHighlightNewsList] = useState<NewsListType[]>(
    []
  );

  const company_id = useCompanyStore(state => state.company_id);

  const handleGetNews = async () => {
    try {
      setIsLoading(true);

      const { data: response } = await api.get('/lista_noticias.php', {
        params: {
          usuario_id: company_id,
        },
      });

      setNewsList(response.data);

      const filteredHighlightNewsList = response.data.filter(news => {
        return news.status === '1' && news.destaque === '1';
      });

      setHighlightNewsList(filteredHighlightNewsList);
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
        handleNavigate(news);
      }
    });
  };

  // const renderHeader = () => (
  //   <View style={{ height: height * 0.25 }}>
  //     {newsList.map(news =>
  //       news.destaque === '1' ? (
  //         <TouchableOpacity
  //           style={{ position: 'relative', zIndex: 0 }}
  //           key={news.id}
  //           onPress={() => onHandleNews(news.id)}
  //         >
  //           <PageStyle.NewsImage
  //             style={{ width: width * 0.8, height: height * 0.22 }}
  //             source={{
  //               uri: `https://duotecnologia.com/app/images/noticias/${news.imagem}`,
  //             }}
  //           />
  //           <PageStyle.SeeMore>VEJA MAIS...</PageStyle.SeeMore>
  //         </TouchableOpacity>
  //       ) : null
  //     )}
  //   </View>
  // );

  return (
    <ContainerPage style={{}}>
      <NewsStyle.Title>Notícias</NewsStyle.Title>
      <View>
        {!isLoading && (
          <PageStyle.Content>
            <FlatList
              data={highlightNewsList}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <NewsItem
                  onPress={() => onHandleNews(item.id)}
                  titulo={item.titulo}
                  imagem={
                    `https://duotecnologia.com/app/images/noticias/${item.imagem}` as ImageSourcePropType
                  }
                />
              )}
            />
          </PageStyle.Content>
        )}
      </View>
    </ContainerPage>
  );
};

export default NewsList;
