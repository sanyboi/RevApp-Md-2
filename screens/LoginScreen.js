import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, FacebookAuthProvider, signInWithCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import styles from './LoginStyles';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- Generate redirect URI based on platform ---
  const redirectUri = AuthSession.makeRedirectUri({
    scheme: 'revapp',               // custom scheme
    useProxy: Platform.select({ ios: true, android: true, default: false }), // proxy for Expo Go iOS/Android
  });

  useEffect(() => {
    console.log('🚀 Redirect URI:', redirectUri);
  }, []);

  // --- Facebook Login ---
  const [requestFb, responseFb, promptAsyncFb] = Facebook.useAuthRequest({
    clientId: '1544227193443135',
    redirectUri: redirectUri,
    scopes: ['public_profile', 'email'],
  });

  // --- Google Login ---
  const [requestGoogle, responseGoogle, promptAsyncGoogle] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',      // required for standalone iOS
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com', // required for standalone Android
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',        // required for Web
    redirectUri: redirectUri,
  });

  // --- Handle Google Response ---
  useEffect(() => {
    if (responseGoogle?.type === 'success') {
      const { authentication } = responseGoogle;
      if (authentication?.idToken) {
        const credential = GoogleAuthProvider.credential(authentication.idToken);
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            Alert.alert('✅ Logged in', `Welcome ${userCredential.user.email}`);
          })
          .catch((error) => Alert.alert('❌ Google Login Error', error.message));
      }
    }
  }, [responseGoogle]);

  // --- Handle Facebook Response ---
  useEffect(() => {
    if (responseFb?.type === 'success') {
      const { authentication } = responseFb;
      if (authentication?.accessToken) {
        const credential = FacebookAuthProvider.credential(authentication.accessToken);
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            Alert.alert('✅ Logged in', `Welcome ${userCredential.user.displayName || userCredential.user.email}`);
          })
          .catch((error) => Alert.alert('❌ Facebook Login Error', error.message));
      }
    }
  }, [responseFb]);

  // --- Email & Password Login ---
  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('✅ Login Successful', `Welcome ${userCredential.user.email}`);
    } catch (error) {
      Alert.alert('❌ Login Failed', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={['#0e0e0e', '#1a1a1a']} style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/rev-logo.png')} style={styles.logo} />
          <Text style={styles.logoText}>REV</Text>
        </View>

        {/* Show redirect URI on screen */}
        <Text style={{ color: 'yellow', margin: 10, fontSize: 12 }}>
          Redirect URI: {redirectUri}
        </Text>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="example@email.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="********"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Email Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleEmailLogin}>
          <Text style={styles.loginText}>Log in with Email</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or sign in with</Text>

        {/* Social Login Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialCircle} onPress={() => promptAsyncFb()}>
            <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialCircle} onPress={() => promptAsyncGoogle()}>
            <Image source={require('../assets/google.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>

        {/* Sign Up */}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>
            Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}
