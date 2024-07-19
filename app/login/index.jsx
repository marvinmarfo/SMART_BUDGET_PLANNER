import { View, Text, Image, StyleSheet, } from 'react-native'
import React from 'react'
import loginbg from '../../assets/loginbg.png';
import { client } from '../../utils/KindeConfig';
import Colors from '../../utils/Colors';
import { TouchableOpacity } from 'react-native';;
import services from '../../utils/services'
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import Auth from '../../components/Auth';

export default function LoginScreen() {
  const router = useRouter();

const handleSignUp = async () => {
  const token = await client.register();
  if (token) {
    // User was authenticated
  }
};

const handleSignIn = async () => {
  const token = await client.login();
  if (token) {
    // User was authenticated
       await services.storeData('login','true');
      //  console.log(token);
       router.replace('/')
  }
};
  return (
    <View style={{
      display:'flex',
      alignItems:'center'
    }}>
      <Image source={loginbg}
      style={styles.bgImage}/>
      <View style={{
        backgroundColor:Colors.PRIMARY,
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
        color:Colors.WHITE,
        textAlign:"center"
      }}>Smart Budget Planner</Text>

      <Text style={{
        color:Colors.WHITE,
        fontSize:20,
        textAlign:'center',
        marginTop:20
      }}>Stay on Track, Event by Event: Your Smart Budget Planner App!</Text>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={{
          color:Colors.PRIMARY,
          textAlign: 'center', 
        }}>Login/Signup</Text>
      </TouchableOpacity>
      <Text style={{fontSize:15, color:Colors.WHITE, marginTop:10}}>* By login/signup you will agree to our terms and conitions</Text>
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
    borderColor:Colors.BLACK
  },
  button:{
    backgroundColor:Colors.WHITE,
    marginTop:30,
    paddingHorizontal:5,
    padding:15,
    borderRadius:99
  }
})

