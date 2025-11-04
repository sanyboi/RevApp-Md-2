import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './LoginStyles'; // reuse styles or create new styles

export default function MechanicInstructionScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient colors={['#1C2433', '#1C2433']} style={styles.container}>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image
              source={require('../assets/back.png')}
              style={{ width: 24, height: 24, tintColor: '#fff' }}
            />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={[styles.title, { marginTop: 20, textAlign: 'center', color: '#ff4b2b' , fontSize: 24}]}>
          How to Register as a Mechanic
        </Text>

        {/* Instructions */}
        <View style={{ padding: 20 }}>
          <Text style={{ color: '#fff', fontSize: 16, marginBottom: 15 }}>
            1. Make sure you have a valid email account to register.
          </Text>
          <Text style={{ color: '#fff', fontSize: 16, marginBottom: 15 }}>
            2. Fill out the mechanic application form provided by REV.
          </Text>
          <Text style={{ color: '#fff', fontSize: 16, marginBottom: 15 }}>
            3. Upload required documents like your mechanic license, ID, and certifications.
          </Text>
          <Text style={{ color: '#fff', fontSize: 16, marginBottom: 15 }}>
            4. Wait for our team to verify your information and approve your account.
          </Text>
          <Text style={{ color: '#fff', fontSize: 16, marginBottom: 15 }}>
            5. Once approved, you will receive a confirmation email and can log in as a mechanic.
          </Text>
        </View>

        {/* Optional: Contact Support */}
        <View style={{ padding: 20 }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>
            For any issues during registration, please contact our support team at{' '}
            <Text style={{ color: '#4da6ff' }}>support@rev.com</Text>.
          </Text>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
