import React, { RefObject, useRef, useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Platform,
    TextInputKeyPressEventData,
  } from 'react-native';

export interface PinInputProps {
    
}
 
const PinInput: React.FC<PinInputProps> = () => {
    const [first, setFirst]= useState('')
    const [second, setSecond]= useState('')
    const [third, setThrid]= useState('')
    const [fourth, setFourth]= useState('')

    const firstInput = useRef<TextInput>(null)
    const secondInput = useRef<TextInput>(null)
    const thirdInput = useRef<TextInput>(null)
    const fourthInput = useRef<TextInput>(null)

    const changeHandler =(text:string,nextInput:RefObject<TextInput>, prevInput:RefObject<TextInput>)=>{
        if(text===''){
            console.log('hola')
            // prevInput.current?.focus()
        }else{
            nextInput.current?.focus()
        }
    }


    return ( 
    <View style={styles.inputWrapper}>
        <TextInput
        ref={firstInput}
        style={styles.input}
        keyboardType={'number-pad'}
        onChangeText={(text) => {
            const cleanNumber = text.replace(/[^0-9]/g, "");
            setFirst(cleanNumber) 
            changeHandler(cleanNumber,secondInput,firstInput)
        }}
        
        value={first}
        maxLength={1}
        />
        <TextInput
        ref={secondInput}
          style={styles.input}
          keyboardType={'number-pad'}
          onChangeText={(text) => {
            const cleanNumber = text.replace(/[^0-9]/g, "");
            setSecond(cleanNumber);  changeHandler(cleanNumber,thirdInput,firstInput)
        }}
        value={second}
        maxLength={1}
        onKeyPress={({nativeEvent})=>{
            console.log('esto es el evento',nativeEvent)
            if(nativeEvent.key == 'Backspace'){
                console.log('second',second)
                if(second == ''){
                    setFirst('')
                    firstInput.current?.focus()      
                }
            }
        }}
        />
        <TextInput
        ref={thirdInput}
          style={styles.input}
          keyboardType={'number-pad'}
          onChangeText={(text) => {
            const cleanNumber = text.replace(/[^0-9]/g, "");
            setThrid(cleanNumber) ; changeHandler(cleanNumber,fourthInput,secondInput)
        }}
        value={third}
        maxLength={1}
        onKeyPress={({nativeEvent})=>{
            if(nativeEvent.key == 'Backspace'){
                if(third==''){
                    setSecond('')
                    secondInput.current?.focus()      
                }
            }
        }}
        />
        <TextInput
        ref={fourthInput}
          style={styles.input}
          keyboardType={'number-pad'}
          onChangeText={(text) => {
              console.log(fourthInput);
            const cleanNumber = text.replace(/[^0-9]/g, "");
            setFourth(cleanNumber) ; changeHandler(cleanNumber,fourthInput,thirdInput)
        }}
        value={fourth}
        maxLength={1}
        onKeyPress={({nativeEvent})=>{
            if(nativeEvent.key == 'Backspace'){
                    console.log('esto es fourth',fourth)
                    if(fourth == ''){
                        setThrid('')
                        thirdInput.current?.focus()      
                    }
            }
        }}
        />
    </View>
     );
}

const styles = StyleSheet.create({
    input:{
        marginRight: 10,
        height: Platform.OS === 'ios' ? 65 : 55,
        width: '20%',
        borderColor: '#e1e1e1',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 8,
        marginBottom: 10,
    },
    inputWrapper:{
        flexDirection:'row',
        justifyContent:'center',
        width:'100%'
    },

})
 
export default PinInput;
