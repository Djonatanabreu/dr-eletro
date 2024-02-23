import React, { useEffect, useState } from 'react';

import { BackgroundAuth, ButtonText, Container, ImageAuth } from './styles';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'axios';

import { TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { Props } from '../../../interfaces/routes.interface';
import useToast from '../../../libs/useToast';
import { UserLogin } from '../../../interfaces/auth.interface';
import { useUserStore } from '../../../store/user';
import { ResponseError } from '../../../interfaces/utils.interface';
import { loginSchema } from '../../../validators/auth.schemas';
import { bannerAuth, email, password } from '../../../assets/img';
import { Column, ContentScroll, TitleAuth } from '../../../components/commons';
import Input from '../../../components/Inputs/Input';
import Button from '../../../components/Button';
import api from 'services/api';
import useAuthStore from 'store/auth';
import { visibility } from 'components/Modals/LoginModal/store/sliceLoginModalVisibility';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { Spacer } from 'components/Spacer/Spacer';

const Login = ({ route, navigation }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const setSigned = useAuthStore(state => state.setSigned);

  const { width } = useWindowDimensions();

  const toast = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitLogin = async (formData: UserLogin) => {
    try {
      setLoading(true);

      const { data: response } = await api.post('/login.php', formData);

      if (response.error) {
        toast.errorToast(response.error);
        return;
      }

      useUserStore.getState().setUser(response.data);
      useAuthStore.getState().setToken(response.token);

      // navigation.navigate('Home');

      toast.successToast('Login realizado com sucesso !');
    } catch (error) {
      console.log(error);

      const typedError = error as ResponseError;
      if (axios.isAxiosError(error)) {
        toast.errorToast(typedError?.response?.data?.message);
      } else {
        toast.errorToast('Erro ao efetuar o login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.name === 'Login' || route.name === 'Register') {
      dispatch(visibility({ isVisible: false, condition: true }));
    }
  }, []);

  const {
    control,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({
    defaultValues: {
      email: '',
      senha: '',
    },
    resolver: yupResolver(loginSchema),
  });

  return (
    <Container>
      <BackgroundAuth source={bannerAuth} resizeMode="contain" />
      <ContentScroll style={{ marginTop: width * 0.4 }}>
        <Column style={{ width: width * 0.8 }}>
          <TitleAuth>Login</TitleAuth>
          <Spacer amount={4} />
          <View
            style={{
              gap: width * 0.05,
              minHeight: 140,
            }}
          >
            <Input
              control={control}
              name="email"
              autoCapitalize="none"
              placeholder="Email"
              Icon={email}
              keyboardType="email-address"
              returnKeyType="next"
              error={errors.email}
              blurOnSubmit={false}
              onSubmitEditing={() => setFocus('senha')}
            />
            <Input
              control={control}
              secure
              Icon={password}
              placeholder="Senha"
              name="senha"
              autoCapitalize="none"
              returnKeyType="done"
              error={errors.senha}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <ButtonText style={{ fontSize: 16 }}>
              Esqueci minha senha
            </ButtonText>
          </TouchableOpacity>
          <Spacer amount={1} />
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <ButtonText style={{ fontSize: 16 }}>
              Não possui conta? Cadastre-se agora!
            </ButtonText>
          </TouchableOpacity>
          <Spacer amount={4} />
          <View>
            <Button
              onPress={handleSubmit(handleSubmitLogin)}
              label="Entrar"
              loading={loading}
              fullWidth
              color="secondaryDark"
              variantType="block"
            />
          </View>
          <Spacer amount={4} />

          <TouchableOpacity
            onPress={() => {
              setSigned(true);
              useUserStore.getState().setUser(null);
              // navigation.navigate('Home');
            }}
          >
            <ButtonText style={{ fontSize: 16 }}>
              Entrar sem cadastro
            </ButtonText>
          </TouchableOpacity>
          <Spacer amount={1} />
        </Column>
      </ContentScroll>
    </Container>
  );
};

export default Login;
