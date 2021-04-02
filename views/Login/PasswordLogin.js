import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

const PasswordLogin = ({setPassword, submitPassword}) => {
  const [visiblePassword, setVisiblePasssword] = useState(false);
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Ingresa tu contraseña</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            secureTextEntry={!visiblePassword}
            style={styles.input}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <TouchableHighlight
            onPress={() => setVisiblePasssword(!visiblePassword)}
            style={styles.tooglePassword}>
            <Text style={styles.tooglePasswordText}>e</Text>
          </TouchableHighlight>
        </View>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => submitPassword()}
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
    marginTop: 15,
    height: Platform.OS === 'ios' ? 50 : 35,
    width: '70%',
    borderColor: '#e1e1e1',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  passwordInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tooglePassword: {
    backgroundColor: 'grey',
    width: '10%',
    marginTop: 15,
    height: Platform.OS === 'ios' ? 50 : 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooglePasswordText: {
    color: 'black',
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

export default PasswordLogin;
