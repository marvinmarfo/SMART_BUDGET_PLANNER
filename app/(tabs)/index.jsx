import { View, Text, StyleSheet, Button, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import Colors from '../../utils/Colors'
import services from '../../utils/services'
import { supabase } from '../../utils/SupabaseConfig'
import Header from '../../components/Header';
import PieChart from '../../components/CustomPieChart'
import CustomPieChart from '../../components/CustomPieChart'
import { Ionicons } from '@expo/vector-icons';
import { client } from '../../utils/KindeConfig'
import CategoryList from '../../components/CategoryList'
export default function Home() {

    const [loading,setLoading]=useState(false);
    const router=useRouter();
    const [categoryList,setCategoryList]=useState();
    useEffect(()=>{
        checkUserAuth();
        getCategoryList();
    },[])
    

    // used to check if user is already authorised or not
    const checkUserAuth=async()=>{
        const result=await services.getData('login');
        if(result!=='true')
            {
                router.replace('/')
            }
    }
  const getCategoryList=async()=>{
    setLoading(true)
    const user=await client.getUserDetails();
    const {data,error}=await supabase.from('Category')
    .select('*, CategoryItems(*)')
    .eq('created_by',user.email)

    console.log("Data",data)
    setCategoryList(data);
    data&&setLoading(false)
  }

  return (
    <View style={{
      marginTop: 30,
      flex:1
    }}>
      <ScrollView refreshControl={
        <RefreshControl
          onRefresh={()=>getCategoryList()}
          refreshing={loading}
        />
      }
      >
      <View style={{
        padding:20,
        backgroundColor:Colors.PRIMARY,
        height: 200
        }}>
        <Header/>
        </View>
        <View style={{
              padding:20,
              marginTop:-145
             }}>
          <CustomPieChart />
          <CategoryList categoryList={categoryList}/>
        </View>

    </ScrollView>
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