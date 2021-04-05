import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableHighlight,
} from 'react-native';

const ContainerScreen = (props) => {
  console.log(props);
  const setDocuments = props.setDocuments;
  const navigateTo = (route) => {
    console.log(route);
    props.navigation.navigate(route);
  };
  return (
    <>
      <View style={styles.container}>{props.children}</View>
      <View style={styles.footerContainer}>
        <TouchableHighlight
          onPress={() => setDocuments(true)}
          style={styles.botonSubmit}>
          <Text style={styles.textoBotonSubmit}>Documentos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setDocuments(false)}
          style={styles.botonSubmit}>
          <Text style={styles.textoBotonSubmit}>Inicio</Text>
        </TouchableHighlight>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    backgroundColor: '#ece8f8',
  },
  footerContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'red',
  },
  textoBotonSubmit: {
    marginRight: 25,
    color: 'white',
  },
});

export default ContainerScreen;
