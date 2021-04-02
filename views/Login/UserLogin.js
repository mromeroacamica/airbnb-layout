import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';

const UserLogin = ({setUserEntered, setUser}) => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Iniciar sesión</Text>
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setUser(text);
          }}
        />
      </View>
      <View>
        <TouchableHighlight
          onPress={() => setUserEntered(true)}
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
