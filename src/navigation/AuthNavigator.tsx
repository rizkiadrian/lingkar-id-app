/**
 * AuthNavigator — stack navigator for authentication flow.
 *
 * Screens: Login (initial), Register, VerifyOtp, VerifyEmail.
 * Stacked screens show a native iOS back button for easy navigation.
 */

import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen, RegisterScreen, VerifyEmailScreen, VerifyOtpScreen } from '@/screens/auth';
import { colors } from '@/theme/colors';
import { fonts } from '@/theme/typography';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  VerifyOtp: undefined;
  VerifyEmail: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerBackTitle: '',
        headerTintColor: colors.primary[500],
        headerTitleStyle: {
          fontFamily: fonts.semiBold,
          fontSize: 17,
        },
        headerShadowVisible: false,
        headerTransparent: true,
        headerTitle: '',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} options={{ headerShown: true }} />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmailScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
