import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
import { Link, useRouter } from 'expo-router'
import Colors from '../../utils/Colors'
import services from '../../utils/services'
import Header from '../../components/Header';
import PieChart from '../../components/CustomPieChart'
import CustomPieChart from '../../components/CustomPieChart'
import { Ionicons } from '@expo/vector-icons';
export default function Home() {

    // const router=useRouter();
    // useEffect(()=>{
    //     checkUserAuth();
    // },[])
    

    // // used to check if user is already authorised or not
    // const checkUserAuth=async()=>{
    //     const result=await services.getData('login');
    //     if(result!=='true')
    //         {
    //             router.replace('/login')
    //         }
    // }
  return (
    <View style={{
      marginTop: 30,
      flex:1
    }}>
    <View style={{
      padding:20,
      backgroundColor:Colors.PRIMARY,
      height: 200
      }}>
      <Header/>

      <CustomPieChart />
    </View>
    <Link href={'/addcategory'}style={{
      position:'absolute',
      bottom:16,
      right:16
    }}>
      <Ionicons name="add-circle" size={75} color={Colors.PRIMARY} />
    </Link>
    </View>
  );
}

const styles = StyleSheet.create({
    text:{
        fontSize:50
    }
})