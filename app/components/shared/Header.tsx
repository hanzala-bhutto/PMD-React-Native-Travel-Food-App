import { View, Text, Image, StyleSheet, TextInput, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../shared/Colors';
import { useProfileContext } from '../../context/profilecontext';

const Header = ({search,updateSearch}) => {

    const [profilePhoto, setProfilePhoto] = useState('');
    const {profileImage} = useProfileContext();

    useEffect(()=> {
        if (profileImage){
            setProfilePhoto(profileImage);
        }
    },[profileImage])

    return (
    <View style={{display:'flex',flexDirection:'row',
    justifyContent:'space-evenly',gap:10,
    alignItems:'center'
    }}>
        <Image source={require('./../../../assets/logo.png')}
            style={styles.logo}/>

        <View>
            <TextInput placeholder='Search' onChangeText={updateSearch} value={search}
                style={styles.searchBar}
            />
        </View>  
        <Image source={profilePhoto ? profilePhoto : require('./../../../assets/user.png')} 
            style={styles.userImage}
        /> 
    </View>
  )
}

const styles = StyleSheet.create({
    logo:{
      width:50,
      height:50  
    },
    searchBar:{
        borderWidth:1,
        borderColor:Colors.GRAY,
        padding:4,
        borderRadius:50,
        paddingLeft:10,
        width:Dimensions.get('screen').width*0.53,
        borderColor:Colors.PRIMARY,
        
    },
    userImage:{
        width:50,
        height:50,
        borderRadius:100
    }
})

export default Header;
