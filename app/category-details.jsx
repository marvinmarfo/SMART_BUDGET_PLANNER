import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams } from 'expo-router'
import { supabase } from '../utils/SupabaseConfig';
import { Ionicons } from '@expo/vector-icons';
import CourseInfo from '../components/CourseDetails/CourseInfo';
import { useRouter } from 'expo-router';
import CourseItemList from '../components/CourseDetails/CourseItemList';
import Colors from '../utils/Colors';

export default function categoryDetails() {
  const {categoryId}=useLocalSearchParams();
  const [categoryData,setCategoryData]=useState([])
  const router=useRouter();
  useEffect(()=>{
    console.log(categoryId)
    categoryId&&getCategoryDetails();
  },[categoryId]);

  const getCategoryDetails=async()=>{
    const {data,error}=await supabase.from('Category')
    .select('*,CategoryItems(*)')
    .eq('id',categoryId)
    setCategoryData(data[0]);
    console.log("Cat:",data);
  }
  return (
    <ScrollView style={{marginTop:30, padding:10, flex:1, backgroundColor:Colors.WHITE}}>
      <TouchableOpacity onPress={()=>router.back()}>
        <Ionicons name="arrow-back-circle" size={44} color="black" />
      </TouchableOpacity>
      
      <CourseInfo categoryData={categoryData}/>
      <CourseItemList categoryData={categoryData}/>

      <View>
      <Link  href={{
          pathname:'/addnewcatitem',
          params:{
            categoryId:categoryData.id
          }
        }}>
        <Ionicons name="add-circle" size={85} color={Colors.PRIMARY} 
        style={styles.addbtn}/>
      </Link>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  addbtn:{
    position:'absolute',
    bottom:16,
    right:16,
  }
})