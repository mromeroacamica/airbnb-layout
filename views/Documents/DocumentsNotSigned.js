import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ContainerScreen from '../../Components/Container/Container';
import CardList from '../../Components/CardList/CardList';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faFileAlt, faFileSignature} from '@fortawesome/free-solid-svg-icons';

const DocumentsNotSigned = ({navigation, setDocuments}) => {
  const recibosMeses = [
    {mes: 'Junio 2020'},
    {mes: 'Julio 2020'},
    {mes: 'Agosto 2020'},
    {mes: 'Septiembre 2020'},
    {mes: 'Octubre 2020'},
    {mes: 'Noviembre 2020'},
    {mes: 'Diciembre 2020'},
    {mes: 'Enero 2021'},
    {mes: 'Febrero 2021'},
    {mes: 'Marzo 2021'},
    {mes: 'Abril 2021'},
    {mes: 'Mayo 2021'},
    {mes: 'Junio 2021'},
    {mes: 'Julio 2021'},
    {mes: 'Agosto 2021'},
    {mes: 'Septiembre 2021'},
    {mes: 'Octubre 2021'},
    {mes: 'Noviembre 2021'},
    {mes: 'Diciembre 2021'},
  ];
  const [prueba, setPrueba] = useState(false);

  const viewDocument = (documentId) => {
    navigation.navigate('DocumentViewer');
  };
  return (
    <>
      <ContainerScreen navigation={navigation} setDocuments={setDocuments}>
        <View style={styles.cardContainer}>
          <ScrollView>
            {recibosMeses.map((value, index) => {
              return (
                <TouchableOpacity
                  onPress={() => viewDocument(index)}
                  key={index}>
                  <CardList>
                    <View style={styles.iconTextContainer}>
                      <FontAwesomeIcon
                        icon={faFileAlt}
                        style={styles.iconStyle}
                        size={38}
                      />
                      <Text style={styles.text}>{value.mes}</Text>
                    </View>
                    <View style={styles.count}>
                      <Text style={styles.countText}></Text>
                    </View>
                  </CardList>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
    width: 8,
    height: 8,
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
