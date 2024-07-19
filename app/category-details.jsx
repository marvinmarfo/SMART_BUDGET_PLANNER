import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { supabase } from '../utils/SupabaseConfig';
import { Ionicons } from '@expo/vector-icons';
import CourseInfo from '../components/CourseDetails/CourseInfo';

export default function categoryDetails() {
  const {categoryId}=useLocalSearchParams();
  const [categoryData,setCategoryData]=useState([])
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
    <View style={{marginTop:30, padding:10}}>
      <Ionicons name="arrow-back-circle" size={44} color="black" />
      <CourseInfo categoryData={categoryData}/>
    </View>
  )
}