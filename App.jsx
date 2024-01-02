
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppState } from 'react-native';
import { Home } from './home';
import { Chat } from './chat';
import { SignIn } from './signIn';
import { SignUp } from './signup';
import { Profile } from './profile'
import { Account } from './Account';
import { checkstatus } from './checkstatus';
import { Setting } from './Setting';
import { Netwok } from './netwok';
import { Preload } from './preload';
import { Quote } from './Quote';
import { WebSite } from './developer';
import { Status } from './status';
import { Storage } from './storage';
const Stack = createNativeStackNavigator();

const App = ({ navigation }) => {
  checkstatus();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Preload' screenOptions={{
        headerShown: false,
        title: 'Chat App By React Native',
        headerStyle: {
          backgroundColor: '#2a9d8f',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: "white",
          textAlign: 'center'
        },
        headerTintColor: '#f4a261',
      }}>
        <Stack.Screen name="sign Up" component={SignUp} options={{
          animation: 'slide_from_right',
          config: {
            duration: 500,
          },
        }} />
        <Stack.Screen name="Preload" component={Preload} options={{
          animation: 'slide_from_right',
          config: {
            duration: 500,
          },
        }} />
        <Stack.Screen name="Sign In" component={SignIn} options={{
          animation: 'slide_from_right',
          config: {
            duration: 500,
          },
        }} />
        <Stack.Screen name="Home" component={Home} options={{
          animation: 'slide_from_right',
          config: {
            duration: 500,
          },
        }} />
        <Stack.Screen name="Chat" component={Chat} options={{
          animation: 'slide_from_right',
          config: {
            duration: 500,
          },
        }} />
        <Stack.Screen name="Profile" component={Profile} options={{
          animation: 'slide_from_right',
          config: {
            duration: 500,
          },
        }} />
        <Stack.Screen name="Account" component={Account} options={{
          animation: 'slide_from_right',
          config: {
            duration: 500,
          },
        }} />
        <Stack.Screen name="Setting" component={Setting} options={{
          animation: 'slide_from_right',
          config: {
            duration: 500,
          },
        }} />
        <Stack.Screen name="Network" component={Netwok} options={{
          animation: 'slide_from_right',
          config: {
            duration: 500,
          },
        }} />
        <Stack.Screen name="Quote" component={Quote} options={{
          animation: 'slide_from_right',
          config: {
            duration: 500,
          },
        }} />
        <Stack.Screen name="WebSite" component={WebSite} options={{
          animation: 'slide_from_right',
          config: {
            duration: 500,
          },
        }} />
        <Stack.Screen name="Status" component={Status} options={{
          animation: 'slide_from_right',
          config: {
            duration: 500,
          },
        }} />
        <Stack.Screen name="Storage" component={Storage} options={{
          animation: 'slide_from_right',
          config: {
            duration: 500,
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
export default App;