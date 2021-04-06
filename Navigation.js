import React, {useState, useContext} from 'react';
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

//importar state de context
import RouteContext from './context/RouteContext';
const Stack = createStackNavigator();

const Navigation = () => {
  const [token, setToken] = useState('');
  const headerStyle = {
    backgroundColor: '#3f51b5',
  };
  const {route, setRoute} = useContext(RouteContext);
  console.log('route desde inicio', route);

  return (
    <>
      {!token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <NavigationContainer>
          {route ? (
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
                {(props) => <DocumentsDashboard {...props} />}
              </Stack.Screen>
              <Stack.Screen
                options={{
                  title: (
                    <View>
                      <Text style={styles.subtitleText}>Documentos</Text>
                      <Text style={styles.titleText}>/Pendientes de firma</Text>
                    </View>
                  ),
                  headerStyle,
                  headerTintColor: '#fff',
                  headerRight: () => <NotificationBell />,
                }}
                name="DocumentsNotSigned"
                component={DocumentsNotSigned}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName="Inicio">
              <Stack.Screen name="Inicio">
                {(props) => <Dashboard {...props} />}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </NavigationContainer>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: 'white',
    fontSize: 14,
  },
});

export default Navigation;
