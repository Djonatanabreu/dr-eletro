import React, { useEffect, useState } from 'react';

import { Props } from 'interfaces/routes.interface';
import { ContainerPage, ContentScroll } from 'components/commons';
import BackHeader from 'screens/_headers/Back';
import { useCompanyStore } from 'store/company';
import api from 'services/api';
import {
  ImageSourcePropType,
  RefreshControl,
  View,
  useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import { PageStyle } from './styles';
import { Spacer } from 'components/Spacer/Spacer';
import { Text } from 'components/Text/Text';

export type Sobre = {
  id: number;
  descricao: string;
  titulo: string;
  imagem: ImageSourcePropType;
};

const Canais = ({ route, navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const { width } = useWindowDimensions();

  const company_id = useCompanyStore(state => state.company_id);
  const [about, setAbout] = useState<any>();

  const handleGetDetails = async () => {
    try {
      setIsLoading(true);

      const { data: response } = await api.get('/lista_sobre.php', {
        params: {
          usuario_id: company_id,
        },
      });

      setAbout(response[0]);
      console.log(response[0].imagem);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetDetails();
  }, []);

  return (
    <ContainerPage style={{ marginHorizontal: 15 }}>
      <BackHeader title="Sobre nós" />
      <ContentScroll
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => {}} />
        }
      >
        {!isLoading && about && (
          <PageStyle.Content>
            <Spacer amount={2} />
            <View
              style={{
                flex: 1,
                height: 250,
                alignItems: 'center',
                position: 'relative',
                justifyContent: 'center',
              }}
            >
              <PageStyle.Image
                width={parseInt(`${width * 0.6}`)}
                height={parseInt(`${width * 0.6}`)}
                source={{
                  uri: `https://www.app.duotecnologia.com/images/sobre-nos/${about.imagem}`,
                }}
                resizeMode="contain"
              />
              <Spacer amount={2} />
              {about?.titulo ? (
                <Text fontFamily="Agrandir" size={30} color="Alternative">
                  {about?.titulo}
                </Text>
              ) : null}
            </View>
            <RenderHTML
              contentWidth={width}
              source={{
                html: `<div style="color: #737373; font-size: 22px">${about?.descricao}</div>`,
              }}
            />
          </PageStyle.Content>
        )}
      </ContentScroll>
    </ContainerPage>
  );
};

export default Canais;
