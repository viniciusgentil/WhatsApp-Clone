import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { contatosUsuarioFetch } from '../actions/AppActions';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

class Contatos extends Component {

    constructor(props) {
        super(props);

        /*const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.state = {fonteDeDados: ds.cloneWithRows([
            'Registro 1', 
            'Registro 2', 
            'Registro 3', 
            'Registro 4'
        ])};*/

        
    }

    componentWillMount() {
        this.props.contatosUsuarioFetch();
        this.criaFonteDeDados( this.props.contatos );
    }

    componentWillReceiveProps(nextProps) {
        this.criaFonteDeDados( nextProps.contatos );
    }

    criaFonteDeDados( contatos ) {
        this.fonteDeDados = contatos;
    }

    renderItem(contato) {
        return (

            <TouchableHighlight
                onPress={ () => Actions.conversa({ title: contato.nome, contatoNome: contato.nome, contatoEmail: contato.email }) }
            >
                <View style={ styles.itemContato }>
                    <Text style={ styles.itemNome }>{ contato.nome }</Text>
                    <Text style={ styles.itemEmail }>{ contato.email }</Text>
                </View>
            </TouchableHighlight>

        );
    }

    render() {
        return (
            <FlatList
                data={ this.fonteDeDados }
                keyExtractor={ item => item.uid }
                renderItem={ ({item}) => this.renderItem(item) }
            />
        );
    }
}

mapStateToProps = state => {
    // Convertendo objeto em array para posterior utilização no data source
    const contatos = _.map(state.ListaContatosReducer, (val, uid) => {
        return { ...val, uid}
    })

    return { contatos }
}

export default connect(mapStateToProps, { contatosUsuarioFetch })(Contatos);


const styles = StyleSheet.create({
    itemContato: {
        flex: 1,
        padding: 20,
        borderBottomWidth: 1,
        borderColor: '#ccc'
    },
    itemNome: {
        fontSize: 25
    },
    itemEmail: {
        fontSize: 18
    }
});