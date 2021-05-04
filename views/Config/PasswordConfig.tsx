import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faExclamationCircle, faEye
} from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../../assets/style/Colors';


export interface Props{
  navigation:any,
  setDocuments:Function
}

const PasswordConfig: React.FC<Props> = ({navigation, setDocuments}) => {
    const [visiblePassword, setVisiblePassword] = useState(false) ;
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const navigateTo = (screen:string) => {
        navigation.navigate(screen);
      };
    const updatePassword = (oldPW:string, newPW:string, confirmPW:string )=>{
        const validatePassword = passwordValidation(newPW,confirmPW)
        if(validatePassword){
            console.log('la password esta bien')
        }else{
            Alert.alert('Contraseña incorrecta', 'La contraseña debe contener entre 9 y 16 caracteres. Debe contar por lo menos con una letra mayúscula, una letra minúscula, un carácter especial y un número.', [
                {text: 'Confirmar', onPress: () => console.log('Close')},
              ]);
        }
    }
    const passwordValidation = (newPW:string, confirmPW:string)=>{
        const regexUpperCase = (/.*[A-Z].*/) 
        const regexLowerCase =(/.*[a-z].*/) 
        const regexNumber =(/.*[0-9].*/)
        const regexSpecialCharacter =(/(?=.*[!@#$%^&*])/)
        if(newPW !== confirmPW){
            return false
        }
        if(newPW.length < 6 || newPW.length>16){
            return false
        }
        if(!regexLowerCase.test(newPW) || !regexUpperCase.test(newPW ) || !regexNumber.test(newPW) || !regexSpecialCharacter.test(newPW) ){
            return false
        }
        return true
    }
  return (
    <>
    <View style={{backgroundColor:Colors.background, flex:1}}>
        <View style={styles.card}>
            <ScrollView style={{flex:1}}>
                <View style={{alignItems:'center', marginTop:10}}>
                    <Text style={styles.title}>Modificar contraseña</Text>
                    <View style={styles.warningWrapper}>
                        <View>
                            <FontAwesomeIcon
                                icon={faExclamationCircle}
                                style={styles.iconStyle}
                                size={18}
                            />
                        </View>
                        <Text>La contraseña debe contener entre 6 y 15 caracteres, al menos una letra mayúscula, una minúscula y un número.</Text>
                    </View>
                    <View style={{marginTop:30}}>
                        <Text style={styles.label}>Contraseña</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                secureTextEntry={!visiblePassword}
                                style={styles.passwordInput}
                                placeholder={'**************'}
                                onChangeText={(text) => {
                                    const cleanText = text.trim();
                                    setOldPassword(cleanText) 
                                }}
                                
                                value={oldPassword}
                            />
                            <TouchableOpacity onPress={()=>setVisiblePassword(!visiblePassword)}>
                                <FontAwesomeIcon
                                    icon={faEye}
                                    style={styles.iconEye}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop:10}}>
                        <Text style={styles.label}>Contraseña nueva</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                secureTextEntry={!visiblePassword}
                                style={styles.passwordInput}
                                placeholder={'**************'}
                                onChangeText={(text) => {
                                    const cleanText = text.trim();
                                    setNewPassword(cleanText) 
                                }}
                                
                                value={newPassword}
                            />
                            <TouchableOpacity onPress={()=>setVisiblePassword(!visiblePassword)}>
                                <FontAwesomeIcon
                                    icon={faEye}
                                    style={styles.iconEye}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{marginTop:10,}}>
                        <Text style={styles.label}>Confirmar contraseña</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                secureTextEntry={!visiblePassword}
                                style={styles.passwordInput}
                                placeholder={'**************'}
                                onChangeText={(text) => {
                                    const cleanText = text.trim();
                                    setConfirmPassword(cleanText) 
                                }}
                                
                                value={confirmPassword}
                            />
                            <TouchableOpacity onPress={()=>setVisiblePassword(!visiblePassword)}>
                                <FontAwesomeIcon
                                    icon={faEye}
                                    style={styles.iconEye}
                                    size={18}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {oldPassword !=='' && newPassword !=='' && confirmPassword !== ''?
            (<View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:10}}>
                <View style={styles.cancelButton}>
                    <TouchableOpacity onPress={()=>navigateTo('Credentials')}>
                            <Text>CANCELAR</Text>
                    </TouchableOpacity>
                </View>
            <View style={styles.acceptButton}>
                <TouchableOpacity onPress={()=>updatePassword(oldPassword,newPassword,confirmPassword)}>
                        <Text>ACEPTAR</Text>
                </TouchableOpacity>
            </View>
            </View>)
            :null}
        </View>
    </View>
    </>
  );
};
const styles = StyleSheet.create({
card:{
    paddingHorizontal:10, 
    paddingBottom:15, 
    flex:1, 
    backgroundColor:'white', 
    marginHorizontal:10, 
    marginTop:40,
    marginBottom:15,
    alignItems:'center',
    borderRadius:15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
},
title:{
    fontSize:20,
    color:Colors.primary,
    marginBottom:15
},
warningWrapper:{
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20
},
iconStyle: {
    color: 'red',
    marginRight:10
},
iconEye: {
    color: 'grey',
    marginRight:10
},
inputWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingBottom:0,
    borderBottomColor:'grey',
    borderBottomWidth:1,
},
label:{
    color:'grey'
},
passwordInput:{
    width:'80%',
    height:40
},
cancelButton:{
    alignItems:'center',
    justifyContent:'center',
    height:30,
    width:'50%'
},
acceptButton:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:Colors.primary,
    height:30,
    width:'50%',
    borderRadius:5
}

});

export default PasswordConfig;
