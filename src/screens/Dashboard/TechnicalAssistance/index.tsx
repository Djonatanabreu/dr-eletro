import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Button from 'components/Button';
import Input from 'components/Inputs/Input';
import InputSelect from 'components/Inputs/InputSelect';

import { Spacer } from 'components/Spacer/Spacer';
import { Text } from 'components/Text/Text';
import { Column, ContentScroll, Title } from 'components/commons';
import { ResponseError } from 'interfaces/utils.interface';
import useToast from 'libs/useToast';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, Dimensions, RefreshControl } from 'react-native';
import BackHeader from 'screens/_headers/Back';
import api from 'services/api';
import useAuthStore from 'store/auth';
import { useCompanyStore } from 'store/company';
import { useUserStore } from 'store/user';

export default function TechnicalAssistance() {
  const [loading, setLoading] = useState(false);
  const { width } = Dimensions.get('window');
  const { company_id } = useCompanyStore(state => state);
  const { user } = useUserStore(state => state);
  const setSigned = useAuthStore(state => state.setSigned);
  const [serviceType, setServiceType] = useState([]);
  const { navigate } = useNavigation();

  const toast = useToast();

  const {
    control,
    handleSubmit,
    setFocus,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      nome: user?.nome,
      whatsapp: '',
      email: user?.email,
      tipo_servico_id: '',
      produtos: '',
      descricao: '',
    },
  });

  const handleSubmitUpdate = async (formData: any) => {
    try {
      setLoading(true);

      let form_data: any = new FormData();

      form_data.append('usuario_id', company_id);
      form_data.append('clientes_app_id', user?.id);
      for (let key in formData) {
        form_data.append(key, formData[key]);
        console.log(key);
      }

      const { data: response } = await api.post(
        '/cadastro_assistencia_tecnica.php',
        form_data,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );

      toast.successToast('Solicitação enviada com sucesso !');

      reset();

      setLoading(false);
    } catch (error) {
      console.log(error);
      const typedError = error as ResponseError;
      if (axios.isAxiosError(error)) {
        toast.errorToast(typedError?.response?.data?.message);
      } else {
        toast.errorToast('Erro ao efetuar o solicitação');
      }
    }
  };

  const handleFormChange = async userFormData => {
    try {
      const { data: response } = await api.get('lista_servicos.php', {
        params: { usuario_id: company_id },
      });

      setServiceType(response);
      setValue('whatsapp', userFormData.whatsapp);
      setValue('produtos', userFormData.produto);
      setValue('descricao', userFormData.descricao);
    } catch (error) {
      console.error('Erro ao obter dados do tipo de serviço:', error);
    }
  };

  const formInputsValue = getValues();

  useEffect(() => {
    handleFormChange(formInputsValue);
  }, []);

  return (
    <ContentScroll
      style={{
        paddingHorizontal: width * 0.06,
        marginTop: 10,
      }}
      efreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => {}} />
      }
    >
      <BackHeader title="Assistência Técnica" />
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
              navigate('LoginRoutes', {
                screen: 'login',
              });
            }}
            label="Login"
            color="primary"
            variantType="block"
          />
        </View>
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}
        >
          <Text color="Alternative">Formulário</Text>
          <Spacer amount={1} />
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
              onSubmitEditing={() => setFocus('whatsapp')}
            />
            <Input
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
              onSubmitEditing={() => setFocus('email')}
            />
            <Input
              label="E-mail:"
              control={control}
              name="email"
              gray
              removeRadius
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              error={errors.email}
              blurOnSubmit={false}
              onSubmitEditing={() => setFocus('tipoServico')}
            />
            <InputSelect
              items={serviceType.map((service: any) => ({
                id: service.id,
                label: service.nome,
                value: service.id,
              }))}
              gray
              removeRadius
              control={control}
              label="Tipo de serviço:"
              error={errors.tipoServico}
              name="tipo_servico_id"
            />
            <Input
              label="Produto:"
              control={control}
              name="produtos"
              gray
              removeRadius
              autoCapitalize="none"
              returnKeyType="next"
              error={errors.produto}
              blurOnSubmit={false}
              onSubmitEditing={() => setFocus('cep')}
              items={serviceType}
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
            <Button
              onPress={handleSubmit(handleSubmitUpdate)}
              label="Salvar"
              loading={loading}
              fullWidth
              color="secondaryDark"
              variantType="block"
            />
            <Spacer amount={3} />
          </Column>
        </View>
      )}
    </ContentScroll>
  );
}
