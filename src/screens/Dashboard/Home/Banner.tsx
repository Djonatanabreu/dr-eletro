import { useEffect, useState } from 'react';
import { ActivityIndicator, Linking, View } from 'react-native';
import { defaultTheme } from 'styles/default';
import { BannerStyle } from './styles';
import { useCompanyStore } from 'store/company';
import { useUserStore } from 'store/user';
import { Banner } from './types';
import api from 'services/api';
import useAuthStore from 'store/auth';
import useToast from 'libs/useToast';
import { useNavigation } from '@react-navigation/native';

export const Banners = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const { navigate } = useNavigation();

  const signed = useAuthStore(state => state.signed);

  const company_id = useCompanyStore(state => state.company_id);
  const cidade = useUserStore(state => state.cidade);

  const toast = useToast();

  const handleGetBanners = async () => {
    try {
      setIsLoading(true);

      const query: any = {
        page: 1,
        perPage: 5,
        usuario_id: company_id,
      };

      const { data: response } = await api.get('/lista_banners.php', {
        params: query,
      });

      if (response.data) {
        setBanners(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (company_id) {
      handleGetBanners();
    }
  }, [company_id, cidade]);

  if (isLoading)
    return (
      <View style={{}}>
        <ActivityIndicator color={defaultTheme.secondary} size={'large'} />
      </View>
    );

  return (
    <BannerStyle.Container horizontal showsHorizontalScrollIndicator={false}>
      {banners.map(banner => (
        <BannerStyle.Card
          onPress={() => {
            Linking.openURL(banner.link);
          }}
          key={banner.id}
        >
          <BannerStyle.Image
            source={{
              uri: `https://duotecnologia.com/app/images/banners/${banner.imagem}`,
            }}
            resizeMode="cover"
          />
        </BannerStyle.Card>
      ))}
    </BannerStyle.Container>
  );
};
