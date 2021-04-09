import React from 'react';
import {StyleSheet, View, Image, Text, ScrollView} from 'react-native';
import TokenServices from '../../services/token/TokenServices';

const ImageRound = () => {
  const token = TokenServices.getToken();
  const initials =
    token.account.firstName.slice(0, 1) + token.account.lastName.slice(0, 1);
  return <View style={styles.roundImageContainer}></View>;
};
const styles = StyleSheet.create({
  roundImageContainer: {
    backgroundColor: 'white',
    height: '38',
    width: '38',
    borderRadius: 100,
  },
});

export default ImageRound;
