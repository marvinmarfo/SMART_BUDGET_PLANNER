import { View, Text, StyleSheet } from 'react-native'
import React, { useState} from 'react'
import PieChart from 'react-native-pie-chart'
import Colors from '../utils/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CustomPieChart() {

    const widthAndHeight=170;
    const [values, setValues]=useState([1])
    const [sliceColor, setSliceColor]=useState([Colors.GRAY])
    
  return (
    <View style={styles.container}>
      <Text style={{fontSize:20, fontFamily:'outfit' }}>Total Estimate :<Text style={{fontFamily:'outfit-bold'}}> ₵0</Text></Text>
      <View style={styles.subcontainer}>
        <PieChart
              widthAndHeight={widthAndHeight}
              series={values}
              sliceColor={sliceColor}
              coverRadius={0.50}
              coverFill={'#FFF'}
            />
    
    <View style={{display:'flex', flexDirection:'row', gap:5, alignItems:'center'}}>
    <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={Colors.GRAY} />
    <Text>NA</Text>
    </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:80,
    backgroundColor:Colors.WHITE,
    padding:20,
    borderRadius:15,
    elevation:1
  },
  subcontainer:{
    marginTop:15,
    display:'flex',
    flexDirection:'row',
    gap:50
  }
})