import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground, Text, Image} from 'react-native';
import UserLogin from './UserLogin';
import PasswordLogin from './PasswordLogin';
import TenantService from '../../services/tenant/TenantService';
import SessionService from '../../services/session/SessionService';
import TokenServices from '../../services/token/TokenServices';

const Login = () => {
  const [imageLoad, setImageLoad] = useState(true);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [userEntered, setUserEntered] = useState(false);
  const [tenant, setTenant] = useState('');
  const [tenantId, setTenantId] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setImageLoad(false);
    }, 1500);
  }, []);
  const submitUser = async (user) => {
    console.log('este es el user', user);
    setUser(user);
    const res = await TenantService.getTenants(user);
    console.log('esto es res', res);
    if (res === false) {
      this.notifyService.showError('Error en la conexión', MessageTypes.ERROR);
      return;
    }
    if (res.length > 1) {
      //agregar las vistas para mas de un tenant
      return;
    } else if (res.length === 1) {
      setUserEntered(true);
      setTenant(res[0].tenantName);
      setTenantId(res[0].id);
      SessionService.setTenant(res[0].tenantName);
    } else {
      setUserEntered(true);
    }
  };
  const submitPassword = async (password) => {
    const res = await SessionService.logIn(user, password);
    const store = await TokenServices.setToken(res.data);
  };

  return (
    <>
      {/* <Container> */}
      {imageLoad ? (
        <ImageBackground
          source={require('../../assets/img/background.png')}
          style={styles.imageBackground}>
          <View>
            <Image
              source={require('../../assets/img/logo.png')}
              style={styles.image}
            />
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.login}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/img/logo.png')}
              style={styles.image2}
            />
          </View>
          {!userEntered ? (
            <UserLogin
              submitUser={submitUser}
              setUserEntered={setUserEntered}
            />
          ) : (
            <PasswordLogin
              setPassword={setPassword}
              submitPassword={submitPassword}
              user={user}
            />
          )}
        </View>
      )}
      {/* </Container> */}
    </>
  );
};
const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  imageBackground: {
    resizeMode: 'cover',
    justifyContent: 'center',
    flex: 1,
    padding: '10%',
  },
  imageContainer: {
    flexDirection: 'column',
    // backgroundColor: 'red',
    alignItems: 'center',
    marginBottom: 30,
  },

  image: {
    width: 300,
    height: 80,
  },
  image2: {
    width: 120,
    height: 30,
  },
});

export default Login;
