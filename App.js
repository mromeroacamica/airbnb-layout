import 'react-native-gesture-handler';
import React, {useState} from 'react';
import Container from './Components/Container/Container';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import DocumentsDashboard from './views/Documents/DocumentsDashboard';
import ScreenHeader from './Components/ScreenHeader/ScreenHeader';

//React navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  const [token, setToken] = useState('');
  const headerStyle = {
    backgroundColor: '#3f51b5',
  };
  return (
    <>
      {!token === '' ? (
        <Login setToken={setToken} />
      ) : (
        // <Container>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Documentos">
            <Stack.Screen
              options={{
                title: <ScreenHeader fontIcon="faCoffee" title="Documentos" />,
                headerStyle,
              }}
              name="Documentos"
              component={DocumentsDashboard}
            />
            <Stack.Screen name="Inicio" component={Dashboard} />
          </Stack.Navigator>
        </NavigationContainer>
        // </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
