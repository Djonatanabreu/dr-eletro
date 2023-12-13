import { ImageSourcePropType } from 'react-native';

export interface IProductPage {
  page: number;
  totalRecords: number;
  totalDisplayRecords: number;
}

export type ProductListType = {
  id: number;
  data_cadastro: string;
  titulo: string;
  imagem: ImageSourcePropType;
  resumo: string;
  descricao: string;
  status: string;
  destaque: string;
  categorias_produtos_id: string;
};

export type IProductItemType = {
  titulo?: string;
  imagem?: ImageSourcePropType;
  description?: string;
  onPress?: () => void;
};
export interface IProductProps {
  titulo?: string;
  imagem?: ImageSourcePropType;
  descricao?: string;
}
