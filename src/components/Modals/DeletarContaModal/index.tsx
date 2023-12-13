import React, { useState } from 'react';

import axios from 'axios';
import DefaultModal from '../DefaultModal';
import { useUserStore } from '../../../store/user';
import useToast from '../../../libs/useToast';
import api from '../../../services/api';
import { ResponseError } from '../../../interfaces/utils.interface';
import { Column, Row } from '../../commons';
import Button from '../../Button';
import { logout } from '../../../utils/functions';

export interface DeletarContaModalProps {}

export interface DeletarContaModalHandle {
  open: () => void;
  close: () => void;
}

type ModalDefaultRef = React.ElementRef<typeof DefaultModal>;

const DeletarContaModal: React.ForwardRefRenderFunction<
  DeletarContaModalHandle,
  DeletarContaModalProps
> = (_, ref) => {
  const refModalDefault = React.useRef<ModalDefaultRef>(null);

  const user = useUserStore(state => state.user);

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSubmitUpdate = async () => {
    try {
      setLoading(true);

      var form_data: any = new FormData();

      form_data.append('id', user?.id);

      const { data: response } = await api.post(
        '/deletarConta.php',
        form_data,
        {
          headers: {
            'content-type': 'multipart/form-data',
          },
        }
      );

      if (response.error) {
        return toast.errorToast(response.error);
      }
      toast.successToast('Conta Deletada com sucesso!');
      logout();
    } catch (error) {
      console.log(error);
      const typedError = error as ResponseError;
      if (axios.isAxiosError(error)) {
        toast.errorToast(typedError?.response?.data?.message);
      } else {
        toast.errorToast('Erro ao efetuar a troca');
      }
    } finally {
      setLoading(false);
    }
  };

  React.useImperativeHandle(ref, () => ({
    open() {
      refModalDefault?.current?.open();
    },
    close() {
      refModalDefault?.current?.close();
    },
  }));

  return (
    <DefaultModal title="Deletar Conta?" ref={refModalDefault}>
      <Row style={{ gap: 15 }}>
        <Column style={{ width: '48%' }}>
          <Button
            onPress={() => refModalDefault?.current?.close()}
            label="Cancelar"
            loading={loading}
            fullWidth
            color="primary"
            variantType="block"
          />
        </Column>
        <Column style={{ width: '48%' }}>
          <Button
            onPress={() => handleSubmitUpdate()}
            label="Excluir"
            loading={loading}
            fullWidth
            color="danger"
            variantType="block"
          />
        </Column>
      </Row>
    </DefaultModal>
  );
};

export default React.forwardRef(DeletarContaModal);
