import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground, Text, Image} from 'react-native';
import UserLogin from './UserLogin';
import PasswordLogin from './PasswordLogin';
import Container from '../../Components/Container/Container';

const Login = ({setToken}) => {
  const imageBackground = {
    uri: 'https://sbox-dev.boxcustodia.com/api/background?tenant=localhost',
  };
  const [imageLoad, setImageLoad] = useState(true);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [userEntered, setUserEntered] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setImageLoad(false);
    }, 2500);
  }, []);
  const submitPassword = () => {
    console.log('esto es el log in', password);
    setToken('hola');
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
            <UserLogin setUser={setUser} setUserEntered={setUserEntered} />
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