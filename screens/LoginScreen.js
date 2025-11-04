import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import styles from './LoginStyles';
import { useGoogleAuth } from '../config/googleAuth'; // ✅ uses your expo-auth-session logic

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [googleError, setGoogleError] = useState('');

  const { handleGoogleSignIn } = useGoogleAuth();

  // --- Validation ---
  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  // --- Email Login ---
  const handleEmailLogin = async () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    setEmailError(emailErr);
    setPasswordError(passwordErr);

    if (emailErr || passwordErr) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('UserLanding');
    } catch (error) {
      setPasswordError('Invalid email or password');
    }
  };

  // --- Forgot Password ---
  const handleForgotPassword = async () => {
    const emailErr = validateEmail(email);
    setEmailError(emailErr);
    setPasswordError('');
    setGoogleError('');
    if (emailErr) return;

    try {
      await sendPasswordResetEmail(auth, email);
      setEmailError('✅ Password reset email sent. Check your inbox.');
    } catch (error) {
      setEmailError(error.message);
    }
  };
const handleGoogleLogin = async () => {
  setGoogleError('');
  setIsLoading(true);

  try {
    const result = await handleGoogleSignIn();

    if (result.success) {
      navigation.replace('UserLanding');
    } else {
      setGoogleError(result.error || 'Google login failed.');
    }
  } catch (error) {
    setGoogleError(error.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
            <Text style={styles.logoText}>REV</Text>
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="example@email.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                const err = validateEmail(text);
                setEmailError(err);
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
                placeholder="********"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  const err = validatePassword(text);
                  setPasswordError(err);
                }}
                style={styles.input}
              />
              <TouchableOpacity
                style={{ position: 'absolute', right: 15, top: 14, zIndex: 10 }}
                onPress={() => setShowPassword((prev) => !prev)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Image
                  source={require('../assets/eye.png')}
                  style={{ width: 22, height: 22, tintColor: '#888' }}
                />
              </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorLabel}>{passwordError}</Text> : null}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgotContainer}
            onPress={() => {
              const emailErr = validateEmail(email);
              setEmailError(emailErr);
              setPasswordError('');
              setGoogleError('');

              if (!emailErr) {
                navigation.navigate('ResetPassword', { email });
              }
            }}
          >
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Email Login */}
          <TouchableOpacity style={styles.loginButton} onPress={handleEmailLogin}>
            <Text style={styles.loginText}>Log in with Email</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or sign in with</Text>

          {/* Google Login */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialCircle}
              onPress={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Image
                  source={require('../assets/google.png')}
                  style={styles.socialIcon}
                />
              )}
            </TouchableOpacity>
            {googleError ? <Text style={styles.errorLabel}>{googleError}</Text> : null}
          </View>

          {/* Sign Up */}
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>
              Don’t have an account? <Text style={styles.signupLink}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
