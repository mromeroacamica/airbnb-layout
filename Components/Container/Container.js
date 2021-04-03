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
  const navigateTo = (route) => {
    console.log(route);
    props.navigation.navigate(route);
  };
  return (
    <>
      <View style={styles.container}>{props.children}</View>
      <View style={styles.footerContainer}>
        <TouchableHighlight
          onPress={() => navigateTo('Inicio')}
          style={styles.botonSubmit}>
          <Text style={styles.textoBotonSubmit}>Siguiente</Text>
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
});

export default ContainerScreen;
