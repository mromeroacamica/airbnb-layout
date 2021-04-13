import { Colors } from '../../assets/style/Colors';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import AccountServices from '../../services/account/AccountServices';
import PinInput from '../../Components/PinInput/PinInput'

export interface Props{
  navigation:any
}

const SetPin : React.FC<Props> = ({navigation}) => {
    
    const submitPin=async ()=>{
       console.log('hola')
    }
    const showAlert = () => {
        Alert.alert('Envio correo electrónico', 'Se ha enviado el correo electrónico correctamente.', [
          
          {text: 'Confirmar', onPress: () => navigation.navigate('Password')},
        ]);
      };
  
  return (
    <>
    <View style={styles.login}>
        <Text style={styles.titleText}>Configura tu PIN</Text>
        <Text style={styles.textDetail}>Solo números</Text>
        <View style={styles.inputContainer}>
            <PinInput/>
        </View>
        <View>
            <TouchableOpacity
            onPress={() => submitPin()}
            style={styles.botonSubmit}>
            <Text style={styles.textoBotonSubmit}>ENVIAR</Text>
            </TouchableOpacity>
        </View>
    </View>
    </>
  );
};
const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  titleText:{
    fontSize:22,
    color:Colors.text,
    fontWeight:'bold',
    textAlign:'center',
    marginTop:15,
    marginBottom:10
},
  textDetail:{
      fontSize:12,
      textAlign:'center',
      color: Colors.text,
      marginBottom:40
  },
  inputContainer: {
    flexDirection: 'column',
    // backgroundColor: 'blue',
    flex: 1,
    alignItems: 'flex-start',
  },
  
  label: {
    fontSize: 15,
    marginTop: 0,
    marginLeft: 15,
    backgroundColor: 'white',
    padding: 10,
    zIndex: 3,
  },
  
  botonSubmit: {
    padding: 10,
    height: 45,
    backgroundColor: Colors.primary,
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  textoBotonSubmit: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  
});

export default SetPin;
