import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableHighlight,
} from 'react-native';
import RouteContext from '../../context/RouteContext';

const ContainerScreen = (props) => {
  const {route, setRoute} = useContext(RouteContext);
  console.log(props);
  console.log('esto es route', route);
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
          onPress={() => setRoute(true)}
          style={styles.botonSubmit}>
          <Text style={styles.textoBotonSubmit}>Documentos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setRoute(false)}
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
