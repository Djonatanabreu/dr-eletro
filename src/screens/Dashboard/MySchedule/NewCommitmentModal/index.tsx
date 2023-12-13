import { useEffect, useState } from 'react';
import {
  View,
  Modal,
  TextInput,
  Pressable,
  Platform,
  TouchableNativeFeedbackBase,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';

import { height, width } from 'components/Theme/Responsive';
import { Text } from 'components/Text/Text';
import { Colors } from 'components/Theme';
import { NewButton } from 'components/Button/NewButton/NewButton';
import { ScrollView } from 'react-native-gesture-handler';
import moment, { Moment } from 'moment';
import { masks } from 'utils/masks';
import api from 'services/api';
import { useCompanyStore } from 'store/company';
import { useUserStore } from 'store/user';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'components/Icon/Icon';

interface ICommitmentUnit {
  titulo: string;
  data_agendada: string;
  horario: string;
  descricao: string;
}

const NewCommitmentModal = ({ isVisible, onClose }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { company_id } = useCompanyStore(state => state);
  const [commitmentData, setCommitmentData] = useState<ICommitmentUnit>({
    titulo: '',
    data_agendada: '',
    horario: '',
    descricao: '',
  });

  const { user } = useUserStore(state => state);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onChange = ({ type }, selectedData) => {
    if (type === 'set') {
      const currentDate = moment(selectedData).format('YYYY-MM-DD');
      const formatted = moment(selectedData).format('DD/MM/YYYY');

      if (Platform.OS === 'android') {
        toggleDatePicker();
        setSelectedDate(formatted);
        setCommitmentData(prevState => ({
          ...prevState,
          data_agendada: currentDate,
        }));
      }
    } else {
      toggleDatePicker();
    }
  };

  const onChangeTime = ({ type }, onChangeHour) => {
    if (type === 'set') {
      const currentDate = moment(onChangeHour).format('HH:mm');
      const formatted = moment(onChangeHour).format('HH:mm');

      if (Platform.OS === 'android') {
        toggleTimePicker();
        setSelectedTime(formatted);
        setCommitmentData(prevState => ({
          ...prevState,
          horario: currentDate + ':00',
        }));
      }
    } else {
      toggleTimePicker();
    }
  };

  const handleSendCommitment = async () => {
    const formData = new FormData();

    formData.append('titulo', commitmentData.titulo);
    formData.append('data_agendada', commitmentData.data_agendada);
    formData.append('descricao', commitmentData.descricao);
    formData.append('horario', commitmentData.horario);
    formData.append('usuario_id', String(company_id));
    formData.append('clientes_app_id', String(user?.id!));
    try {
      if (
        commitmentData.titulo &&
        commitmentData.data_agendada &&
        commitmentData.horario
      ) {
        const res = await api.post('/cadastrarAgenda.php', formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        });
      }
      setSelectedDate('');
      setSelectedTime('');
      setCommitmentData({
        titulo: '',
        data_agendada: '',
        horario: '',
        descricao: '',
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <ScrollView>
        <View
          style={{
            alignSelf: 'center',
            width: width(80),
            marginTop: height(10),
            backgroundColor: '#fff',
            height: height(75),
            marginBottom: 10,
            justifyContent: 'space-around',
            borderRadius: 20,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: width(20),
            }}
          >
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', marginHorizontal: 20 }}
              onPress={onClose}
            >
              <Icon name="CloseIcon" />
            </TouchableOpacity>
            <Text color="MediumGrey" size={22}>
              Adicionar Compromisso
            </Text>
          </View>
          <View style={{ width: width(70) }}>
            <Text color="MediumGrey">Título:</Text>
            <TextInput
              style={{
                paddingHorizontal: 8,
                width: '100%',
                height: 45,
                backgroundColor: Colors.Grey,
                borderRadius: width(2),
              }}
              value={commitmentData.titulo}
              onChangeText={value =>
                setCommitmentData(prevState => ({
                  ...prevState,
                  titulo: value,
                }))
              }
            />
          </View>
          {!showDatePicker && (
            <Pressable style={{ width: width(70) }} onPress={toggleDatePicker}>
              <Text color="MediumGrey">Data:</Text>
              <TextInput
                id={'Date'}
                maxLength={10}
                style={{
                  paddingHorizontal: 8,
                  width: '100%',
                  height: 45,
                  backgroundColor: Colors.Grey,
                  borderRadius: width(2),
                }}
                value={selectedDate}
                onChangeText={setSelectedDate}
                placeholder="Escolha uma data"
                onPressIn={toggleDatePicker}
              />
            </Pressable>
          )}
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              onChange={onChange}
              display="calendar"
            />
          )}

          {!showTimePicker && (
            <Pressable onPress={toggleDatePicker} style={{ width: width(70) }}>
              <Text color="MediumGrey">Horário:</Text>
              <TextInput
                id="Time"
                style={{
                  paddingHorizontal: 8,
                  width: '100%',
                  height: 45,
                  backgroundColor: Colors.Grey,
                  borderRadius: width(2),
                }}
                keyboardType="number-pad"
                maxLength={5}
                placeholder={'Escolha um horário'}
                value={selectedTime}
                onChangeText={setSelectedTime}
                onPressIn={toggleTimePicker}
              />
            </Pressable>
          )}
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              onChange={onChangeTime}
              display="clock"
            />
          )}
          {/* <View style={{ width: width(70) }}>
            <Text color="MediumGrey">Observação:</Text>
            <TextInput
              style={{
                paddingHorizontal: 8,
                width: '100%',
                height: 90,
                backgroundColor: Colors.Grey,
                borderRadius: width(2),
              }}
              value={commitmentData.descricao}
              maxLength={300}
              numberOfLines={4}
              onChangeText={value =>
                setCommitmentData(prevState => ({
                  ...prevState,
                  descricao: value,
                }))
              }
              placeholder="Escreva uma Observação"
            />
          </View> */}
          <NewButton
            buttonText={
              commitmentData.titulo &&
              commitmentData.data_agendada &&
              commitmentData.horario
                ? 'Adicionar'
                : 'Cancelar'
            }
            onPress={handleSendCommitment}
          />
        </View>
      </ScrollView>
    </Modal>
  );
};

export default NewCommitmentModal;
