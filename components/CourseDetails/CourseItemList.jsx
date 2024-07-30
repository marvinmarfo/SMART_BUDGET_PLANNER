import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../utils/Colors'
import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { supabase } from '../../utils/SupabaseConfig';

export default function CourseItemList({categoryData, setUpdateRecord}) {
  const [expandItem,setExpandItem]=useState(0)
  const onDeleteItem=async(id)=>{
    const {error}=await supabase.from('CategoryItems')
    .delete()
    .eq('id',id)

    setUpdateRecord(true)
  }
  const openURL=(url)=>{
    if(url)
    {
      Linking.openURL(url)
    }
  }
  return (
    <View style={{marginTop:30}}>
      <Text style={{fontFamily:'outfit-bold',fontSize:25}}>Item List</Text>

      <View >
      {categoryData?.CategoryItems?.length>0?categoryData?.CategoryItems?.map((item, index)=>(
          <>
          <TouchableOpacity key={index}  style={{
            display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} onPress={()=>setExpandItem(index)}> 
            <Image source={{uri:item.image }} style={styles.image}/>

            <View style={{flex:1, marginLeft:10}}>
              <Text style={{fontSize:20,fontFamily:'outfit-bold'}}>{item.name}</Text>
              <Text style={{fontFamily:'outfit', color:Colors.GRAY}} numberOfLines={2}>{item.url}</Text>
            </View>
            <Text style={{fontSize:18,fontFamily:'outfit-bold',marginLeft:10}}>₵{item.cost}</Text>
          </TouchableOpacity>
          {expandItem==index&&
            <View style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center',gap:10}}>
              <TouchableOpacity onPress={()=>onDeleteItem(item.id)}>
                <Ionicons name="trash" size={28} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>openURL(item.url)}>
                <EvilIcons name="external-link" size={28} color="blue" />
              </TouchableOpacity>
            </View>}
          {categoryData?.CategoryItems.length-1!=index&&
          <View style={{borderWidth:0.5, marginTop:10, borderColor:Colors.GRAY}}></View>}
          </>
        )):
        <Text style={{fontFamily:'outfit-bold', fontSize:25, color:Colors.GRAY, marginTop:100, textAlign:'center'}}>No Item Found</Text>
      }
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  image:{
    width:90,
    height:90,
    borderRadius:15,
    marginTop:20
  }
})