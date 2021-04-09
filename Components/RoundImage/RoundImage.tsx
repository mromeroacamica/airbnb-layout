import React, { useState } from 'react';
import {StyleSheet, View,Text,Image} from 'react-native';
// import TokenServices from '../../services/token/TokenServices';

export interface Props{
  initials:string,
  imageUrl?:string
}

const RoundImage: React.FC<Props> = ({initials, imageUrl}) => {
  const [hasImage, setHasImage] = useState(true)
  console.log(imageUrl)

  return (
    <>
      <View style={[styles.roundImageContainer,!hasImage?styles.borderColor:null]}>
        {hasImage && imageUrl !==''?
        <Image style={styles.imageStyle} source={{uri:imageUrl,
        cache:'reload'}} onError={()=>{
        setHasImage(false)}}/>
        :
        <Text>{initials}</Text>
        }
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  roundImageContainer: {
    height: 55,
    width: 55,
    borderRadius: 100,
    alignItems:'center',
    justifyContent:'center'
  },
  imageStyle:{
    height:48,
    width:48,
    borderRadius:100
  },
  borderColor:{
    borderWidth:3,
    borderColor:'blue'
  }
  
});

export default RoundImage;
