import { NewButton } from 'components/Button/NewButton/NewButton';
import { StatusButton } from 'components/Button/StatusButton/NewButton';
import { Spacer } from 'components/Spacer/Spacer';
import { Text } from 'components/Text/Text';
import { Colors } from 'components/Theme';
import { width } from 'components/Theme/Responsive';
import { Image, View } from 'react-native';

export const OrderProductUnit = ({
  title,
  price,
  image,
  status,
  statusColor,
  codigo,
}) => {
  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text color="MediumGrey" size={14}>
          Pedido: {codigo}
        </Text>
        <Spacer amount={1.5} />
        <StatusButton
          buttonColor={statusColor}
          buttonWidth={width(35)}
          buttonHeight={width(10)}
          buttonText={status}
        />
      </View>
      <View
        style={{
          width: width(40),
          height: width(15),
        }}
      >
        <View style={{ flexDirection: 'row', gap: 4, paddingVertical: 3 }}>
          <Image
            style={{
              borderRadius: 5,
              borderColor: Colors.Grey,
              borderWidth: 1,
            }}
            width={width(15)}
            height={width(15)}
            source={{
              uri: `https://www.app.duotecnologia.com/images/produtos/${image}`,
            }}
          />
          <View style={{ justifyContent: 'space-between' }}>
            <Text size={18} color="MediumGrey">
              {title}
            </Text>
            <Text size={18} color="MediumGrey">
              R$: {price}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
