import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import DocumentsDashboard from './views/Documents/DocumentsDashboard';
import DocumentsNotSigned from './views/Documents/DocumentsNotSigned';
import DocumentViewer from './views/Documents/DocumentViewer';
import ScreenHeader from './Components/ScreenHeader/ScreenHeader';
import NotificationBell from './Components/notificationBell/notificationBell';
import ConfigComponent from './views/Config/ConfigComponent';
import HelpComponent from './views/Config/HelpComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

//React navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//importar state de context
import RouteContext from './context/RouteContext';
import TokenServices from './services/token/TokenServices';
const Stack = createStackNavigator();

const Navigation = () => {
  const [token, setToken] = useState();
  const headerStyle = {
    backgroundColor: '#3f51b5',
  };
  const {route, setRoute} = useContext(RouteContext);
  useEffect(() => {
    const tokenGet = TokenServices.getToken();
    console.log('tokenGet', tokenGet);
    setToken(tokenGet);
    TokenServices.token.attach(setToken);
    return () => {
      TokenServices.token.detach(setToken);
    };
  }, []);
  return (
    <>
      {token == null || token == '' ? (
        <Login />
      ) : (
        <NavigationContainer>
          {route === 'documents' ? (
            <Stack.Navigator
              initialRouteName="Documentos"
              screenOptions={{
                headerTintColor: '#fff',
                headerStyle: {
                  backgroundColor: '#3f51b5',
                },
              }}>
              <Stack.Screen
                options={{
                  title: (
                    <ScreenHeader fontIcon="faFileAlt" title="Documentos" />
                  ),
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
                  headerRight: () => <NotificationBell />,
                }}
                name="DocumentsNotSigned"
                component={DocumentsNotSigned}
              />
              <Stack.Screen
                component={DocumentViewer}
                options={({route}) => ({
                  title: route.params.otherParam,
                  headerRight: () => <NotificationBell />,
                })}
                name="DocumentViewer"
              />
            </Stack.Navigator>
          ) : null}
          {route === 'licencias' ? (
            <Stack.Navigator
              initialRouteName="Inicio"
              screenOptions={{
                headerTintColor: '#fff',
                headerStyle: {
                  backgroundColor: '#3f51b5',
                },
              }}>
              <Stack.Screen name="Inicio">
                {(props) => <Dashboard {...props} />}
              </Stack.Screen>
            </Stack.Navigator>
          ) : null}
          {route === 'config' ? (
            <Stack.Navigator
              initialRouteName="Config"
              screenOptions={{
                headerTintColor: '#fff',
                headerStyle: {
                  backgroundColor: '#3f51b5',
                },
              }}>
              <Stack.Screen
                options={{
                  title: (
                    <ScreenHeader fontIcon="faCog" title="Configuración" />
                  ),
                  headerRight: () => <NotificationBell />,
                }}
                name="Config"
                component={ConfigComponent}
              />
              <Stack.Screen
                options={{
                  title: (
                    <View>
                      <Text style={styles.subtitleText}>Configuración</Text>
                      <Text style={styles.titleText}>/Ayuda</Text>
                    </View>
                  ),
                  headerRight: () => <NotificationBell />,
                }}
                name="Help"
                component={HelpComponent}
              />
            </Stack.Navigator>
          ) : null}
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
