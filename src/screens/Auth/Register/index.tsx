import React, { useEffect, useState } from 'react';

import { Container } from './styles';

import { useForm } from 'react-hook-form';

import axios from 'axios';

import { ButtonText } from '../Login/styles';
import { TouchableOpacity } from 'react-native';
import { Props } from '../../../interfaces/routes.interface';
import useToast from '../../../libs/useToast';
import api from '../../../services/api';
import { useUserStore } from '../../../store/user';

import { ResponseError } from '../../../interfaces/utils.interface';
import { UserRegister } from '../../../interfaces/auth.interface';

import { Column, ContentScroll, TitleAuth } from '../../../components/commons';
import Input from '../../../components/Inputs/Input';
import Button from '../../../components/Button';
import useAuthStore from 'store/auth';
import { useCompanyStore } from 'store/company';
import { visibility } from 'components/Modals/LoginModal/store/sliceLoginModalVisibility';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';

const Register = ({ route, navigation }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { company_id } = useCompanyStore(state => state);

  const toast = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitRegister = async (formData: any) => {
    try {
      setLoading(true);

      let form_data: any = new FormData();

      for (let key in formData) {
        form_data.append(key, formData[key]);
      }

      form_data.append('usuario_id', company_id);

      console.log(form_data);

      const { data: response } = await api.post('/cadastro.php', form_data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });

      if (response.error) {
        toast.errorToast(response.error);
        return;
      }

      useUserStore.getState().setUser({ ...response.data });
      useAuthStore.getState().setToken('token');

      toast.successToast('Registro realizado com sucesso !');
      navigation.navigate('Home');
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

  const {
    control,
    handleSubmit,
    setFocus,
    watch,
    formState: { errors },
  } = useForm<UserRegister>({
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
    },
  });

  useEffect(() => {
    if (route.name === 'Login' || route.name === 'Register') {
      dispatch(visibility({ isVisible: false, condition: true }));
    }
  }, []);

  return (
    <ContentScroll>
      <Container>
        <Column
          style={{
            gap: 20,
            paddingHorizontal: 20,
          }}
        >
          <TitleAuth style={{ marginTop: 15 }}>Cadastre-se</TitleAuth>

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
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            error={errors.email}
            blurOnSubmit={false}
            onSubmitEditing={() => setFocus('whatsapp')}
          />
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
            onPress={handleSubmit(handleSubmitRegister)}
            label="Cadastrar"
            loading={loading}
            fullWidth
            color="secondaryDark"
            variantType="block"
          />
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ButtonText>Voltar</ButtonText>
          </TouchableOpacity>
        </Column>
      </Container>
    </ContentScroll>
  );
};

export default Register;
