import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';

import * as Google from 'expo-auth-session/providers/google';
import { auth } from '../firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

const webClientId = "26598327907-hab9d55020mh0mo3dijsc5rsd8kcetdq.apps.googleusercontent.com";
const androidClientId = "26598327907-uc6v3v3b1m3v6j3Fq4gkq7v6g5r5j6k3.apps.googleusercontent.com";
const iosClientId = "26598327907-rbt7iu1qrvvq295qrofnauod80trj6kq.apps.googleusercontent.com";


export const useGoogleAuth = () => {
  

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId,
    androidClientId,
    iosClientId,
    scopes: ['profile', 'email'],
   
  });

  const handleGoogleSignIn = async () => {
     try {
      const result = await promptAsync();

      if (result?.type === 'success') {
        const { authentication } = result;
        const credential = GoogleAuthProvider.credential(authentication.idToken);
        const userCredential = await signInWithCredential(auth, credential);
        return { success: true, user: userCredential.user };
      } else {
        return { success: false, error: 'Login cancelled or failed' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    handleGoogleSignIn,
    handleSignOut,
  };
};
