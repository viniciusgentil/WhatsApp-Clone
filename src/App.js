import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import Routes from './Routes';
import reducers from './reducers';


 class App extends Component {

    componentWillMount() {

        let firebaseConfig = {
            apiKey: "............",
            authDomain: "..........",
            databaseURL: "............",
            projectId: "...........",
            storageBucket: "............",
            messagingSenderId: "..........",
            appId: "............",
            measurementId: "........"
        };
          
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        /*try {
            firebase.initializeApp(firebaseConfig);
        }
        catch (err) {
            if (!/already exists/.test(err.message)) {
                console.error('Firebase initialization error', err.stack)
            }
        }*/

    }

    render() {
        return (
            <Provider store={ createStore( reducers, {}, applyMiddleware(ReduxThunk) ) } >
                <Routes />
            </Provider>
        );
    }
}

export default App;