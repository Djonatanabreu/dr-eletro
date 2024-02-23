import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  NewsRoutes: undefined;
  Register: undefined;
  NewsDetail: {
    id: number;
    titulo: string;
    imagem: string;
    descricao: string;
    resumo: string;
  };
  ForgotPassword: undefined;
  Profile: undefined;
  MinhaAgenda: any;
  MinhasIdeias: any;
  TechnicalAssistance: any;
  MeusPedidos: any;
  Produtos: any;
};

export type Props = NativeStackScreenProps<RootStackParamList>;
