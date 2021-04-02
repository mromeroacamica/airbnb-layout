import 'react-native-gesture-handler';
import React, {useState} from 'react';
import Container from './Components/Container/Container';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import DocumentsDashboard from './views/Documents/DocumentsDashboard';

//React navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  const [token, setToken] = useState('');
  return (
    <>
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <Container>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Inicio">
              <Stack.Screen name="Documentos" component={DocumentsDashboard} />
              <Stack.Screen name="Inicio" component={Dashboard} />
            </Stack.Navigator>
          </NavigationContainer>
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
