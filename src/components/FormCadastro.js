import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, modificaNome, cadastraUsuario } from '../actions/AutenticacaoActions';


class formCadastro extends Component {

    _cadastraUsuario() {

        const { nome, email, senha } = this.props;
        
        this.props.cadastraUsuario({ nome, email, senha});
    }

    renderBtnCadastro() {

        if(this.props.loadingCadastro)
        {
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button 
                style={ styles.botaoConfirmar } 
                title="Cadastrar" 
                color='#115E54' 
                onPress={() => this._cadastraUsuario() } 
            />
        );
    }

    render() {
        return (
            <ImageBackground style={ styles.fundoCadastro } source={require('../img/bg.png')} >
                <View style={ styles.formCadastro }>
                    <View style={ styles.divFormCadastro }>
                        <TextInput value={this.props.nome} style={ styles.inputForm } placeholder='Nome' placeholderTextColor='#fff' onChangeText={texto => this.props.modificaNome(texto)} />
                        <TextInput value={this.props.email} style={ styles.inputForm } placeholder='E-mail' placeholderTextColor='#fff' onChangeText={texto => this.props.modificaEmail(texto)} />
                        <TextInput secureTextEntry value={this.props.senha} style={ styles.inputForm } placeholder='Senha' placeholderTextColor='#fff' onChangeText={texto => this.props.modificaSenha(texto)} />
                        <Text style={ styles.txtRetornoCadastro }> {this.props.erroCadastro} </Text>
                    </View>
                    <View style={ styles.divBotao }>
                        { this.renderBtnCadastro() }
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = state => (
    {
        nome: state.AutenticacaoReducer.nome,
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroCadastro: state.AutenticacaoReducer.erroCadastro,
        loadingCadastro: state.AutenticacaoReducer.loadingCadastro
    }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha, modificaNome, cadastraUsuario })(formCadastro);


const styles = StyleSheet.create({
    fundoCadastro: {
        flex: 1,
        width: null
    },
    formCadastro: {
        flex: 1,
        padding: 10
    },
    divFormCadastro: {
        flex: 4,
        justifyContent: 'center',
    },
    inputForm: {
        height: 45,
        fontSize: 20
    },
    txtRetornoCadastro: {
        color: '#ff0000',
        fontSize: 18
    },
    divBotao: {
        flex: 1
    },
    botaoConfirmar: {
        
    }
});