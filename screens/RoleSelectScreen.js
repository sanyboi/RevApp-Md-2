import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function RoleSelectScreen({ navigation }) {
  return (
    <LinearGradient colors={['#1C2433', '#1C2433']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo2.png')} style={styles.logo} />
        <Text style={styles.appName}>REV</Text>
      </View>

      <Text style={styles.title}>Continue as</Text>

      <View style={styles.rolesRow}>
        <TouchableOpacity style={styles.roleButton} onPress={() => navigation.navigate('Login')}>
          <Image source={require('../assets/user.png')} style={styles.roleIcon} />
          <Text style={styles.roleText}>User</Text>
        </TouchableOpacity>
        <View style={{ width: 20 }} />
        <TouchableOpacity style={styles.roleButton} onPress={() => navigation.navigate('MechanicLogin')}>
          <Image source={require('../assets/mechanic.png')} style={styles.roleIcon} />
          <Text style={styles.roleText}>Mechanic</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 120,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10,
  paddingTop: 70,
  },
  logo: {
    width: 90,
    height: 90,
    marginRight: 10,
  },
  appName: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 30,
  },
  rolesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  roleButton: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 140,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#888',
  },
  roleIcon: {
    width: 60,
    height: 60,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  roleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
