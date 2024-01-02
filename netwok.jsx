import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-svg'
import NetInfo from "@react-native-community/netinfo";


export function Netwok({ route, navigation }) {
    NetInfo.fetch().then(state => {
        console.log("Is connected?", state.isConnected);
        if (state.isConnected) {
            navigation.navigate('Home') 
        }
      });
    return (
        <SafeAreaView>
            <Text>Please Enable Your Connection</Text>
        </SafeAreaView>
    )
};
