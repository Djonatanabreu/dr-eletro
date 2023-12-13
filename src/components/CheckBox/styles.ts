import { Colors } from 'components/Theme';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '90%',
    maxHeight: Dimensions.get('screen').height * 0.8,
  },
  checkBoxStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.White,
    borderRadius: 4,
    width: Dimensions.get('screen').width * 0.07,
    height: Dimensions.get('screen').width * 0.07,
    marginRight: Dimensions.get('screen').width * 0.03,
  },
  inputsContainer: {
    width: '100%',
    height: '95%',
  },
});
