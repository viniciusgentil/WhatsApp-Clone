import React from 'react';
import { View, Text, StatusBar, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { habilitaInclusaoContato } from '../actions/AppActions';
import firebase from 'firebase';

const TabBarMenu = props => (
    <View style={ styles.divContainer }>
        <StatusBar backgroundColor="#114D44" />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={ styles.divTitulo }>
                <Text style={ styles.txtTitulo }>WhatsApp Clone</Text>
            </View>

            <View style={ styles.divAcoes }>
                <View style={{ width: 50, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableHighlight 
                        underlayColor="#114D44" 
                        onPress={ () => { Actions.adicionarContato(); props.habilitaInclusaoContato(); } }
                    >
                        <Image source={ require('../img/adicionar-contato.png') } />
                    </TouchableHighlight>
                </View>

                <View style={{ justifyContent: 'center'}}>
                    <TouchableHighlight
                        onPress={ 
                            () => firebase.auth().signOut().then( () => Actions.formLogin() ) 
                        }
                    >
                        <Text style={{fontSize: 20, color: '#fff'}}>Sair</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
        
        <TabBar {...props}  style={ styles.divTabBar } />
    </View>
);

export default connect(null, {habilitaInclusaoContato})(TabBarMenu);


const styles = StyleSheet.create({
    divContainer: {
        backgroundColor: '#115E54',
        elevation: 4,
        marginBottom: 6
    },
    divAcoes: {
        flexDirection: 'row',
        marginRight: 30
    },
    divTitulo: {
       height: 50,
       justifyContent: 'center'
   },
   txtTitulo: {
       color: '#fff',
       fontSize: 20,
       marginLeft: 20
   },
   divTabBar: {
       backgroundColor: '#115E54',
       elevation: 0
   }
});