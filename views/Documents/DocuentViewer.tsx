import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import ProcedureServices from '../../services/procedure/ProcedureServices'

export interface Props{
  navigation:any,
  route:any
  setDocuments:any
}

const DocumentViewer: React.FC<Props> = ({route, navigation}) => {
  const {itemId, otherParam} = route.params;
  const [uri, setUri] = useState('')
  const signHandler = (conformity:boolean) => {
    console.log(conformity);
    navigation.navigate('PinConfirmation', {
      itemId: itemId,
      documentType: otherParam,
      conformity: conformity ? 'Conforme' : 'Disconforme',
    });
  };
  useEffect(()=>{
    let isMounted = true
    async function initEnvelopes(){
      const res = await ProcedureServices.getImageUrl(itemId,true)
      if(isMounted){
        setUri(res)
      }
    }
    initEnvelopes()
    return () => {
      isMounted = false;
    };
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.documentViewerContainer}>
        {uri===''?null:
        <Image style={styles.documentImage} source={{uri}}/>
        }
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonDisconformity}
          onPress={() => {
            signHandler(false);
          }}>
          <Text style={styles.textDisconformity}>Firma</Text>
          <Text style={styles.textDisconformity}>Disconforme</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonConformity}
          onPress={() => {
            signHandler(true);
          }}>
          <Text style={styles.textConformity}>Firma</Text>
          <Text style={styles.textConformity}>Conforme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  documentImage:{
    flex:1
  },
  buttonContainer: {
    flexDirection: 'row',
    // flex: 1,
  },
  documentViewerContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
  },
  container: {flexGrow: 1},
  buttonDisconformity: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#ece8f8',
    height: 70,
    padding: 10,
  },
  buttonConformity: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    height: 70,
    padding: 10,
  },
  textDisconformity: {
    color: '#3f51b5',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    margin: 0,
  },
  textConformity: {
    color: '#fff',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    margin: 0,
  },
});

export default DocumentViewer;
