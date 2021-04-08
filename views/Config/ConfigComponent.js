import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ContainerScreen from '../../Components/Container/Container';
import CardList from '../../Components/CardList/CardList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import TokenServices from '../../services/token/TokenServices';

const ConfigComponent = ({navigation, setDocuments}) => {
  const logOut = () => {
    const res = TokenServices.setToken(null);
    //cambiar route de useContext
  };
  return (
    <>
      <ContainerScreen navigation={navigation} setDocuments={setDocuments}>
        <TouchableOpacity onPress={() => logOut()}>
          <CardList>
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
      </ContainerScreen>
    </>
  );
};
const styles = StyleSheet.create({
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
});

export default ConfigComponent;
