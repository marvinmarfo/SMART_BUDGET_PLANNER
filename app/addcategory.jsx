import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors'
import ColorPicker from '../components/ColorPicker'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

export default function AddNewCategory() {

    const [selectedIcon,setSelectedIcon]=useState('MM')
    const [selectedColor,setSelectedColor]=useState(Colors.PRIMARY)
    const [categoryName,setCategoryName]=useState();
    const [totalBudget,setTotalBudget]=useState();
  return (
    <View style={{padding:20}}>
      <View style={{justifyContent:'center', alignContent:'center', paddingLeft: 115, marginTop:40}}>
        <TextInput
            style={[styles.iconInput, 
            {backgroundColor:selectedColor},]} maxLength={2}
            onChangeText={(value)=>setSelectedIcon(value)}>
                {selectedIcon}
            </TextInput>
            
      </View>
      <ColorPicker selectedColor={selectedColor} setSelectedColor={(color)=>setSelectedColor(color)}/>

      <View style={styles.inputView}>
        <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
        <TextInput placeholder='Category Name' 
        onChangeText={(v)=>setCategoryName(v)}
        style={{width:'100%', fontSize:18}}/>
      </View>

      <View style={styles.inputView}>
      <FontAwesome6 name="cedi-sign" size={24} color={Colors.GRAY} />
        <TextInput placeholder='Total Budget' 
        keyboardType='numeric' 
        onChangeText={(v)=>setTotalBudget(v)}
        style={{width:'100%', fontSize:18}}/>
      </View>

      <TouchableOpacity style={styles.button}
        disabled={!categoryName||!totalBudget}>
            <Text style={{textAlign:'center', fontSize:18, color:Colors.WHITE}}>Create</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    iconInput:{
        textAlign:'center',
        fontSize:30,
        width:120,
        height:120,
        borderRadius:60,
        padding:20,
        color:Colors.WHITE
    },
    inputView:{
        borderWidth:1,
        display:'flex',
        flexDirection:'row',
        gap:5,
        padding:14,
        borderRadius:10,
        borderColor:Colors.GRAY,
        backgroundColor:Colors.WHITE,
        alignItems:'center',
        marginTop:40
      },
      button:{
        backgroundColor:Colors.PRIMARY,
        padding:15,
        borderRadius:10,
        marginTop:30
      }
})