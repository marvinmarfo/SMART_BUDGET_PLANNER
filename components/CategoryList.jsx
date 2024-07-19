import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../utils/Colors'
import { useRouter } from 'expo-router'


export default function CategoryList({categoryList}) {

    const router=useRouter();
    const onCategoryClick=(category)=>{
        router.push({
            pathname:'category-details',
            params:{
                categoryId:category.id
            }
        })
    }

    const calculateTotalCost=(CategoryItems)=>{
        let totalCost=0;
        CategoryItems.forEach(item => {
            totalCost=totalCost+item.cost
        })
        return totalCost;
    }
  return (
    <View style={{marginTop:20}}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:22,
        marginBottom:10
      }}>Latest Budget</Text>
      <View>
        {categoryList?.map((category, index)=>(
            <TouchableOpacity key={index} style={styles.container} onPress={()=>onCategoryClick(category)}
            >
                <View style={styles.iconContainer}>
                    <Text style={[styles.iconText, {backgroundColor:category?.color}]}>{category.icon} </Text>
                </View>
                <View style={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',
                    width:'70%'
                }}>
                    <View>
                        <Text style={styles.categoryText}>{category.name}</Text>
                        <Text style={styles.itemCount}>{category?.CategoryItems?.length} Items</Text>
                    </View>
                    <Text style={{
                        fontWeight:'bold',
                        fontSize:'17',
                        fontFamily:'outfit'
                    }}>₵{calculateTotalCost(category?.CategoryItems)}</Text>
                </View>
                </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}


const styles=StyleSheet.create({
    container:{
        marginBottom:15,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        backgroundColor:Colors.WHITE,
        padding:10,
        borderRadius:15
    },
    iconContainer:{
        justifyContent:'center',
        alignItems:'baseline'
    },
    iconText:{
        overflow: 'hidden',
        fontSize:30,
        padding:16,
        borderRadius:15,
    },
    categoryText:{
        fontFamily:'outfit-bold',
        fontSize:20
    },
    itemCount:{
        fontFamily:'outfit'
    }
})