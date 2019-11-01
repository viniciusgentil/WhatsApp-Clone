import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { modificaAdicionaContatoEmail, adicionaContato } from '../actions/AppActions';


class AdicionarContato extends Component {

    _adicionarContato() {
        
        const {email} = this.props;
        this.props.adicionaContato( email );

    }

    renderAdicionarContato() {
        if(!this.props.sucessoAdicionarContato) {

            return (
              <View style={{ flex: 1 }}>
      
                  <View style={ styles.divInput }>
                      <TextInput 
                          placeholder="E-mail" 
                          value={ this.props.email } 
                          style={ styles.inputForm } 
                          onChangeText={ texto => this.props.modificaAdicionaContatoEmail(texto) } 
                      />
                  </View>
          
                  <View style={ styles.divButton }>
                    <Button 
                      title="Adicionar" 
                      color="#115E54" 
                      onPress={ () => this._adicionarContato() } 
                    />
                    <Text style={ styles.txtErro}> { this.props.erroAdicionarContato } </Text>
                  </View>
                  
              </View>
            );

        } else {
            return (
                <View>
                    <Text style={{ fontSize: 20 }}>Cadastro Realizado com Sucesso</Text>
                </View>
            )
        }
    }

    render() {
        return (
          <View style={ styles.divContainer }>
              { this.renderAdicionarContato() }
          </View>
        );
    }

}

const mapStateToProps = state => (
    {
      email: state.AppReducer.email,
      erroAdicionarContato: state.AppReducer.erroAdicionarContato,
      sucessoAdicionarContato: state.AppReducer.sucessoAdicionarContato
    }
);


export default connect(mapStateToProps, { modificaAdicionaContatoEmail, adicionaContato })(AdicionarContato);


const styles = StyleSheet.create({
    divContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20
    },
    divInput: {
      flex: 1,
      justifyContent: 'center'
    },
    divButton: {
      flex: 1
    },
    txtErro: {
      color: '#ff0000',
      fontSize: 15,
      marginTop: 10
    },
    inputForm: {
      fontSize: 20,
      height: 45
    }
});