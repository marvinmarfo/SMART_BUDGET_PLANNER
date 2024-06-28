import { View, Text, Image, StyleSheet, } from 'react-native'
import React from 'react'
import { loginbg } from '../../assets/images/loginbg.png';
import { client } from '../../utils/KindeConfig';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';;
import services from '../../utils/services'
import { useRouter } from 'expo-router';


export default function LoginScreen() {
  const router = useRouter();

  const handleSignIn = async () => {
    const token = await client.login(); // Modify this to get the token after authentication
        if (token) {
          await services.storeData('login', 'true');
          router.replace('/');
  };
  return (
    <View style={{
      display:'flex',
      alignItems:'center'
    }}>
      <Image source={loginbg}
      style={styles.bgImage}/>
      <View style={{
        backgroundColor:Colors.primary,
        width: '100%',
        height:'100%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        padding:20,
        marginTop:-30
      }
      }>
      <Text style={{
        fontSize:43,
        fontWeight:'bold',
        color:Colors.white,
        textAlign:"center"
      }}>Smart Budget Planner</Text>

      <Text style={{
        color:Colors.white,
        fontSize:20,
        textAlign:'center',
        marginTop:20
      }}>Stay on Track, Event by Event: Your Smart Budget Planner App!</Text>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={{
          color:Colors.primary,
          textAlign: 'center', 
        }}>Login/Signup</Text>
      </TouchableOpacity>
      <Text style={{fontSize:15, color:Colors.white, marginTop:10}}>* By login/signup you will agree to our terms and conitions</Text>
    </View>
    </View>
    
  )
}

const styles=StyleSheet.create({
  bgImage:{
    width:200,
    height:450,
    marginTop:50,
    borderWidth:5,
    borderRadius:20,
    borderColor:Colors.black
  },
  button:{
    backgroundColor:Colors.white,
    marginTop:30,
    paddingHorizontal:5,
    padding:15,
    borderRadius:99
  }
})
}

