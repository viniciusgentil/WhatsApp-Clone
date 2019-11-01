import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableHighlight, Image } from 'react-native';
import { connect } from 'react-redux';
import { modificaMensagem, enviaMensagem, conversaUsuarioFetch } from '../actions/AppActions';
import _ from 'lodash';

class Conversa extends Component {

    componentWillMount() {
        this.props.conversaUsuarioFetch(this.props.contatoEmail);
    }

    componentWillReceiveProps(nextProps) {

        if(this.props.contatoEmail !== nextProps.contatoEmail) {
            this.props.conversaUsuarioFetch(nextProps.contatoEmail);
        }
        
        this.atualizaConversa(nextProps.conversa);
    }

    atualizaConversa(conversa) {
        this.fonteDeDados = conversa;
    }

    _enviaMensagem() {
        const {mensagem, contatoNome, contatoEmail} = this.props;
        this.props.enviaMensagem(mensagem, contatoNome, contatoEmail);
    }

    renderItem(texto) {

        if(texto.tipo === "e") {
            return (
                <View style={ styles.divEnviada }>
                    <Text style={ styles.txtEnviada }>{ texto.mensagem }</Text>
                </View>
            );
        }

        return (
            <View style={ styles.divRecebida }>
                <Text style={ styles.txtRecebida }>{ texto.mensagem }</Text>
            </View>
        );
        
    }

    render() {
        return (

            <View style={ styles.divContainer }>
                <View style={ styles.divMensagens }>
                    <FlatList
                    data={ this.fonteDeDados }
                    keyExtractor={ item => item.uid }
                    renderItem={ ({item}) => this.renderItem(item) }
                    />
                </View>
                <View style={ styles.divInput }>
                    <TextInput 
                        style={ styles.frmMensagem } 
                        value={ this.props.mensagem }
                        onChangeText={ msg => this.props.modificaMensagem(msg) }
                    />
                    <TouchableHighlight
                        onPress={ this._enviaMensagem.bind(this) }
                        underlayColor="#fff"
                    >
                        <Image source={ require('./../img/enviar_mensagem.png') } />
                    </TouchableHighlight>
                </View>
            </View>

        );
    }
}


const mapStateToProps = state => {
    
    const conversa = _.map(state.ListaConversaReducer, (val, uid) => {
        return { ...val, uid};
    });
    
    return ({
        conversa,
        mensagem: state.AppReducer.mensagem
    });
};

export default connect(mapStateToProps, { modificaMensagem, enviaMensagem, conversaUsuarioFetch })(Conversa);


const styles = StyleSheet.create({
    divContainer: {
        flex: 1,
        backgroundColor: '#eee4dc',
        padding: 10
    },
    divMensagens: {
        flex: 1,
        padding: 10
    },
    divInput: {
        flexDirection: 'row',
        height: 60
    },
    frmMensagem: {
        flex: 4,
        backgroundColor: '#fff',
        fontSize: 18
    },
    divEnviada: {
        alignItems: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 40
    },
    txtEnviada: {
        fontSize: 18,
        color: '#000',
        padding: 10,
        backgroundColor: '#dbf5b4',
        elevation: 1
    },
    divRecebida: {
        alignItems: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
        marginRight: 40
    },
    txtRecebida: {
        fontSize: 18,
        color: '#000',
        padding: 10,
        backgroundColor: '#f7f7f7',
        elevation: 1
    },
});