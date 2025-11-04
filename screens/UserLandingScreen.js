import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebaseConfig';

export default function UserLandingScreen({ navigation }) {
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.replace('RoleSelect');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <LinearGradient colors={['#1C2433', '#1C2433']} style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome, User
      </Text>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  signOutButton: {
    backgroundColor: '#ff4b2b',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
  },
  signOutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});