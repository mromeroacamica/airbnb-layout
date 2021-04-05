import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import DocumentsDashboard from './views/Documents/DocumentsDashboard';
import DocumentsNotSigned from './views/Documents/DocumentsNotSigned';
import ScreenHeader from './Components/ScreenHeader/ScreenHeader';
import NotificationBell from './Components/notificationBell/notificationBell';

//React navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  const [token, setToken] = useState('');
  const [documents, setDocuments] = useState(true);
  const headerStyle = {
    backgroundColor: '#3f51b5',
  };
  return (
    <>
      {!token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <NavigationContainer>
          {documents ? (
            <Stack.Navigator initialRouteName="Documentos">
              <Stack.Screen
                options={{
                  title: (
                    <ScreenHeader fontIcon="faCoffee" title="Documentos" />
                  ),
                  headerStyle,
                  headerRight: () => <NotificationBell />,
                }}
                name="Documentos">
                {(props) => (
                  <DocumentsDashboard {...props} setDocuments={setDocuments} />
                )}
              </Stack.Screen>
              <Stack.Screen
                name="DocumentsNotSigned"
                title="Pendientes de firma"
                component={DocumentsNotSigned}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName="Inicio">
              <Stack.Screen name="Inicio">
                {(props) => (
                  <Dashboard {...props} setDocuments={setDocuments} />
                )}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
