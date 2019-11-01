import React from 'react';
import { View, Text, Button, Image, StyleSheet, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default props => (

    <ImageBackground style={ styles.fundo } source={require('../img/bg.png')} >
        <View style={ styles.divPrincipal }>
            <View style={ styles.divTopo }>
                <Text style={ styles.txtPrincipal }>Seja Bem-Vindo</Text>
                <Image source={require('../img/logo.png')} />
            </View>
            <View  style={ styles.divRodape }>
                <Button title="Fazer Login" onPress={ () => Actions.formLogin() } />
            </View>
        </View>
    </ImageBackground>
);

const styles = StyleSheet.create({
    fundo: {
        flex: 1,
        width: null
    },
    divPrincipal: {
        flex: 1,
        padding: 15
    },
    divTopo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtPrincipal: {
        fontSize: 20,
        color: '#fff'
    },
    divRodape: {
        flex: 1
    }
})