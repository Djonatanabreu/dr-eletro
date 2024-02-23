import { ImageSourcePropType } from 'react-native';

export type IProductHomeItemType = {
  titulo?: string;
  imagem?: ImageSourcePropType;
  description?: string;
  onPress?: () => void;
  valor?: string;
  handlerBuyProduct?: () => void;
};
