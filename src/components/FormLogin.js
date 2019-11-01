import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableHighlight, ImageBackground, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';

class formLogin extends Component {

    _autenticarUsuario() {

        const { email, senha } = this.props;

        this.props.autenticarUsuario( email, senha );

    }

    renderBtnAcessar() {

        if(this.props.loadingLogin) {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button 
                style={ styles.botaoConfirmar } 
                title="Acessar" 
                color='#115E54' 
                onPress={() => this._autenticarUsuario() } 
            />
        )
    }


    render() {
        return (
            <ImageBackground style={ styles.fundoLogin } source={require('../img/bg.png')} >
                <View style={ styles.formLogin }>
    
                    <View style={ styles.divTopo }>
                        <Text style={ styles.tituloTopo }>WhatsApp Clone</Text>
                    </View>
    
                    <View style={ styles.divFormLogin }>
                        <TextInput 
                            value={this.props.email} 
                            style={ styles.inputForm } 
                            placeholder='E-mail' 
                            placeholderTextColor='#fff' 
                            onChangeText={ texto => this.props.modificaEmail(texto) } 
                        />
                        <TextInput 
                            secureTextEntry 
                            value={this.props.senha} 
                            style={ styles.inputForm } 
                            placeholder='Senha' 
                            placeholderTextColor='#fff' 
                            onChangeText={ texto => this.props.modificaSenha(texto) } 
                        />
                        <Text style={ styles.txtErroLogin }> { this.props.erroAutenticacao } </Text>
                        <TouchableHighlight onPress={() => { Actions.formCadastro(); }}>
                            <Text style={ styles.linkNovo } >Ainda não tem cadastro? Cadastre-se</Text>
                        </TouchableHighlight>
                    </View>
    
                    <View style={ styles.divBotao }>
                        { this.renderBtnAcessar() }
                    </View>
    
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroAutenticacao: state.AutenticacaoReducer.erroAutenticacao,
        loadingLogin: state.AutenticacaoReducer.loadingLogin
    }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin);


const styles = StyleSheet.create({
    fundoLogin: {
        flex: 1,
        width: null
    },
    formLogin: {
        flex: 1,
        padding: 10
    },
    divTopo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tituloTopo: {
        fontSize: 25,
        color:'#fff'
    },
    divFormLogin: {
        flex: 2
    },
    inputForm: {
        height: 45,
        fontSize: 20
    },
    linkNovo: {
        fontSize: 20,
        color:'#fff'
    },
    txtErroLogin: {
        color: '#ff0000',
        fontSize: 18
    },
    divBotao: {
        flex: 2
    },
    botaoConfirmar: {
        
    }
});