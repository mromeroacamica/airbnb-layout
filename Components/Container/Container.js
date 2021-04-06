import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TouchableHighlight,
} from 'react-native';
import RouteContext from '../../context/RouteContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faFileAlt,
  faPlaneDeparture,
  faFileInvoiceDollar,
  faComments,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

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
          <View style={styles.iconTextContainer}>
            <FontAwesomeIcon
              icon={faFileAlt}
              style={styles.iconStyle2}
              size={22}
            />
            <Text style={styles.text}>Documentos</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setRoute(false)}
          style={styles.botonSubmit}>
          <View style={styles.iconTextContainer}>
            <FontAwesomeIcon
              icon={faPlaneDeparture}
              style={styles.iconStyle2}
              size={22}
            />
            <Text style={styles.text}>Licencias</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setRoute(true)}
          style={styles.botonSubmit}>
          <View style={styles.iconTextContainer}>
            <FontAwesomeIcon
              icon={faFileInvoiceDollar}
              style={styles.iconStyle2}
              size={22}
            />
            <Text style={styles.text}>Gastos y Viáticos</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setRoute(true)}
          style={styles.botonSubmit}>
          <View style={styles.iconTextContainer}>
            <FontAwesomeIcon
              icon={faComments}
              style={styles.iconStyle2}
              size={22}
            />
            <Text style={styles.text}>Consultas</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => setRoute(true)}
          style={styles.botonSubmit}>
          <View style={styles.iconTextContainer}>
            <FontAwesomeIcon icon={faCog} style={styles.iconStyle2} size={22} />
            <Text style={styles.text}>Configuración</Text>
          </View>
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
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle2: {
    color: '#3f51b5',
  },
  text: {
    color: '#3f51b5',
    fontSize: 10,
  },
});

export default ContainerScreen;
