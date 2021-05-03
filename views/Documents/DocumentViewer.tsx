import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView, Share,Alert} from 'react-native';
import ProcedureServices from '../../services/procedure/ProcedureServices'
import PhotoView from 'react-native-photo-view-ex'; 

export interface Props{
  navigation:any,
  route:any
  setDocuments:any
}

const DocumentViewer: React.FC<Props> = ({route, navigation}) => {
  const {itemId, otherParam,processDefinitionIdentificator,signed} = route.params;
  const [uri, setUri] = useState('');
  const [hasDisconformity, setHasDisconformity] = useState(false);
  const signHandler = (conformity:boolean) => {
    if(conformity){
      navigation.navigate('PinConfirmation', {
        itemId: itemId,
        documentType: otherParam,
        conformity: conformity?'true':'false',
      });
    }else{
      navigation.navigate('DisconformitySign', {
        itemId: itemId,
        documentType: otherParam,
        conformity: conformity?'true':'false',
        processDefinitionIdentificator:processDefinitionIdentificator
      });
    }
  };
  const onShare = async (content:any,options:any)=>{
    try {
      const result = await Share.share({
        message:
          'Descargar documento',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  }
  useEffect(()=>{
    let isMounted = true
    async function initEnvelopes(){
      const res = await ProcedureServices.getImageUrl(itemId,true)
      let respDisconformityValues
      if(!signed){
        respDisconformityValues = await ProcedureServices.getPropertyOfProcessDefinition(processDefinitionIdentificator)
      }
      if(isMounted){
        if(!signed && respDisconformityValues.data.data[0]){
         setHasDisconformity(true)   
        }
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
          <PhotoView
              style={{ flex: 1, width: '100%', height: '100%' }}
              source={{ uri: uri }} // you can supply any URL as well
              minimumZoomScale={1} // max value can be 1
              maximumZoomScale={5} // max value can be 3
          />
        }
      </View>
      <View style={styles.buttonContainer}>
      {hasDisconformity?
        <TouchableOpacity
          style={styles.buttonDisconformity}
          onPress={() => {
            signHandler(false);
          }}>
          <Text style={styles.textDisconformity}>Firma</Text>
          <Text style={styles.textDisconformity}>Disconforme</Text>
        </TouchableOpacity>
           :null 
          }
          {!signed ?
        <TouchableOpacity
          style={styles.buttonConformity}
          onPress={() => {
            signHandler(true);
          }}>
          <Text style={styles.textConformity}>Firma</Text>
          <Text style={styles.textConformity}>Conforme</Text>
        </TouchableOpacity>
        :null}
        {signed ?
        <TouchableOpacity
          style={styles.buttonDownload}
          onPress={() => {
            onShare('hola','chau');
          }}>
          <Text style={styles.textConformity}>DESCARGAR</Text>
        </TouchableOpacity>
        :null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
  documentViewerContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
    alignItems:'center'
  },
  container: {flexGrow:1},
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
  buttonDownload: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#3f51b5',
    height: 50,
    padding: 10,
  },
  
});

export default DocumentViewer;
