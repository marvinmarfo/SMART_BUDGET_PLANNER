import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Share, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { client } from '../../utils/KindeConfig';
import Colors from '../../utils/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import appbg from '../../assets/appbg.jpg'

// const background={appbg}
export default function Profile() {

  const [user,setUser]=useState();

  useEffect(()=>{
      getUserData();
  },[])
  // used to get user data
  const getUserData=async()=>{
    const user=await client.getUserDetails();
    setUser(user);
  }
  
  const handleLogout = async () => {
    const loggedOut = await client.logout(true);
    if (loggedOut) {
      // User was logged out
      Alert.alert(
        "Logout Confirmation",
        "Are you sure you want to log out?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Logout",
            onPress: () => {
              // Add your logout logic here, such as clearing user data or tokens
              router.replace('/login')
              console.log("User logged out");
            },
            style:'destructive'
          }
        ],
        { cancelable: false }
      );
    }
  };

  const customShare=async()=>{
    const shareOptions={
      // title:'Smart Budget Planner',
      message:'Smart Budget Planner',
      url:'https://apps.apple.com/gh/app/youtube-watch-listen-stream/id544007664'
    }
    try {
      const shareResponse = await Share.share(shareOptions)
      console.log(
        JSON.stringify(shareResponse)
      )
    } catch (error) {
      console.log('Error :', error)
    }
  }


  return (
    <View style={{flex:1}}>
      
      <View style={{
        padding:20,
        backgroundColor:Colors.PRIMARY,
        height: 390,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30
        }}>
      <View style={{alignItems:'center', marginTop:100}}>
        {/* <Text style={{marginTop: 100, textAlign:'center', fontSize:50}}>Profile</Text> */}

        <View style={{display:'flex', flexDirection:'row'}}>
          <Text style={styles.name}>{user?.given_name}</Text>
          <Text style={styles.name}>  {user?.family_name}</Text>
        </View>

        <Image source={{uri:user?.picture}} 
        style={{
          width:120,
          height:120,
          borderRadius:99,
          marginTop:15

        }} />
        <TouchableOpacity>
        <Text style={styles.mail}>{user?.email}</Text></TouchableOpacity>
      </View>
      </View>

      <ImageBackground source={appbg} resizeMode='stretch' style={{flex:1,justifyContent:'center'}}>
        <TouchableOpacity style={[styles.btns,{backgroundColor:Colors.BLACK, bottom:-220}]} onPress={customShare}>
          <FontAwesome5 name="share" size={24} color="white" style={{marginLeft:15}} />
          <Text style={{fontSize:'24', color:Colors.WHITE}}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btns,{backgroundColor:Colors.RED}]} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={24} color="white" style={{marginLeft:15}}/>
          <Text style={{fontSize:'24', color:Colors.WHITE}}>Logout</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  name:{
    color:Colors.WHITE,
    marginTop:15,
    fontSize:25,
    fontFamily:'outfit-bold',
    marginBottom:15,
    textTransform:'uppercase'
  },
  btns:{
    marginTop:20,
    // alignItems:'center',
    display:'flex',
    flexDirection:'row',
    // justifyContent:'center',
    gap:100,
    // position:'absolute',
    bottom:-100,
    padding:20,
    borderRadius:99,
    width:'90%',
    margin:'auto'
  },
  mail:{
    color:Colors.WHITE,
    marginTop:30,
    fontSize:17,
    backgroundColor:Colors.GRAY,
    padding:5,
    paddingHorizontal:10,
    
    overflow: 'hidden',
    borderRadius:15
  }
})