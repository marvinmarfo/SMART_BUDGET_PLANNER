import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { useFonts } from 'expo-font';
import { useEffect } from 'react'

export default function HomeLayout() {

  const [loaded, error] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  });

  const router = useRouter();
  useEffect(() => {
    // Redirect to login screen initially
    router.replace('/login');
  }, []);

  


  return (
    <Stack screenOptions={{
      headerShown:false
    }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name='addcategory' options={{presentation:'modal', headerShown:true, headerTitle:'Add New Category'}} />
      <Stack.Screen name='addnewcatitem' options={{presentation:'modal', headerShown:true, headerTitle:'Add New Item'}} />
    </Stack>
  )
}