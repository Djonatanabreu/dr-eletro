import { ImageSourcePropType } from 'react-native';

export type Banner = {
  id: number;
  link: string;
  nome: string;
  imagem: ImageSourcePropType;
};

export type News = {
  id: number;
  nome: string;
  imagem: ImageSourcePropType | string | undefined;
};
