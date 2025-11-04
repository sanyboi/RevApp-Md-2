import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebaseConfig';
import styles from './LoginStyles';

export default function ResetPasswordScreen({ navigation, route }) {
  const { email } = route.params; // optional, pre-fill email
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const handleReset = async () => {
    setError('');
    setSuccess('');

    const newErr = validatePassword(newPassword);
    const confirmErr = validatePassword(confirmPassword);

    if (newErr) return setError(newErr);
    if (confirmErr) return setError(confirmErr);
    if (newPassword !== confirmPassword) return setError('Passwords do not match');

    try {
      if (auth.currentUser) {
        await auth.currentUser.updatePassword(newPassword);
        setSuccess('✅ Password updated successfully');
        setTimeout(() => navigation.navigate('Login'), 2000);
      } else {
        setError('You must click the link from your email to reset your password');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={['#1C2433', '#1C2433']} style={styles.container}>

         {/* Back Button */}
                <View style={styles.backButtonContainer}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Image
                      source={require('../assets/back.png')}
                      style={{ width: 24, height: 24, tintColor: '#fff' }}
                    />
                  </TouchableOpacity>
                </View>
        {/* New Password */}
        <Text style={styles.label}>New Password</Text>
        <TextInput
          placeholder="New Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
          style={[styles.input, { marginTop: 10 }]} // added marginTop
        />

        {/* Confirm Password */}
        <Text style={[styles.label, { marginTop: 20 }]}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={[styles.input, { marginTop: 10 }]} // added marginTop
        />

        {/* Error/Success messages */}
        {error ? <Text style={styles.errorLabel}>{error}</Text> : null}
        {success ? <Text style={[styles.errorLabel, { color: 'green' }]}>{success}</Text> : null}

        <TouchableOpacity style={[styles.loginButton, { marginTop: 30 }]} onPress={handleReset}>
          <Text style={styles.loginText}>Reset Password</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}
