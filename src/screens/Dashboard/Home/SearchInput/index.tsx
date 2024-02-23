import { Icon } from 'components/Icon/Icon';
import { Colors } from 'components/Theme';
import { width } from 'components/Theme/Responsive';
import { useState } from 'react';
import { TextInput, TextInputProps, TextStyle, View } from 'react-native';
import api from 'services/api';
import { useCompanyStore } from 'store/company';

export interface ISearchInputProps extends TextInputProps {
  IconPosition?: boolean | 'left' | 'right';
  placeholder?: string;
  fontWeight?: TextStyle['fontWeight'];
  fontSize?: TextStyle['fontSize'];
}

export function SearchInput({
  IconPosition,
  placeholder = 'Type your placeholder Text',
  fontWeight = '500',
  fontSize = 16,
  ...props
}: ISearchInputProps) {
  const [value, setValue] = useState<string>();
  const [productList, setProductList] = useState<string>();

  const { company_id } = useCompanyStore(state => state);

  const handleChangeSearchValue = (value: string) => {
    setValue(value);
  };

  const fetchProductList = async () => {
    // setIsLoading(true);
    try {
      const { data: response } = await api.get('/lista_produtos.php', {
        params: {
          usuario_id: company_id,
        },
      });
      const filteredProductList = response.data.includes(product => {
        product.titulo === value;
      });
      setProductList(filteredProductList);

      // setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={{
        alignSelf: 'center',
        width: '100%',
        height: 50,
        borderColor: Colors.Secondary,
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: Colors.LightGrey,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        gap: 5,
      }}
    >
      {IconPosition === 'left' && <Icon name={'MagnifyingGlass'} />}
      <TextInput
        placeholder={placeholder}
        style={{
          fontSize: fontSize,
          fontWeight: fontWeight,
          width: width(65),
          height: '80%',
          alignItems: 'center',
        }}
        {...props}
        value={value}
        onChangeText={handleChangeSearchValue}
      />
      {IconPosition === 'right' && <Icon name={'MagnifyingGlass'} />}
    </View>
  );
}
