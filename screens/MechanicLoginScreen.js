import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import styles from './LoginStyles';

export default function MechanicLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');
    const [googleError, setGoogleError] = useState('');

  // --- Validation functions ---
  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    return '';
  };

  // --- Login handler ---
  const handleMechanicLogin = async () => {
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return;

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Optionally verify user role here
      navigation.replace('MechanicLanding');
    } catch (error) {
      setGeneralError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Forgot Password handler ---
  const handleForgotPassword = async () => {
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    const emailErr = validateEmail(email);
    setEmailError(emailErr);
    if (emailErr) return;

    try {
      await sendPasswordResetEmail(auth, email);
      navigation.navigate('ResetPassword', { email }); // navigate to reset screen
    } catch (error) {
      setGeneralError(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={['#1C2433', '#1C2433']} style={styles.container}>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('RoleSelect')}
          >
            <Image
              source={require('../assets/back.png')}
              style={{ width: 24, height: 24, tintColor: '#fff' }}
            />
          </TouchableOpacity>
        </View>

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo2.png')} style={styles.logo} />
          <Text style={styles.logoText}>REV </Text>
          <Text style={styles.logoText}> MECHANIC</Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="example@email.com"
            placeholderTextColor="#666"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(validateEmail(text));
            }}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorLabel}>{emailError}</Text> : null}
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={{ position: 'relative' }}>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError(validatePassword(text));
              }}
              style={styles.input}
            />
            <TouchableOpacity
              style={{ position: 'absolute', right: 15, top: 14, zIndex: 10 }}
              onPress={() => setShowPassword((prev) => !prev)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Image source={require('../assets/eye.png')} style={{ width: 22, height: 22, tintColor: '#888' }} />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorLabel}>{passwordError}</Text> : null}
        </View>

               {/* Forgot Password */}
              <TouchableOpacity
          style={styles.forgotContainer}
          onPress={() => {
            // Validate email first
            const emailErr = validateEmail(email);
            setEmailError(emailErr);
            setPasswordError(''); // clear password error
            setGoogleError(''); // clear Google error
        
            if (!emailErr) {
              // Only navigate if email is valid
              navigation.navigate('ResetPassMech', { email });
            }
          }}
        >
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* General Error */}
        {generalError ? <Text style={styles.errorLabel}>{generalError}</Text> : null}

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, { marginTop: 20 }]}
          onPress={handleMechanicLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginText}>Login as Mechanic</Text>
          )}
        </TouchableOpacity>

        
      </LinearGradient>
    </ScrollView>
  );
}
