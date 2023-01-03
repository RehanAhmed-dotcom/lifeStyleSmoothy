import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RootNavigator from './src/navigations/authnavs/authnav';
import {Provider} from 'react-redux';
import {Store, persistor} from './src/redux/config/Index';
import {PersistGate} from 'redux-persist/integration/react';
const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
