import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'

export default function ColorPicker({selectedColor, setSelectedColor}) {
  return (
    <View style={{
        display:'flex',
        flexDirection:'row',
        gap:20,
        marginTop:35,
        marginLeft:30
    }}>
        {Colors.COLOR_LIST.map((color,index)=>(
            <TouchableOpacity
            key={index}
            style={[{
                height:35,
                width:35,
                backgroundColor:color,
                borderRadius:99
            }, selectedColor==color&&{borderWidth:4}]} onPress={()=>setSelectedColor(color)}>
            </TouchableOpacity>
        ))}
      
    </View>
  )
}