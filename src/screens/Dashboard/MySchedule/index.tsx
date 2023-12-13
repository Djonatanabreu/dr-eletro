import { NewButton } from 'components/Button/NewButton/NewButton';
import { CheckBox } from 'components/CheckBox';
import { Text } from 'components/Text/Text';
import { useEffect, useState } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { View } from 'react-native';
import BackHeader from 'screens/_headers/Back';
import api from 'services/api';
import { useCompanyStore } from 'store/company';
import { defaultTheme } from 'styles/default';
import Calendar from './Calendar';
import NewCommitmentModal from './NewCommitmentModal';
import moment from 'moment';
import { useUserStore } from 'store/user';

interface ICommimentUnit {
  id: string;
  titulo: string;
  data_agendada: string;
  horario: string;
  descricao: string;
  confirmado: number;
  clientes_app_id: string;
}

const MySchedule = ({ route, navigation }: any) => {
  const [commitmentList, setCommitmentList] = useState<ICommimentUnit[]>([]);
  const [switchedDate, setSwitchedDate] = useState<Date>(new Date());
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const { company_id } = useCompanyStore(state => state);
  const { user } = useUserStore(state => state);

  const fetchScheduleData = async () => {
    try {
      const { data: response } = await api.get('/minha_agenda.php', {
        params: { usuario_id: company_id },
      });

      const filterCommitmentList = () => {
        return response.data.filter((commitment: ICommimentUnit) => {
          return commitment.clientes_app_id === user?.id;
        });
      };

      setCommitmentList(filterCommitmentList());
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCommitmentList = commitmentList.filter(commitment => {
    const actualDate = switchedDate.toLocaleDateString('en-CA');

    if (commitment.data_agendada === actualDate) {
      return commitment;
    }
  });

  const orderCommitmentListByHour = () => {
    return filteredCommitmentList.sort((a, b) => {
      const horaA = moment(a.horario, 'HH:mm');
      const horaB = moment(b.horario, 'HH:mm');

      return horaA.diff(horaB);
    });
  };

  const onChangeDate = (switchedDate: Date) => {
    setSwitchedDate(switchedDate);
    fetchScheduleData();
  };

  const handleChangeHour = (value: string, index: number) => {
    commitmentList.forEach((item, indexT) => {
      if (indexT === index) {
        item.horario = value as string;
      }
    });
  };
  const handleChangeTitle = (value: string, index: number) => {
    commitmentList.forEach((item, indexT) => {
      if (indexT === index) {
        item.horario = value as string;
      }
    });
  };

  const handleCheckCommitment = async (
    checked: boolean,
    item: ICommimentUnit
  ) => {
    const form_data = new FormData();

    form_data.append('id', item.id);
    form_data.append('usuario_id', String(company_id));
    form_data.append('confirmado', String(checked ? 1 : 0));
    form_data.append('clientes_app_id', user?.id!);

    try {
      const { data: response } = await api.post(
        'confirmarAgenda.php',
        form_data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      fetchScheduleData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const { width, height } = useWindowDimensions();
  return (
    <ScrollView style={{ paddingHorizontal: 25 }}>
      <BackHeader title="Minha Agenda" />
      <View style={{ alignItems: 'center', gap: 20, marginTop: 15 }}>
        <Calendar onSwitchDate={onChangeDate} />
        <NewButton
          onPress={() => setIsVisibleModal(!isVisibleModal)}
          buttonWidth={width * 0.7}
          buttonText="Criar novo compromisso"
        />

        <View
          style={{
            gap: width * 0.04,
            alignItems: 'center',
            paddingVertical: width * 0.05,
          }}
        >
          <Text color="MediumGrey" size={26}>
            Meus Compromissos
          </Text>

          {filteredCommitmentList
            ? orderCommitmentListByHour().map((item, index: number) => {
                return (
                  <View
                    key={item.id}
                    style={{
                      width: width * 0.8,
                      height: width * 0.15,
                      backgroundColor: defaultTheme.secondary,
                      borderRadius: 14,
                      justifyContent: 'center',
                      paddingHorizontal: 10,
                    }}
                  >
                    <View>
                      <CheckBox
                        isComplete={!!Number(item.confirmado)}
                        onChangeTitle={value => handleChangeTitle(value, index)}
                        onChangeHour={value => {
                          handleChangeHour(value, index);
                        }}
                        onCheck={checked =>
                          handleCheckCommitment(checked, item)
                        }
                        time={item.horario.slice(0, 5)}
                        title={item.titulo}
                        onPressInputs={editable => ''}
                      />
                    </View>
                  </View>
                );
              })
            : null}
        </View>
      </View>
      <NewCommitmentModal
        isVisible={isVisibleModal}
        onClose={() => {
          fetchScheduleData();
          setIsVisibleModal(!isVisibleModal);
        }}
      />
    </ScrollView>
  );
};

export default MySchedule;
