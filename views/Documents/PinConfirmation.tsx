import { Colors } from '../../assets/style/Colors';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';
import PinInput from '../../Components/PinInput/PinInput'
import SignServices from '../../services/sign/sign.services'

export interface Props{
  navigation:any,
  route:any
}

const PinConfirmation : React.FC<Props> = ({route,navigation}) => {
    const [showPin, setShowPin] = useState(false)
    const [pinPassword, setPinPassword] = useState('')
    const submitPin=async ()=>{
      const certificate=await SignServices.getCertificate()
      console.log(certificate)
      const certificatePem = await SignServices.getCertPem(pinPassword, certificate);
    }

  
  return (
    <>
    <View style={styles.login}>
        <Text style={styles.titleText}>Ingresa tu PIN de 4 digitos</Text>
        <View style={styles.inputContainer}>
            <PinInput visiblePassword={showPin} setPinPassword={setPinPassword}/>
            <View style={styles.buttonShowContainer}>
              <TouchableOpacity onPress={()=>setShowPin(!showPin)}>
                <Text style={styles.textShow}>Firmar</Text>
              </TouchableOpacity>
            </View>
        </View>
        <View>
            <TouchableOpacity
            disabled={pinPassword == ''}
            onPress={() => submitPin()}
            style={[styles.buttonSubmit,pinPassword==''?styles.buttonDisabled:null]}>
            <Text style={styles.textoButtonSubmit}>ENVIAR</Text>
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
    flex: 1,
    alignItems: 'flex-start',
  },
  buttonShowContainer:{
    width:'100%',
    alignItems:'center',
  },
  textShow:{
    color:Colors.primary,
    textAlign:'center'
  },
  
  label: {
    fontSize: 15,
    marginTop: 0,
    marginLeft: 15,
    backgroundColor: 'white',
    padding: 10,
    zIndex: 3,
  },
  
  buttonSubmit: {
    padding: 10,
    height: 45,
    backgroundColor: Colors.primary,
    marginTop: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonDisabled:{
    backgroundColor:'#7b85cc'
  },
  textoButtonSubmit: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  
});

export default PinConfirmation;
