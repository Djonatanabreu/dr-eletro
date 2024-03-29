import React, { useEffect, useState } from 'react';

import { Props } from 'interfaces/routes.interface';
import {
  CenterView,
  Column,
  ContainerPage,
  ContentPage,
  ContentScroll,
  Row,
  Title,
} from 'components/commons';
import BackHeader from 'screens/_headers/Back';
import { useUserStore } from 'store/user';
import Input from 'components/Inputs/Input';
import { updateClienteSchema } from 'validators/user.schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Button from 'components/Button';
import api from 'services/api';
import useToast from 'libs/useToast';
import { ResponseError } from 'interfaces/utils.interface';
import axios from 'axios';
import ChangePassword from './ChangePassword';

import { useCompanyStore } from 'store/company';
import { RefreshControl, View } from 'react-native';
import DeletarContaModal from 'components/Modals/DeletarContaModal';
import { width } from 'components/Theme/Responsive';
import useAuthStore from 'store/auth';
import { Text } from 'react-native';
import InputSelect from 'components/Inputs/InputSelect';
import { Spacer } from 'components/Spacer/Spacer';
import { InputAutocomplete } from 'components/Inputs/InputAutocomplete';

type ChangePasswordRef = React.ElementRef<typeof ChangePassword>;

type ModalExcluirRef = React.ElementRef<typeof DeletarContaModal>;

interface IStatesProps {
  id: string;
  nome: string;
  sigla: string;
}
interface ICityProps {
  id: string;
  nome: string;
}

const Profile = ({ route, navigation }: Props) => {
  const [userUpdates, setUserUpdates] = useState();
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [states, setStates] = useState<IStatesProps[]>([]);
  const [cities, setCities] = useState<ICityProps[]>([]);
  const [address, setAddress] = useState();

  const company_id = useCompanyStore(state => state.company_id);
  const setSigned = useAuthStore(state => state.setSigned);

  const refModalPassword = React.useRef<ChangePasswordRef>(null);
  const refModalExcluir = React.useRef<ModalExcluirRef>(null);

  const toast = useToast();

  const {
    control,
    handleSubmit,
    watch,
    setFocus,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      nome: user?.nome,
      email: user?.email,
      senha: '',
      cep: user?.cep,
      estado_id: user?.estado_id,
      cidade_id: user?.cidade_id,
      cidade: user?.cidade,
      logradouro: user?.logradouro,
      numero: user?.numero,
      bairro: user?.bairro,
    },
    resolver: yupResolver(updateClienteSchema),
  });
  const handleCEPChange = async (newCEP: string | undefined) => {
    try {
      if (!newCEP || newCEP.length <= 7) return;

      const { data: newAddress } = await api.get(
        `https://viacep.com.br/ws/${newCEP}/json/`
      );

      const filterAddressByUf = states.filter(state => {
        const uf = Object.values(newAddress).find((value: any) => {
          if (value.toLocaleLowerCase() === state.sigla.toLocaleLowerCase())
            return state.sigla;
        });
        return uf;
      });

      setValue('cidade', newAddress?.localidade);
      setValue('estado_id', filterAddressByUf[0]?.id);
      setValue('logradouro', newAddress.logradouro);
      setValue('bairro', newAddress.bairro);
    } catch (error) {
      console.error('Erro ao obter dados do CEP:', error);
    }
  };

  const getNewCep = () => {
    const cep = watch('cep');
    if (cep >= 8) {
      return cep;
    }
  };

  const handleGetStates = async () => {
    try {
      const { data: estados } = await api.get('/buscaEstados.php', {
        params: {
          usuario_id: company_id,
        },
      });

      setStates(estados);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCities = async estadoId => {
    try {
      const { data: cidades } = await api.get('/buscaCidadesEstados.php', {
        params: {
          usuario_id: company_id,
          estado_id: estadoId,
        },
      });

      setCities(cidades);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCity = async cidadeId => {
    try {
      const { data: response } = await api.get('/buscaCidade.php', {
        params: {
          usuario_id: company_id,
          estado_id: user?.estado_id,
          cidade_id: cidadeId,
        },
      });

      setValue('cidade', response.cidade);
      return response.cidade;
    } catch (error) {
      console.log(error);
    }
  };

  // const handleGetUser = async () => {
  //   try {
  //     const { data: response } = await api.get('/buscar_dados.php', {
  //       params: {
  //         id: user?.id,
  //       },
  //     });

  //     handleGetStates();

  //     useUserStore.getState().setUser({
  //       ...response,
  //       nome: response?.nome,
  //       email: response?.email,
  //       cep: response?.cep,
  //       estado_id: response?.estado_id,
  //       cidade_id: response?.cidade_id,
  //       cidade: handleGetCity(response.cidade_id),
  //       logradouro: response?.logradouro,
  //       numero: response?.numero,
  //       bairro: response?.bairro,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const cidade = watch('cidade');
  const handleSubmitUpdate = async (formData: any) => {
    try {
      setLoading(true);

      if (formData.senha === '') {
        delete formData.senha;
      }

      delete formData.cidade;

      const filteredCityByName = cities.filter(city => {
        if (city.nome === cidade) {
          return city;
        }
      });

      setValue('cidade_id', filteredCityByName[0]?.id);
      setValue('cidade', filteredCityByName[0]?.nome);

      let form_data: any = new FormData();

      form_data.append('usuario_id', company_id);
      form_data.append('id', user?.id);
      form_data.append('cidade_id', filteredCityByName[0].id);
      form_data.append('estado_id', estado);
      for (let key in formData) {
        form_data.append(key, formData[key]);
      }

      const { data: response } = await api.post('/editar.php', form_data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      console.log(form_data, response.data);

      useUserStore.getState().setUser({ ...response.data, type: user?.type });

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

  useEffect(() => {
    handleGetStates();
  }, []);

  const estado = watch('estado_id');
  const cep = watch('cep');

  useEffect(() => {
    if (estado) {
      handleGetCities(estado);
      setValue('estado_id', estado);
    }
  }, [estado]);

  useEffect(() => {
    handleCEPChange(getNewCep());
  }, [cep]);

  return (
    <ContainerPage style={{ paddingHorizontal: 25 }}>
      <BackHeader title="Meu Perfil" />

      {!user ? (
        <View
          style={{ width: '80%', alignSelf: 'center', gap: 20, marginTop: 150 }}
        >
          <Title>
            Olá, se deseja usar o app completo, finalize o seu cadastro ou entre
            com uma conta!
          </Title>
          <Button
            onPress={() => {
              setSigned(true);
              navigation.navigate('LoginRoutes', {
                screen: 'login',
              });
            }}
            label="Login"
            color="primary"
            variantType="block"
          />
        </View>
      ) : (
        <ContentScroll
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={() => {}} />
          }
        >
          <View>
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
                  onSubmitEditing={() => setFocus('cep')}
                />
                <Row>
                  <Input
                    sizeOptions={'long'}
                    label="CEP:"
                    control={control}
                    name="cep"
                    gray
                    removeRadius
                    autoCapitalize="none"
                    returnKeyType="next"
                    error={errors.cep}
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      setFocus('estado_id');
                    }}
                  />
                  <InputSelect
                    items={states.map((state: any) => ({
                      id: state.id,
                      label: state.sigla,
                      value: state.id,
                    }))}
                    gray
                    removeRadius
                    control={control}
                    label="Estado:"
                    error={errors.estado}
                    name="estado_id"
                    sizeOptions={'small'}
                  />
                </Row>
                <Row>
                  <Input
                    sizeOptions={'long'}
                    label="Endereço:"
                    control={control}
                    name="logradouro"
                    gray
                    removeRadius
                    autoCapitalize="none"
                    returnKeyType="next"
                    error={errors.cep}
                    blurOnSubmit={false}
                    onSubmitEditing={() => setFocus('numero')}
                  />
                  <Input
                    sizeOptions={'small'}
                    label="Número:"
                    control={control}
                    name="numero"
                    gray
                    removeRadius
                    autoCapitalize="none"
                    returnKeyType="next"
                    error={errors.numero}
                    blurOnSubmit={false}
                    onSubmitEditing={() => setFocus('cidade')}
                  />
                </Row>
                <Row>
                  <Input
                    sizeOptions={'normal'}
                    label="Bairro:"
                    control={control}
                    name="bairro"
                    gray
                    removeRadius
                    autoCapitalize="none"
                    returnKeyType="next"
                    error={errors.bairro}
                    blurOnSubmit={false}
                    onSubmitEditing={() => setFocus('cidade')}
                  />
                  <Input
                    sizeOptions={'normal'}
                    label="Cidade:"
                    control={control}
                    name="cidade"
                    gray
                    removeRadius
                    disabled
                    autoCapitalize="none"
                    returnKeyType="next"
                    error={errors.cidade}
                    blurOnSubmit={false}
                    onSubmitEditing={() => setFocus('senha')}
                  />
                </Row>

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
            <ChangePassword ref={refModalPassword} />
            <DeletarContaModal ref={refModalExcluir} />
          </View>
        </ContentScroll>
      )}
    </ContainerPage>
  );
};

export default Profile;
