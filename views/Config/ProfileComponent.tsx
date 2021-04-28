import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import ContainerScreen from '../../Components/Container/Container';
import RoundImage from '../../Components/RoundImage/RoundImage';
import TokenServices from '../../services/token/TokenServices';
import AccountServices from '../../services/account/AccountServices';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../../assets/style/Colors';


export interface Props{
  navigation:any,
  setDocuments:Function
}

const ProfileComponent: React.FC<Props> = ({navigation, setDocuments}) => {
  const [token, setToken]:any = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [initials, setInitials] = useState('');
  useEffect(() => {
    const token = TokenServices.getToken();
    setToken(token);
    setInitials(
      token.account.lastName.slice(0, 1) + token.account.firstName.slice(0, 1),
    );
    setPhotoUrl(AccountServices.getAccountPhotoURL(token.account.id,64));
  }, []);
  return (
    <>
      <ContainerScreen navigation={navigation} setDocuments={setDocuments}>
        <View style={styles.profileContainer}>
          <ScrollView style={styles.scrollProfile}>
            <View style={styles.pictureNameIconContainer}>
              <View style={styles.iconTextContainer}>
                  <RoundImage imageUrl={photoUrl} initials={initials} imageSize={64} />
                  {token !== '' && (
                    <Text style={styles.text}>
                      {token.account.firstName} {token.account.lastName}
                    </Text>
                  )}
              </View>
              <View>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={styles.iconStyle}
                    size={30}
                  />
              </View>
            </View>
            <Text style={styles.personalDataText}>DATOS PERSONALES</Text>
          </ScrollView>
        </View>
      </ContainerScreen>
    </>
  );
};
const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop:30,
    paddingHorizontal:15,
    paddingBottom:8,
  },
  scrollProfile:{
    backgroundColor:'white',
    width:'100%',
    borderRadius: 5,
    padding:10
  },
  pictureNameIconContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  titleText: {
    fontSize: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
  },
  bodyText: {
    alignItems: 'center',
    padding: 10,
    textAlign: 'center',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'grey',
  },
  iconStyle: {
    color: '#3f51b5',
    marginRight: 10,
  },
  personalDataText:{
    marginTop:10,
    color:Colors.primary,
    fontSize:18,
    fontWeight:'bold'
  },
});

export default ProfileComponent;
