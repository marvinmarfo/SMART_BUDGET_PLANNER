import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../utils/Colors';
import { useState, useEffect } from 'react';
import { supabase } from '../../utils/SupabaseConfig';
import { useRouter } from 'expo-router';

export default function CourseInfo({categoryData}) {

    const router=useRouter()
    const [totalCost,setTotalCost]=useState();
    const [percTotal,setPercTotal]=useState(0);
    useEffect(()=>{
        categoryData&&calculateTotalPerc();
    },[categoryData])
    const calculateTotalPerc=()=>{
        let total=0;
        categoryData?.CategoryItems?.forEach(item=>{
            total=total+item.cost;
        });
        setTotalCost(total);
        let perc=(total/categoryData.assigned_budget)*100;
        if(perc>100)
        {
            perc=100;
        }
        setPercTotal(perc)
    }
    
    const onDeleteCategory=()=>{
        Alert.alert('Delete Item','Are you sure you want to delete?',[
            {
                text:'Cancel',
                style:'cancel'
            },
            {
                text:'Yes',
                style:'destrctive',
                onPress:async()=>{ 
                    const { error } = await supabase
                    .from('CategoryItems')
                    .delete()
                    .eq('category_id', categoryData.id);

                     await supabase
                    .from('Category')
                    .delete()
                    .eq('id', categoryData.id);

                    router.replace('/(tabs)')
                }
            }
        ])
    }
  return (
    <View>
        <View style={styles.container}>
            <View style={styles.iconContainer}>
            <Text style={[styles.textIcon,{backgroundColor:categoryData.color}]}>{categoryData.icon}</Text>
            </View>
            <View style={{flex:1, marginLeft:20}}>
                <Text style={{fontFamily:'outfit-bold', fontSize:24}}>{categoryData?.name}</Text>
                <Text style={{fontFamily:'outfit', fontSize:16}}>{categoryData?.CategoryItems?.length} Items</Text>
            </View>
            <TouchableOpacity onPress={()=>onDeleteCategory()}>
                <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
        </View>
        {/* Progress bar */}
        <View style={styles.amountContainer}>
        <Text style={{fontFamily:'outfit-bold', fontSize:18}}>₵{totalCost}</Text>
        <Text style={{fontFamily:'outfit', fontSize:18}}>Total Budget:{categoryData.assigned_budget}</Text>
    </View>
    <View style={styles.progressBarMainContainer}>
        <View style={[styles.progressBarSubContainer,{width:percTotal+'%'}]}></View>
    </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    textIcon:{
        overflow: 'hidden',
      fontSize:35,
      padding:20,
      borderRadius:15
      },
      iconContainer:{
        justifyContent:'center',
        alignItems:'baseline'
      },
      amountContainer:{
        display:'flex',
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:30
    },
    progressBarMainContainer:{
        width:'100%',
        height:15,
        backgroundColor:Colors.GRAY,
        borderRadius:99,
        marginTop:7
    },
    progressBarSubContainer:{
        width:'40%',
        backgroundColor:Colors.PRIMARY,
        borderRadius:99,
        height:15
    }
})