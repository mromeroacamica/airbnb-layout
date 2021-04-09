import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';

const CardList = (props) => {
  return <View style={[styles.card, props.propStyles]}>{props.children}</View>;
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 60,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
});

export default CardList;
