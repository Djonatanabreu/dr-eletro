import React, { useEffect } from 'react';

import { Props } from 'interfaces/routes.interface';
import {
  CenterView,
  Column,
  ContainerPage,
  ContentPage,
  ContentScroll,
} from 'components/commons';
import BackHeader from 'screens/_headers/Back';
import { useUserStore } from 'store/user';
import Input from 'components/Inputs/Input';
import { updateClienteSchema } from 'validators/user.schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserUpdate } from 'interfaces/user.interface';
import Button from 'components/Button';
import api from 'services/api';
import useToast from 'libs/useToast';
import { ResponseError } from 'interfaces/utils.interface';
import axios from 'axios';
import ChangePassword from './ChangePassword';

import { useCompanyStore } from 'store/company';
import { RefreshControl } from 'react-native';
import DeletarContaModal from 'components/Modals/DeletarContaModal';
import { width } from 'components/Theme/Responsive';
import useAuthStore from 'store/auth';

type ChangePasswordRef = React.ElementRef<typeof ChangePassword>;

type ModalExcluirRef = React.ElementRef<typeof DeletarContaModal>;

const Profile = ({ route, navigation }: Props) => {
  const user = useUserStore(state => state.user);
  const [loading, setLoading] = React.useState(false);

  const company_id = useCompanyStore(state => state.company_id);

  const refModalPassword = React.useRef<ChangePasswordRef>(null);
  const refModalExcluir = React.useRef<ModalExcluirRef>(null);

  const toast = useToast();

  const {
    control,
    handleSubmit,
    watch,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      nome: user?.nome,
      email: user?.email,
      senha: '',
      // whatsapp: user?.whatsapp,
      // estado: user?.estado_id,
      // cidade: user?.cidade_id,
      // categoria_id: user?.categoria_id,
      // anos_experiencia: user?.anos_experiencia,
      // descricao: user?.descricao,
      // valor: masks.currency(String(user?.valor * 100)),
    },
    resolver: yupResolver(updateClienteSchema),
  });

  // const handleGetphotos = async () => {
  //   try {
  //     setLoading(true);
  //     const { data: response } = await api.get('/busca_profissional.php', {
  //       params: { id: user?.id },
  //     });

  //     let images: any = [];

  //     if (user?.imagem) {
  //       images.push(
  //         `https://www.app.duotecnologia.com/images/profissionais/fotos/${
  //           user?.imagem
  //         }?date=${new Date().getTime()}`
  //       );
  //     }

  //     response.data.map((ele: any) =>
  //       images.push(
  //         `https://www.app.duotecnologia.com/images/profissionais/fotos/${
  //           ele?.imagem
  //         }?date=${new Date().getTime()}`
  //       )
  //     );

  //     console.log(response.data);

  //     setValue('image', images);
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleGetUser = async () => {
    try {
      const { data: response } = await api.get('/buscar_dados.php', {
        params: {
          id: user?.id,
        },
      });
      console.log({ response });

      useUserStore.getState().setUser({ ...response });
      useAuthStore.getState().setToken('token');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitUpdate = async (formData: any) => {
    try {
      setLoading(true);

      if (formData.senha === '') {
        delete formData.senha;
      }

      let form_data: any = new FormData();

      form_data.append('usuario_id', company_id);
      form_data.append('id', user?.id);
      for (let key in formData) {
        form_data.append(key, formData[key]);
      }

      // formData.image.map((img: string, index: number) => {
      //   if (img !== '' && img.startsWith('file://')) {
      //     form_data.append(`photo-${index}`, {
      //       uri: Platform.OS === 'android' ? img : img.replace('file://', ''),
      //       type: 'image/jpeg',
      //       name: `image-${index}`,
      //     });
      //   }
      // });

      const { data: response } = await api.post('/editar.php', form_data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      // handleGetphotos();

      useUserStore.getState().setUser({ ...response.data, type: user?.type });
      handleGetUser();

      toast.successToast('Usuario editado com sucesso !');
    } catch (error) {
      console.log(error);
      const typedError = error as ResponseError;
      if (axios.isAxiosError(error)) {
        toast.errorToast(typedError?.response?.data?.message);
      } else {
        toast.errorToast('Erro ao efetuar o registro');
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleGetCategories = async () => {
  //   try {
  //     setLoading(true);

  //     const query: any = {
  //       page: 1,
  //       perPage: 500,
  //     };

  //     query.usuario_id = company_id;

  //     const { data: response } = await api.get('/lista_servicos.php', {
  //       params: query,
  //     });

  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleGetState = async () => {
  //   try {
  //     setLoading(true);

  //     const { data: response } = await api.get('/lista_estados.php', {
  //       params: {
  //         perPage: 50,
  //       },
  //     });

  //     setEstados(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleGetCitys = async (stateId: string) => {
  //   try {
  //     const { data: response } = await api.get('/lista_cidades.php', {
  //       params: {
  //         estado_id: stateId,
  //         perPage: 10000,
  //       },
  //     });

  //     setCidade(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //   }
  // };

  // const estado = watch('estado');

  // React.useEffect(() => {
  //   if (estado) handleGetCitys(estado);
  // }, [estado]);

  // React.useEffect(() => {
  //   handleGetState();
  //   handleGetCategories();
  //   handleGetphotos();
  // }, []);

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <ContainerPage style={{ paddingHorizontal: width(5) }}>
      <BackHeader title="Perfil" />
      <ContentScroll
        efreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => {}} />
        }
      >
        <ContentPage>
          <Column
            style={{
              gap: 20,
            }}
          >
            <Input
              label="Nome completo:"
              gray
              removeRadius
              control={control}
              name="nome"
              autoCapitalize="none"
              returnKeyType="next"
              error={errors.nome}
              blurOnSubmit={false}
              onSubmitEditing={() => setFocus('email')}
            />
            <Input
              label="E-mail:"
              control={control}
              name="email"
              gray
              removeRadius
              disabled
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              error={errors.email}
              blurOnSubmit={false}
              onSubmitEditing={() => setFocus('whatsapp')}
            />
            {/* <Input
              label="Whatsapp:"
              control={control}
              name="whatsapp"
              gray
              keyboardType="phone-pad"
              removeRadius
              mask={'cell'}
              autoCapitalize="none"
              returnKeyType="next"
              error={errors.whatsapp}
              blurOnSubmit={false}
              onSubmitEditing={() => setFocus('senha')}
            /> */}
            <Input
              label="Senha:"
              control={control}
              name="senha"
              secure
              gray
              removeRadius
              autoCapitalize="none"
              returnKeyType="done"
              error={errors.senha}
            />
            {/* {user?.type === 'Profissional' && (
              <>
                <Row>
                  <InputSelect
                    items={estados.map((estado: any) => ({
                      label: estado.nome,
                      value: estado.id,
                      color: 'red',
                    }))}
                    gray
                    removeRadius
                    control={control}
                    label="Estado:"
                    name="estado"
                    error={errors.estado}
                  />
                  <InputSelect
                    items={cidade.map((estado: any) => ({
                      label: estado.nome,
                      value: estado.id,
                      color: '#000',
                    }))}
                    gray
                    removeRadius
                    control={control}
                    label="Cidade:"
                    error={errors.cidade}
                    name="cidade"
                  />
                </Row>

                <InputSelect
                  items={categorias.map((estado: any) => ({
                    label: estado.nome,
                    value: estado.id,
                  }))}
                  gray
                  removeRadius
                  control={control}
                  label="Categoria:"
                  error={errors.categoria_id}
                  name="categoria_id"
                />

                <Input
                  label="Tempo de experiência:"
                  control={control}
                  name="anos_experiencia"
                  gray
                  removeRadius
                  autoCapitalize="none"
                  returnKeyType="next"
                  keyboardType="number-pad"
                  error={errors.anos_experiencia}
                  blurOnSubmit={false}
                  onSubmitEditing={() => setFocus('valor')}
                />
                <Input
                  label="Valor médio do serviço:"
                  control={control}
                  name="valor"
                  gray
                  mask={'currency'}
                  keyboardType="number-pad"
                  removeRadius
                  autoCapitalize="none"
                  returnKeyType="next"
                  error={errors.valor}
                  blurOnSubmit={false}
                  onSubmitEditing={() => setFocus('descricao')}
                />
                <Input
                  label="Descrição:"
                  control={control}
                  name="descricao"
                  gray
                  multiline
                  removeRadius
                  returnKeyType="done"
                  error={errors.descricao}
                />

                <InputImage
                  label="Fotos do serviço prestado:"
                  control={control}
                  name="image"
                />
              </>
            )} */}
            <Button
              onPress={handleSubmit(handleSubmitUpdate)}
              label="Salvar"
              loading={loading}
              fullWidth
              color="secondaryDark"
              variantType="block"
            />
            <CenterView>
              <Button
                onPress={() => refModalExcluir.current?.open()}
                label="Deletar conta"
                loading={loading}
                fullWidth
                color="danger"
                variantType="inline"
              />
            </CenterView>
          </Column>
        </ContentPage>
      </ContentScroll>
      <ChangePassword ref={refModalPassword} />
      <DeletarContaModal ref={refModalExcluir} />
    </ContainerPage>
  );
};

export default Profile;
