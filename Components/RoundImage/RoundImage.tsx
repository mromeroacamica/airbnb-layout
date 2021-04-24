import React, { useState } from 'react';
import {StyleSheet, View,Text,Image} from 'react-native';

export interface Props{
  initials:string,
  imageUrl?:string
}

const RoundImage: React.FC<Props> = ({initials, imageUrl}) => {
  const [hasImage, setHasImage] = useState(true)
  return (
    <>
      <View style={[styles.roundImageContainer,!hasImage?styles.borderColor:null]}>
        {hasImage && imageUrl !==''?
        <Image style={styles.imageStyle} source={{uri:imageUrl,
        cache:'reload'}} onError={()=>{
        setHasImage(false)}}/>
        :
        <Text style={styles.initialsText}>{initials}</Text>
        }
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  roundImageContainer: {
    height: 55,
    width: 55,
    alignItems:'center',
    justifyContent:'center',
    marginRight:10
  },
  imageStyle:{
    height:48,
    width:48,
    borderRadius:100
  },
  borderColor:{
    borderWidth:3,
    borderColor:'blue',
    borderRadius:100
  },
  initialsText:{
    fontSize:18,
    fontWeight:'bold'
  }
  
});

export default RoundImage;
