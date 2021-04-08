import 'react-native-gesture-handler';
import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import TokenServices from './services/token/TokenServices';

//importar state de context
import RouteState from './context/RouteState';
import Navigation from './Navigation';

const App = () => {
  const [initLoaded, setInitLoaded] = useState(false);
  useEffect(() => {
    async function getToken() {
      await TokenServices.init();
      setInitLoaded(true);
    }
    getToken();
  }, []);

  return (
    <>
      {initLoaded ? (
        <RouteState>
          <Navigation />
        </RouteState>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
