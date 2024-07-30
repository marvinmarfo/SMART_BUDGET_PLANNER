import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Colors from '../utils/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { encode, decode } from 'base64-arraybuffer';
import { supabase } from '../utils/SupabaseConfig';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Toast from 'react-native-root-toast';



const placeholder='https://www.crogastudiobuilds.com/wp-content/uploads/2019/12/placeholder-16-9-26571_1080x675.jpg'
export default function AddNewCategoryItem() {
    const [image,setImage]=useState(placeholder);
    const [previewImage,setPreviewImage]=useState(placeholder);
    const {categoryId}=useLocalSearchParams();
    const [name,setName]=useState();
    const [url,setUrl]=useState();
    const [cost,setCost]=useState();
    const [note,setNote]=useState();
    const [loading,setLoading]=useState(false);
    const router=useRouter();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
        //   aspect: [4, 3],
          quality: 1,
          base64:true
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setPreviewImage(result.assets[0].uri);
          setImage(result.assets[0].base64);
        }
      };
    
    const onClickAdd=async()=>{
        setLoading(true)
        const fileName=Date.now();
        const { data, error } = await supabase
        .storage
        .from('images')
        .upload(fileName+'.png', decode(image), {
            contentType: 'image/png'
        });
        if(data){
            const fileUrl="https://xbgcbbvtcdlregxrclmo.supabase.co/storage/v1/object/public/images/"+fileName+".png"
            console.log(fileUrl)

            const {data,error}=await supabase
            .from('CategoryItems')
            .insert([{
                name:name,
                cost:cost,
                url:url,
                image:fileUrl,
                note:note,
                category_id:categoryId
            }]).select();
            let toast = Toast.show('New Item Added', {
                duration: Toast.durations.LONG,
              });
    
              // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
              setTimeout(function hideToast() {
                Toast.hide(toast);
              }, 500);
            console.log(data)
            setLoading(false)
            router.replace({
                pathname:'category-details',
                params:{
                    categoryId:categoryId
                }
            })
        }

        console.log("File Upload:", data,error);
    }  

  return (
    <KeyboardAvoidingView>
    <ScrollView style={{padding:20}}>
      <TouchableOpacity onPress={()=>pickImage()}>  
      <Image source={{uri:previewImage}}
      style={styles.image}/>
      </TouchableOpacity>

            <View style={styles.TextInputContainer}>
                    <MaterialIcons name="local-offer" size={24} color={Colors.GRAY} />
                    <TextInput placeholder='Item Name' 
                    onChangeText={(value)=>setName(value)}
                    style={{width:'100%', fontSize:18}}/>
                </View>
            <View style={styles.TextInputContainer}>
                    <FontAwesome6 name="cedi-sign" size={24} color={Colors.GRAY} />
                    <TextInput placeholder='Cost' 
                    onChangeText={(value)=>setCost(value)}
                    keyboardType='numeric'
                    style={{width:'100%', fontSize:18}}/>
                </View>
            <View style={styles.TextInputContainer}>
                    <MaterialIcons name="link" size={24} color={Colors.GRAY} />
                    <TextInput placeholder='URL' 
                    onChangeText={(value)=>setUrl(value)}
                    style={{width:'100%', fontSize:18}}/>
                </View>
            <View style={styles.TextInputContainer}>
                    <SimpleLineIcons name="note" size={24} color={Colors.GRAY} />
                    <TextInput placeholder='Note' numberOfLines={3}
                    onChangeText={(value)=>setNote(value)}
                    style={{width:'100%', fontSize:18}}/>
                </View>

      <TouchableOpacity style={styles.button}
            disabled={!name||!cost||loading}
            onPress={()=>onClickAdd()}
        >
            {loading?
            <ActivityIndicator color={Colors.WHITE}/>:    
            <Text style={{textAlign:'center',
            fontFamily:'outfit-bold',color:Colors.WHITE}}>Add</Text>
            }
            
        </TouchableOpacity>
      
    </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    image:{
        width:150,
        height:150,
        // backgroundColor:Colors.GRAY,
        borderRadius:15
    },
    TextInputContainer:{
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
        padding:17,
        backgroundColor:Colors.PRIMARY,
        borderRadius:99,
        marginTop:25
    }
})