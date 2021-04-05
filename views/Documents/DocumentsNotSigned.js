import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';
import ContainerScreen from '../../Components/Container/Container';
import CardList from '../../Components/CardList/CardList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFileAlt, faFileSignature} from '@fortawesome/free-solid-svg-icons';

const DocumentsNotSigned = ({navigation, setDocuments}) => {
  const [prueba, setPrueba] = useState(false);
  return (
    <>
      <ContainerScreen navigation={navigation} setDocuments={setDocuments}>
        <View style={styles.cardContainer}>
          <TouchableHighlight onPress={() => setPrueba(true)}>
            <CardList>
              <View style={styles.iconTextContainer}>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  style={styles.iconStyle}
                  size={38}
                />
                <Text style={styles.text}>Junio 2020</Text>
              </View>
              <View style={styles.count}>
                <Text style={styles.countText}></Text>
              </View>
            </CardList>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => setPrueba(true)}>
            <CardList>
              <View style={styles.iconTextContainer}>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  style={styles.iconStyle}
                  size={38}
                />
                <Text style={styles.text}>Junio 2020</Text>
              </View>
              <View style={styles.count}>
                <Text style={styles.countText}></Text>
              </View>
            </CardList>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => setPrueba(true)}>
            <CardList>
              <View style={styles.iconTextContainer}>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  style={styles.iconStyle}
                  size={38}
                />
                <Text style={styles.text}>Junio 2020</Text>
              </View>
              <View style={styles.count}>
                <Text style={styles.countText}></Text>
              </View>
            </CardList>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => setPrueba(true)}>
            <CardList>
              <View style={styles.iconTextContainer}>
                <FontAwesomeIcon
                  icon={faFileAlt}
                  style={styles.iconStyle}
                  size={38}
                />
                <Text style={styles.text}>Junio 2020</Text>
              </View>
              <View style={styles.count}>
                <Text style={styles.countText}></Text>
              </View>
            </CardList>
          </TouchableHighlight>
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
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    color: '#3f51b5',
    marginRight: 10,
  },
  iconStyle2: {
    color: '#3f51b5',
    marginRight: 10,
    marginLeft: 5,
  },
  text: {
    fontSize: 20,
    color: 'grey',
  },
  count: {
    width: 5,
    height: 5,
    backgroundColor: '#f0ae42',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: 'white',
  },
});

export default DocumentsNotSigned;
