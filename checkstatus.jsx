import React, { useState} from 'react'
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './response';

export const checkstatus = () => {

    const [id, setId] = useState("");

    async function m() {
        let userDataJSOn = await AsyncStorage.getItem('user');
        if(userDataJSOn != null) {
            let UserData = JSON.parse(userDataJSOn);
            setId(UserData.id);
        }
    };
    m();

    const handleAppStateChange = (appState) => {
        if (appState == "active") {

            let request = new XMLHttpRequest();
            var form = new FormData();
            form.append('id', id);
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    console.log(request.responseText);
                }
            };
            request.open('POST', `http://${res[0]}/react_chat/set1.php`, true);
            request.send(form);

        } else {
            let request = new XMLHttpRequest();
            var form = new FormData();
            form.append('id', id);
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    console.log(request.responseText);
                }
            };
            request.open('POST', `http://${res[0]}/react_chat/set0.php`, true);
            request.send(form);

        }
    };
    AppState.addEventListener('change', handleAppStateChange);
};