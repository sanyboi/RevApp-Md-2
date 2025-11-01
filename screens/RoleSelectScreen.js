import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RoleSelectScreen({ navigation }) {
  return (
    <LinearGradient colors={['#0e0e0e', '#1a1a1a']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/rev-logo.png')} style={styles.logo} />
        <Text style={styles.appName}>REV</Text>
      </View>

      <Text style={styles.title}>Continue as</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login', { role: 'user' })}
      >
        <Text style={styles.buttonText}>User</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('Login', { role: 'mechanic' })}
      >
        <Text style={styles.buttonText}>Mechanic</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  appName: {
    color: '#ff4b2b',
    fontSize: 28,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ff4b2b',
    width: '70%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: '#2a2a2a',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
