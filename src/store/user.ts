import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from 'interfaces/user.interface';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface IAddressProps {
  zipCode: string;
  number: number;
  city: string;
  street: string;
  state: string;
  neighborhood: string;
}

type State = {
  user?: User;
  address?: IAddressProps;
};

type Actions = {
  setUser: (user?: User) => void;
  setAddress: (address?: IAddressProps) => void;
  logout: () => void;
};

export const useUserStore = create(
  persist<State & Actions>(
    set => ({
      user: undefined,
      address: undefined,
      setUser: user => {
        return set(state => ({
          ...state,
          user,
        }));
      },
      setAddress: address => {
        return set(state => ({
          ...state,
          address,
        }));
      },
      logout: () => {
        return set(() => ({
          user: undefined,
          address: undefined,
        }));
      },
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
