import { NewButton } from 'components/Button/NewButton/NewButton';
import { Error } from 'components/Inputs/Input/styles';
import { Colors } from 'components/Theme';
import useToast from 'libs/useToast';
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import BackHeader from 'screens/_headers/Back';
import api from 'services/api';
import { useCompanyStore } from 'store/company';
import { useUserStore } from 'store/user';
import { defaultTheme } from 'styles/default';

interface ICardUnit {
  id: string;
  titulo: string;
  descricao: string;
  clientes_app_id: string;
}

export default function TechnicalAssistance() {
  const [ideaList, setIdeaList] = useState<ICardUnit[]>([]);
  const [newCardidea, setNewCardIdea] = useState<boolean>(false);
  const [newCardData, setNewCardData] = useState<ICardUnit | null>(null);
  const [errors, setErrors] = useState<boolean>(false);
  const { width } = Dimensions.get('window');
  const { company_id } = useCompanyStore(state => state);
  const { user } = useUserStore(state => state);

  const toast = useToast();

  const getIdeaData = async () => {
    try {
      const { data: response } = await api.get('/minhas_ideias.php', {
        params: { usuario_id: company_id },
      });

      const filterIdeasListByClientId = () => {
        return response.data.filter((idea: ICardUnit) => {
          return idea.clientes_app_id === user?.id;
        });
      };

      setIdeaList(filterIdeasListByClientId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewIdea = () => {
    setNewCardIdea(!newCardidea);
  };

  const handleSubmitNewIdea = async () => {
    const form_data = new FormData();

    if (!newCardData?.titulo || !newCardData?.descricao) {
      setErrors(true);

      return;
    }
    if (newCardData?.titulo && newCardData?.descricao) {
      form_data.append('usuario_id', String(company_id));
      form_data.append('titulo', newCardData.titulo);
      form_data.append('descricao', newCardData.descricao);
      form_data.append('clientes_app_id', String(user?.id!));
    }

    try {
      const { data: response } = await api.post(
        '/cadastrarIdeia.php',
        form_data,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );

      handleNewIdea();

      await getIdeaData();
      if (response.status === 200) {
        const newIdea = {
          titulo: newCardData.titulo,
          descricao: newCardData.descricao,
          id: Math.random().toString(),
          clientes_app_id: user?.id!,
        };
        setIdeaList([newIdea, ...ideaList]);
        setNewCardIdea(!newCardidea);
      }
      setNewCardData(null);
      toast.successToast('Ideia criada com sucesso!');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIdeaData();
  }, []);

  return (
    <ScrollView style={{ paddingHorizontal: width * 0.06 }}>
      <BackHeader title="Minhas Ideias" />
      <View
        style={{
          marginTop: 10,
          marginBottom: 25,
          gap: 20,
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <NewButton
            iconButton
            buttonHeight={40}
            buttonText="Criar Ideia"
            onPress={handleNewIdea}
          />
          {newCardidea ? (
            <NewButton
              iconButton
              buttonHeight={40}
              buttonWidth={120}
              buttonText="Salvar"
              onPress={handleSubmitNewIdea}
            />
          ) : null}
        </View>
        {newCardidea ? (
          <TouchableOpacity
            style={{
              width: width * 0.84,
              backgroundColor: defaultTheme.secondary,
              height: width * 0.42,
              borderRadius: width * 0.07,
              padding: 8,
            }}
          >
            <TextInput
              style={{
                width: '100%',
                alignSelf: 'center',
                fontSize: 22,
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              placeholder="Título"
              placeholderTextColor={'#fff'}
              onChangeText={value => {
                setNewCardData(prevState => {
                  setErrors(false);
                  const newState = { ...prevState, titulo: value };
                  return newState;
                });
                getIdeaData();
              }}
            />

            <View
              style={{
                alignSelf: 'center',
                width: '100%',
                height: 2,
                backgroundColor: '#fff',
              }}
            />

            <View
              style={{
                height: '70%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TextInput
                style={{
                  alignSelf: 'center',
                  fontSize: 20,
                  color: '#fff',
                  height: '100%',
                  width: '90%',
                  textAlign: 'center',
                }}
                placeholderTextColor={'#fff'}
                placeholder="Descrição"
                onChangeText={value => {
                  setNewCardData(prevState => {
                    setErrors(false);
                    const newState = { ...prevState, descricao: value };
                    return newState;
                  });
                }}
              />
            </View>
            {errors && (
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 16,
                  position: 'absolute',
                  bottom: -20,
                  color: Colors.Red,
                }}
              >
                {'Campos Obrigatórios.'}
              </Text>
            )}
          </TouchableOpacity>
        ) : null}

        <Text style={{ fontSize: 16, marginTop: 10, marginLeft: 8 }}>
          Últimas Ideias Criadas:
        </Text>
        <View style={{ marginBottom: width * 0.06, gap: 20 }}>
          {ideaList.map((item, index) => (
            <TouchableOpacity
              key={index * Math.random() + Date.now()}
              style={{
                width: width * 0.84,
                backgroundColor: defaultTheme.secondary,
                height: width * 0.42,
                borderRadius: width * 0.07,
                padding: 8,
              }}
            >
              <TextInput
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  fontSize: 22,
                  color: '#fff',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
                value={item.titulo}
                editable={false}
              />

              <View
                style={{
                  alignSelf: 'center',
                  width: '100%',
                  height: 2,
                  backgroundColor: '#fff',
                }}
              />

              <View
                style={{
                  height: '70%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RenderHTML
                  source={{
                    html: `<div  style="color: #fff; padding: 0, margin: 0; margin-bottom: 5px; font-size: 20px; text-align: center; align-self: center " >${item.descricao}</div>`,
                  }}
                  contentWidth={width * 0.5}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
