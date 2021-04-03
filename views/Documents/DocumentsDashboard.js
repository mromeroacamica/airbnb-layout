import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Text, Image} from 'react-native';
import ContainerScreen from '../../Components/Container/Container';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFileAlt, faFileSignature} from '@fortawesome/free-solid-svg-icons';

const DocumentsDashboard = ({navigation}) => {
  return (
    <>
      <ContainerScreen navigation={navigation}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <FontAwesomeIcon
              icon={faFileAlt}
              style={styles.iconStyle}
              size={38}
            />
            <Text style={styles.text}>Pendientes de firma</Text>
          </View>
          <View style={styles.card}></View>
        </View>
      </ContainerScreen>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: 35,
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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

export default DocumentsDashboard;
