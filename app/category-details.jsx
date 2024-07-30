// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, RefreshControl } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { Link, useLocalSearchParams } from 'expo-router'
// import { supabase } from '../utils/SupabaseConfig';
// import { Ionicons } from '@expo/vector-icons';
// import CourseInfo from '../components/CourseDetails/CourseInfo';
// import { useRouter } from 'expo-router';
// import CourseItemList from '../components/CourseDetails/CourseItemList';
// import Colors from '../utils/Colors';

// export default function categoryDetails() {
//   const {categoryId}=useLocalSearchParams();
//   const [categoryData,setCategoryData]=useState([])
//   const router=useRouter();
//   const [loading,setLoading]=useState(false);
//   useEffect(()=>{
//     console.log(categoryId)
//     categoryId&&getCategoryDetails();
//   },[categoryId]);

//   const getCategoryDetails=async()=>{
//     setLoading(true)
//     const {data,error}=await supabase.from('Category')
//     .select('*,CategoryItems(*)')
//     .eq('id',categoryId)
//     setCategoryData(data[0]);
//     console.log("Cat:",data);
//     setLoading(false)
//   }
//   return (
//     <View style={{marginTop:30, padding:10, flex:1, backgroundColor:Colors.WHITE}}>
//       <ScrollView refreshControl={
//         <RefreshControl
//           onRefresh={()=>getCategoryList()}
//           refreshing={loading}
//         />
//       }
//       >
//       <TouchableOpacity onPress={()=>router.replace('/(tabs)')}>
//         <Ionicons name="arrow-back-circle" size={44} color="black" />
//       </TouchableOpacity>
      
//       <CourseInfo categoryData={categoryData}/>
//       <CourseItemList categoryData={categoryData} setUpdateRecord={()=>getCategoryDetails()}/>
//       </ScrollView>

      
//       <Link  href={{
//           pathname:'/addnewcatitem',
//           params:{
//             categoryId:categoryData.id
//           }
//         }}>
//         <Ionicons name="add-circle" size={85} color={Colors.PRIMARY} 
//         style={styles.addbtn}/>
//       </Link>
//       </View>
      
//   )
// }

// const styles = StyleSheet.create({
//   addbtn:{
//     position:'absolute',
//     bottom:16,
//     right:40,
//   }
// })



import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router'
import { supabase } from '../utils/SupabaseConfig';
import { Ionicons } from '@expo/vector-icons';
import CourseInfo from '../components/CourseDetails/CourseInfo';
import CourseItemList from '../components/CourseDetails/CourseItemList';
import Colors from '../utils/Colors';


export default function CategoryDetails() {
  const {categoryId}=useLocalSearchParams();
  const [categoryData,setCategoryData]=useState([]);
  const router=useRouter();
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
      console.log(categoryId)
      categoryId&&getCategoryDetails();
  },[categoryId]);

  const getCategoryDetails=async()=>{
      setLoading(true)
      const {data,error}=await supabase.from('Category')
      .select('*,CategoryItems(*)')
      .eq('id',categoryId)
      setCategoryData(data[0]);
      console.log("Cat:",data);
      setLoading(false)
  }
  return (
    <View style={{padding:20,marginTop:20,flex:1,backgroundColor:Colors.WHITE}}>
        <ScrollView showsVerticalScrollIndicator={false}refreshControl={
         <RefreshControl
          onRefresh={()=>getCategoryList()}
           refreshing={loading} 
         />
      }
       >
         <TouchableOpacity onPress={()=>router.replace('/(tabs)')}>
         <Ionicons name="arrow-back-circle" size={44} color="black" />
      </TouchableOpacity>
        <CourseInfo categoryData={categoryData} />

        <CourseItemList categoryData={categoryData}
        setUpdateRecord={()=>getCategoryDetails()} />
    </ScrollView>
       
  
    <Link 
        href={{
          pathname:'/addnewcatitem',
          params:{
            categoryId:categoryData.id
          }
        }}
        style={styles.floatingBtn}

        >
          <Ionicons name="add-circle" size={75} color={Colors.PRIMARY} />
        </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  floatingBtn:{
    position:'absolute',
    bottom:60,
    right:16
  }
})