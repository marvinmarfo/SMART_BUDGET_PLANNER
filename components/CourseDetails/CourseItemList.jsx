import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Colors from '../../utils/Colors'

export default function CourseItemList({categoryData}) {
  return (
    <View style={{marginTop:30}}>
      <Text style={{fontFamily:'outfit-bold',fontSize:25}}>Item List</Text>

      <View >
      {categoryData?.CategoryItems?.length>0?categoryData?.CategoryItems?.map((item, index)=>(
          <>
          <View key={index}  style={{
            display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}> 
            <Image source={{uri:item.image }} style={styles.image}/>

            <View style={{flex:1, marginLeft:10}}>
              <Text style={{fontSize:20,fontFamily:'outfit-bold'}}>{item.name}</Text>
              <Text style={{fontFamily:'outfit', color:Colors.GRAY}}>{item.url}</Text>
            </View>
            <Text style={{fontSize:18,fontFamily:'outfit-bold',marginLeft:10}}>₵{item.cost}</Text>
          </View>
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