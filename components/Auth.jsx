// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
//   } from '@react-native-google-signin/google-signin'
//   import { supabase } from '../utils/supabase'
  
//   export default function () {
//     GoogleSignin.configure({
//       scopes: ['https://www.googleapis.com/auth/drive.readonly'],
//       webClientId: 'YOUR CLIENT ID FROM GOOGLE CONSOLE',
//     })
  
//     return (
//       <GoogleSigninButton
//         size={GoogleSigninButton.Size.Wide}
//         color={GoogleSigninButton.Color.Dark}
//         onPress={async () => {
//           try {
//             await GoogleSignin.hasPlayServices()
//             const userInfo = await GoogleSignin.signIn()
//             if (userInfo.idToken) {
//               const { data, error } = await supabase.auth.signInWithIdToken({
//                 provider: 'google',
//                 token: userInfo.idToken,
//               })
//               console.log(error, data)
//             } else {
//               throw new Error('no ID token present!')
//             }
//           } catch (error: any) {
//             if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//               // user cancelled the login flow
//             } else if (error.code === statusCodes.IN_PROGRESS) {
//               // operation (e.g. sign in) is in progress already
//             } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//               // play services not available or outdated
//             } else {
//               // some other error happened
//             }
//           }
//         }}
//       />
//     )
//   }

// auth.js
import kinde from '../utils/KindeConfig';

export const handleSignIn = async () => {
  try {
    const token = await kinde.login();
    if (token) {
      // Token obtained, you can use it to authenticate with your backend
      console.log('Token:', token);
      return token;
    } else {
      console.error('Failed to obtain token');
    }
  } catch (error) {
    console.error('Error during sign-in:', error);
  }
};
