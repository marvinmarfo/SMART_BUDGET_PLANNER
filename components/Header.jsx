import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { client } from '../utils/KindeConfig'
import  Colors  from '../utils/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
  const [user,setUser]=useState();

  useEffect(()=>{
      getUserData();
  },[])
  // used to get user data
  const getUserData=async()=>{
    const user=await client.getUserDetails();
    setUser(user);
  }
  return (
    <View style={{
      display:'flex',
      flexDirection:'row',
      gap:10,
      alignItems:'center'
    }}>
      <Image source={{uri:user?.picture}} 
      style={{
        width:60,
        height:60,
        borderRadius:99
      }} />
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'75%'
      }}>
        <View>
          <Text style={{color:Colors.WHITE, fontSize:15}}>Welcome, </Text>
          <Text style={{color:Colors.WHITE, fontSize:25, fontWeight:'bold'}}>{user?.given_name}</Text>
        </View>
        <View>
        {/* <Ionicons name="notifications" size={24} color="#fff" /> */}
        </View>
      </View>
    </View>
  )
}