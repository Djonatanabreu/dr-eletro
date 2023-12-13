import { Text, View, useWindowDimensions } from 'react-native';
import { defaultTheme } from 'styles/default';

export const DialyPhrases = ({ phrase, author }) => {
  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        width: width * 0.84,
        backgroundColor: defaultTheme.secondary,
        height: width * 0.44,
        borderRadius: width * 0.07,
        padding: 8,
        gap: 3,
      }}
    >
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 20,
          color: '#fff',
          fontWeight: 700,
          marginTop: 3,
        }}
      >
        Frase do Dia
      </Text>
      <View
        style={{
          alignSelf: 'center',
          width: width * 0.35,
          height: 1,
          backgroundColor: '#fff',
        }}
      />
      <View
        style={{
          height: '60%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            fontStyle: 'italic',
            fontSize: 24,
            color: '#fff',
          }}
        >
          {phrase}
        </Text>
      </View>
      <Text
        style={{
          textAlign: 'center',
          alignSelf: 'center',
          fontSize: 16,
          color: '#fff',
        }}
      >
        {author}
      </Text>
    </View>
  );
};
