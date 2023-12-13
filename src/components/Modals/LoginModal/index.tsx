import { NewButton } from 'components/Button/NewButton/NewButton';
import { Text } from 'components/Text/Text';
import React, { useEffect } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppStore } from 'store';
import { visibility } from './store/sliceLoginModalVisibility';

const ModalScreen = ({ onClose, onNavigateToLogin }) => {
  const visibilitySelector = useSelector(
    (state: AppStore) => state.loginModalVisibility
  );

  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   if (!signed ) {
  //     dispatch(visibility({ isVisible: true }));
  //   }
  // }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibilitySelector.isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text size={22} color="Alternative">
            Bem-vindo!
          </Text>
          <Text size={18} color="Base">
            Você precisa fazer login ou se cadastrar.
          </Text>
          <View style={styles.buttonsContainer}>
            <NewButton buttonText="Click Aqui" onPress={onNavigateToLogin} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  buttonText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
});

export default ModalScreen;
