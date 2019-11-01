import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { conversasUsuarioFetch } from './../actions/AppActions';

class Conversas extends Component {

    componentWillMount() {
        this.props.conversasUsuarioFetch();
    }

    componentWillReceiveProps(nextProps) {
        this.atualizaConversas(nextProps.conversas);
        console.log(nextProps.conversas)
    }

    atualizaConversas(item) {
        this.fonteDeDados = item;
    }

    renderItem(item) {
        return (
            <TouchableHighlight
                onPress={
                    () => Actions.conversa({ title: item.nome, contatoNome: item.nome, contatoEmail: item.email })
                }
            >
                <View style={ styles.divConversa }>
                    <Text style={ styles.txtConversa }> { item.nome } </Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={ styles.divContainer }>
                <FlatList 
                    data={ this.fonteDeDados }
                    keyExtractor={ item => item.uid }
                    renderItem={ ({item}) => this.renderItem(item) }
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    
    // Necessário pois o FlatList espera um Array para a fonte de Dados
    const conversas = _.map( state.ListaConversasReducer, (val, uid) => {
        return { ...val, uid };
    });
    
    return ({
        conversas
      });
}

export default connect(mapStateToProps, { conversasUsuarioFetch })(Conversas);

    
const styles = StyleSheet.create({
  divContainer: {
      flex: 1
  },
  divConversa: {
      flex: 1,
      padding: 20,
      height: 60,
      borderBottomWidth: 1,
      borderColor: '#ccc',
      justifyContent: 'center'
  },
  txtConversa: {
      fontSize: 25
  }
});