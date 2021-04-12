import React, {useState, useContext, useEffect, useMemo} from 'react';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import Login from './views/Login/Login';
import PasswordLogin from './views/Login/PasswordLogin';
import Dashboard from './views/Dashboard/Dashboard';
import DocumentsDashboard from './views/Documents/DocumentsDashboard';
import DocumentsNotSigned from './views/Documents/DocumentsNotSigned';
import DocumentViewer from './views/Documents/DocumentViewer';
import ScreenHeader from './Components/ScreenHeader/ScreenHeader';
import NotificationBell from './Components/notificationBell/notificationBell';
import ConfigComponent from './views/Config/ConfigComponent';
import HelpComponent from './views/Config/HelpComponent';
import ProfileComponent from './views/Config/ProfileComponent';
import NotificationsComponent from './views/Config/NotificationsComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Colors} from './assets/style/Colors';
import LogoHeader from './Components/LogoHeader/LogoHeader';

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
    setToken(tokenGet);
    TokenServices.token.attach(setToken);
    return () => {
      TokenServices.token.detach(setToken);
    };
  }, []);
  const navigationStacks = useMemo(() => {
    if (token != null || token != '') {
      switch (route) {
        case 'documents':
          return (
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
          );
          break;
        case 'config':
          return (
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
              <Stack.Screen
                options={{
                  title: (
                    <View>
                      <Text style={styles.subtitleText}>Configuración</Text>
                      <Text style={styles.titleText}>/Perfil</Text>
                    </View>
                  ),
                  headerRight: () => <NotificationBell />,
                }}
                name="Profile"
                component={ProfileComponent}
              />
              <Stack.Screen
                options={{
                  title: (
                    <View>
                      <Text style={styles.subtitleText}>Configuración</Text>
                      <Text style={styles.titleText}>/Notificaciones</Text>
                    </View>
                  ),
                  headerRight: () => <NotificationBell />,
                }}
                name="Notifications"
                component={NotificationsComponent}
              />
            </Stack.Navigator>
          );
          break;
        case 'licencias':
          return (
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
          );
          break;
        default:
          null;
          break;
      }
    }
  }, [route, token]);
  return (
    <>
      <NavigationContainer>
        {token == null || token == '' ? (
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerTintColor: Colors.text,
              headerStyle: {
                backgroundColor: '#fff',
              },
            }}>
            <Stack.Screen
              component={Login}
              options={({route}) => ({
                title: <LogoHeader />,
                headerTitleAlign: 'center',
              })}
              name="Login"
            />
            <Stack.Screen
              component={PasswordLogin}
              options={({route}) => ({
                title: <LogoHeader />,
                headerTitleAlign: 'center',
              })}
              name="Password"
            />
          </Stack.Navigator>
        ) : (
          navigationStacks
        )}
      </NavigationContainer>
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
