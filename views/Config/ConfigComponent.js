import React, {useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import ContainerScreen from '../../Components/Container/Container';
import CardList from '../../Components/CardList/CardList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSignOutAlt,
  faInfoCircle,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import ImageRound from '../../Components/ImageRound/ImageRound';
import TokenServices from '../../services/token/TokenServices';
import RouteContext from '../../context/RouteContext';

const ConfigComponent = ({navigation, setDocuments}) => {
  const {route, setRoute} = useContext(RouteContext);
  const token = TokenServices.getToken();
  console.log(token);

  const showAlert = () => {
    Alert.alert('Cerrar sesión', 'Estas por cerrar sesión de la aplicación', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Confirmar', onPress: () => logOut()},
    ]);
  };

  const logOut = () => {
    const res = TokenServices.setToken(null);
    //cambiar route de useContext
    setRoute('documents');
  };
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };
  return (
    <>
      <ContainerScreen navigation={navigation} setDocuments={setDocuments}>
        <View style={styles.namePhotoWrapper}>
          <TouchableOpacity onPress={() => navigateTo('Profile')}>
            <CardList propStyles={styles.card2}>
              <View style={styles.iconTextContainer}>
                <ImageRound />
                <Text style={styles.text}>
                  {token.account.firstName} {token.account.lastName}
                </Text>
              </View>
              <View>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={styles.iconStyle}
                  size={20}
                />
              </View>
            </CardList>
          </TouchableOpacity>
        </View>
        <View style={styles.secondSection}>
          <Text>Primeros botones</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => showAlert()}>
            <CardList propStyles={styles.card}>
              <View style={styles.iconTextContainer}>
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={styles.iconStyle}
                  size={38}
                />
                <Text style={styles.text}>Cerrar sesión</Text>
              </View>
            </CardList>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateTo('Help')}>
            <CardList propStyles={styles.card2}>
              <View style={styles.iconTextContainer}>
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  style={styles.iconStyle}
                  size={38}
                />
                <Text style={styles.text}>Ayuda</Text>
              </View>
            </CardList>
          </TouchableOpacity>
        </View>
      </ContainerScreen>
    </>
  );
};
const styles = StyleSheet.create({
  namePhotoWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  secondSection: {
    flex: 1,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    color: '#3f51b5',
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    color: 'grey',
  },
  card: {
    marginBottom: 0,
  },
  card2: {
    marginBottom: 30,
  },
});

export default ConfigComponent;
