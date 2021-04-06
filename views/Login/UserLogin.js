import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import TenantService from '../../services/tenant/TenantService';

const UserLogin = ({setUserEntered, submitUser}) => {
  const [user, saveUser] = useState('');
  const [wrongUser, setWrongUser] = useState(false);
  const regex = /\w(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const validateUser = async () => {
    const isValid = regex.test(user);
    console.log(user);
    console.log(isValid);
    if (isValid) {
      const res = await TenantService.getTenants(user);
      console.log('esto es el res de tenant', res);
      submitUser(user);
      // setUserEntered(true);
    } else {
      setWrongUser(true);
    }
  };
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Iniciar sesión</Text>
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            saveUser(text);
          }}
        />
      </View>
      {wrongUser ? (
        <View>
          <Text>Ingresar el correo electrónico correctamente.</Text>
        </View>
      ) : null}
      <View>
        <TouchableHighlight
          onPress={() => validateUser()}
          style={styles.botonSubmit}>
          <Text style={styles.textoBotonSubmit}>Siguiente</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    // backgroundColor: 'blue',
    flex: 1,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 15,
    marginTop: 15,
  },
  input: {
    marginTop: 10,
    height: Platform.OS === 'ios' ? 50 : 35,
    width: '100%',
    borderColor: '#e1e1e1',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  botonSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoBotonSubmit: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
});

export default UserLogin;
