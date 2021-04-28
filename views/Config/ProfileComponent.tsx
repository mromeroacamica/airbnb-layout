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
import { Utils } from '../../Shared/Utils';


export interface Props{
  navigation:any,
  setDocuments:Function
}

const ProfileComponent: React.FC<Props> = ({navigation, setDocuments}) => {
  // Constantes
  const SIN_DEFINIR = 'Sin definir';
  const [initLoaded, setInitLoaded] = useState(false);
  const [token, setToken]:any = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [initials, setInitials] = useState('');
  const [genders, setGenders]=useState([]);

  useEffect(() => {
    let isMounted = true;
    async function initEnvelopes() {
      const token = TokenServices.getToken();
    console.log(token)
    setToken(token);
    setInitials(
      token.account.lastName.slice(0, 1) + token.account.firstName.slice(0, 1),
    );
    setPhotoUrl(AccountServices.getAccountPhotoURL(token.account.id,64));
    await getGenders()
    await getUserInformation()
      if (isMounted) {
        setInitLoaded(true);
      }
    }
    initEnvelopes();
    return () => {
      isMounted = false;
    };
    
  }, []);
  const getGenders=async()=> {
    const gendersResponse = await AccountServices.getAllGenders();
    const genders = gendersResponse.data.data.map((gender:any) => {
      console.log(gender.id)
      return { id: gender.id, name: gender.attributes.name };
    });
    setGenders(genders)
  }
  const getUserInformation =async()=> {
    const token = TokenServices.getToken();
    console.log(token.account.id)
    const resp = await AccountServices.getAccount(token.account.id);
    console.log(resp)
    if (resp.status !== 200) {
      navigation.navigate('Config')
    }

    // Telefono
    if (resp.data.data.attributes.phone != null) {
    } else {
      token.account.phone = SIN_DEFINIR;
    }

    // Legajo
    if (!resp.data.data.attributes.legajo) {
      token.account.legajo = SIN_DEFINIR;
    }

    // Genero
    if (resp.data.data.relationships.gender.data.data != null) {
      token.account.genderId = resp.data.data.relationships.gender.data.data.id;
      const gender:any = Utils.searchObjInArray(genders, 'id', token.account.genderId).obj;
      if(gender !== null){
        token.account.genderName = gender.name;
      }
    } else {
      token.account.genderName = SIN_DEFINIR;
      token.account.genderId = '';
    }

    // Correo Alternativo
    if (token.account.alternativeEmail == null || token.account.alternativeEmail === '') {
      token.account.alternativeEmail = SIN_DEFINIR;
    }

    // token.account.employeeSince = Utils.normalizeDate(token.account.employeeSince);
    // token.account.birthdate = Utils.normalizeDate(token.account.birthdate);

    // Ajustar el offset del timestamp
    if (token.account.birthdate != null) {
      token.account.birthdate = new Date(
        Utils.getLocalTimestamp(token.account.birthdate, -1)
      );
    }else{
      token.account.birthdate = SIN_DEFINIR
    }
    if (token.account.employeeSince != null) {
      token.account.employeeSince = new Date(
        Utils.getLocalTimestamp(token.account.employeeSince, -1)
      );
    }else{
      token.account.employeeSince = SIN_DEFINIR
    }
    setToken(token)
  }
  return (
    <>
      <ContainerScreen navigation={navigation} setDocuments={setDocuments}>
        {initLoaded?
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
            <Text style={styles.titleText}>Nombre</Text>
            <Text style={styles.bodyText}>{token.account.firstName}</Text>
            <Text style={styles.titleText}>Apellido</Text>
            <Text style={styles.bodyText}>{token.account.lastName}</Text>
            <Text style={styles.titleText}>Género</Text>
            <Text style={styles.bodyText}>{token.account.genderName}</Text>
            <Text style={styles.titleText}>Correo</Text>
            <Text style={styles.bodyText}>{token.account.email}</Text>
            <Text style={styles.titleText}>Fecha de Nacimiento</Text>
            <Text style={styles.bodyText}>{token.account.birthdate}</Text>
            <Text style={styles.titleText}>CUIL</Text>
            <Text style={styles.bodyText}>{token.account.cuilCuit}</Text>
            <Text style={styles.titleText}>Teléfono</Text>
            <Text style={styles.bodyText}>{token.account.phone}</Text>
            <Text style={styles.titleText}>Correo alternativo</Text>
            <Text style={styles.bodyText}>{token.account.alternativeEmail}</Text>
          </ScrollView>
        </View>
      :null}
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
    padding:10,
  },
  pictureNameIconContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  titleText: {
    fontSize: 18,
    alignItems: 'flex-start',
    color:'grey'
  },
  bodyText: {
    fontSize:15,
    borderBottomColor:Colors.background,
    borderBottomWidth:2,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
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
