import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function CourseInfo({categoryData}) {
  return (
    <View style={{marginTop:20}}>
        <View style={styles.iconContainer}>
          <Text style={[styles.textIcon,{backgroundColor:categoryData.color}]}>{categoryData.icon}</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
    textIcon:{
        fontSize:35,
      padding:20,
      borderRadius:15
      },
      iconContainer:{
        justifyContent:'center',
        alignItems:'baseline'
      },
})