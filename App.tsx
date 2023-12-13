import React from 'react';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import 'react-native-gesture-handler';
import Toast, { BaseToast } from 'react-native-toast-message';

import { ThemeProvider } from 'styled-components';
import { LoadFonts } from './src/components/commons';
import { defaultTheme } from './src/styles/default';
import Routes from './src/routes';
import { Provider } from 'react-redux';
import { store } from 'store';

const toastConfig = {
  default: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green', marginTop: 25 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  error: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'red', marginTop: 25 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
};

export default function App() {
  return (
    <LoadFonts>
      <>
        <AutocompleteDropdownContextProvider>
          <ThemeProvider theme={defaultTheme}>
            <Provider store={store}>
              <Routes />
            </Provider>
          </ThemeProvider>
        </AutocompleteDropdownContextProvider>

        <Toast config={toastConfig} />
      </>
    </LoadFonts>
  );
}
