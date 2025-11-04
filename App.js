import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import RoleSelectScreen from './screens/RoleSelectScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MechanicLoginScreen from './screens/MechanicLoginScreen';
import UserLandingScreen from './screens/UserLandingScreen';
import MechanicLandingScreen from './screens/MechanicLandingScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import MechanicInstructionScreen from './screens/MechanicInstructionScreen';  
import ResetPasswordScreenMech from './screens/Resetpasswordscreenmech';




const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="MechanicLogin" component={MechanicLoginScreen} />
        <Stack.Screen name="MechanicRegister" component={MechanicInstructionScreen} />
        <Stack.Screen name="ResetPassMech" component={ResetPasswordScreenMech} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="UserLanding" component={UserLandingScreen} />
        <Stack.Screen name="MechanicLanding" component={MechanicLandingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
