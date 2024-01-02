import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export function WebSite({ route, navigation }) {

    return (

        <WebView
        
            source={{ uri: 'https://thamoddya.cloud' }}
            style={{
                marginTop: 20,
                width: '100%',
                height: '100%',
                backgroundColor: '#1d3557'
            }}
            androidLayerType="none"
            scalesPageToFit={true}
        />

    )
};
