import { Colors } from '../../assets/style/Colors';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import SessionService from '../../services/session/SessionService';
import ProcedureServices from '../../services/procedure/ProcedureServices'


export interface Props{
  navigation:any,
  route:any
}

const DisconformitySign : React.FC<Props> = ({route,navigation}) => {
  const {itemId,conformity,processDefinitionIdentificator}=route.params
    // const [showSpinner, setShowSpinner] = useState(false);
    const [reason, setReason] = useState('');
    const [reasonDescription, setReasonDescription] = useState('');
    const [propertyIdDisconformity, setPropertyIdDisconformity] = useState('');
    const [disconformityValues, setDisconformityValues] = useState([]);
    const [allowDescription, setAllowDescription] = useState(false);
    useEffect(()=>{
        let isMounted = true;
      async function initDisconformitySign() {
        const user = await SessionService.getTokenInformation()
        if(user.data.account.accountState !== "ACTIVO"){
            Alert.alert('Cuenta Inactiva', 'Tu cuenta se encuentra inactiva.', [
            
                {text: 'Confirmar', onPress: () => navigation.navigate('Documentos')},
              ]);
        }
        const respDisconformityValues = await ProcedureServices.getPropertyOfProcessDefinition(processDefinitionIdentificator)
        setDisconformityValues(respDisconformityValues.data.included)
        setPropertyIdDisconformity(respDisconformityValues.data.data[0].id)
        setAllowDescription(respDisconformityValues.data.data[0].attributes.allowsDescription)
        console.log(respDisconformityValues.data.data[0].attributes.allowsDescription)

      }
      initDisconformitySign();
      return () => {
        isMounted = false;
      }; 
    },[])
    

  
  return (
    <>
        <Text>Selecciona un motivo</Text>
        <TextInput 
                value={reason}
                maxLength={140}
                onChangeText={(text)=>{
                    setReason(text)
                }}
        />
        {allowDescription?
        <View>
            <Text>Ingresar una descripción</Text>
            <TextInput
                    onChangeText={(text)=>{
                        setReasonDescription(text)
                    }} 
                    value={reason}
                    maxLength={140}
                    style={styles.inputDescription}
            />
        </View>
        :
        null}
    </>
  );
};
const styles = StyleSheet.create({
    inputDescription:{
        width:'100%',
        height:150,
        backgroundColor:Colors.background,
        borderWidth:1,
        borderColor:'black'
    }
});

export default DisconformitySign;
