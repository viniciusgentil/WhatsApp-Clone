import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import base64 from 'react-native-base64';
import _ from 'lodash';

import { 
    MODIFICA_ADICIONA_CONTATO_EMAIL, 
    ADICIONA_CONTATO_EM_ANDAMENTO,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MENSAGEM,
    LISTA_CONVERSA_USUARIO,
    LIMPA_MENSAGEM, 
    LISTA_CONVERSAS_USUARIO} from '../actions/Types';


    export const modificaAdicionaContatoEmail = texto => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: texto
    }
}

export const adicionaContato = email => {
    
    return dispatch => {

        dispatch ( { type: ADICIONA_CONTATO_EM_ANDAMENTO } );
        
        let emailB64 = base64.encode(email);
        
        // Verifica se o email informado está cadastrado
        firebase.database().ref(`/contatos/${emailB64}`) 
            .once('value')
            .then( snapshot => {
                if(snapshot.val()) {

                    // Busca dados do usuário a adicionar nos contatos, utilizando a 
                    // biblioteca Lodash para transformar o objeto em array,
                    // para então ter acesso aos dados retornados pelo firebase 
                    // (a key do registro do firebase é criptografada e não temos essa informação) 
                    const dadosUsuario = _.first(_.values(snapshot.val()));

                    // Busca o email do usuário autenticado
                    const { currentUser } = firebase.auth();
                    let emailUsuarioB64 = base64.encode(currentUser.email);

                    firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
                        .push({ nome: dadosUsuario.nome, email })
                        .then( value => adicionaContatoSucesso(dispatch, snapshot) )
                        .catch( erro => adicionaContatoErro(dispatch, erro) )
                    
                } else {
                    dispatch ( { 
                        type: ADICIONA_CONTATO_ERRO, 
                        payload: 'E-mail não corresponde a um usuário válido!' 
                    });
                }
            })
            .catch( erro => adicionaContatoErro(dispatch, erro) );
        
    }
    
}

export const adicionaContatoSucesso = (dispatch, snapshot) => {
    dispatch ( { type: ADICIONA_CONTATO_SUCESSO, payload: true } );
}

export const adicionaContatoErro = (dispatch, erro) => {
    dispatch ( { type: ADICIONA_CONTATO_ERRO, payload: erro.message } );
}

export const habilitaInclusaoContato = () => (
    {
        type: ADICIONA_CONTATO_SUCESSO,
        payload: false
    }
)

export const contatosUsuarioFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let emailUsuarioB64 = base64.encode(currentUser.email);

        firebase.database().ref(`/usuario_contatos/${emailUsuarioB64}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CONTATO_USUARIO, payload: snapshot.val() })
            })
    }
}

export const modificaMensagem = mensagem => {
    return ({
        type: MODIFICA_MENSAGEM,
        payload: mensagem
    })
}

export const enviaMensagem = (mensagem, contatoNome, contatoEmail) => {

    return dispatch => {

        // Converte o email do destinatário para base64
        let contatoEmailB64 = base64.encode(contatoEmail);

        // Converte o email do usuário autenticado para base 64
        const { currentUser } = firebase.auth();
        let usuarioEmailB64 = base64.encode(currentUser.email);

        // Insere a mensagem para o usuário autenticado
        // Tipo 'e': enviado - Tipo 'r': recebido
        firebase.database().ref(`/mensagens/${usuarioEmailB64}/${contatoEmailB64}`)
            .push({ mensagem, tipo: 'e' })
            .then( () => {

                // Insere a mensagem para o destinatário
                firebase.database().ref(`/mensagens/${contatoEmailB64}/${usuarioEmailB64}`)
                    .push({ mensagem, tipo: 'r' })
                    .then( () => dispatch ({ type: LIMPA_MENSAGEM}) )
            })
            .then( () => {

                // Atualiza a conversaCabecalho do usuário autenticado com o destinatário
                firebase.database().ref(`/usuario_conversas/${usuarioEmailB64}/${contatoEmailB64}`)
                    .set({ nome: contatoNome, email: contatoEmail})
                    .then( () => {

                        // Busca o nome do usuário autenticado
                        firebase.database().ref(`/contatos/${usuarioEmailB64}`) 
                            .once('value')
                            .then( snapshot => {
                                const dadosUsuario = _.first(_.values(snapshot.val()));

                                // Atualiza a conversaCabecalho do destinatário com o usuário autenticado
                                firebase.database().ref(`/usuario_conversas/${contatoEmailB64}/${usuarioEmailB64}`)
                                    .set({ nome: dadosUsuario.nome, email: currentUser.email})
                            })

                    })
            })

    }

}

export const conversaUsuarioFetch = contatoEmail => {

    const { currentUser } = firebase.auth();

    let emailUsuarioB64 = base64.encode( currentUser.email );
    let emailContatoB64 = base64.encode( contatoEmail );
    
    return dispatch => {

        firebase.database().ref(`/mensagens/${emailUsuarioB64}/${emailContatoB64}`)
            .on("value", snapshot => {
                
                dispatch ({
                    type: LISTA_CONVERSA_USUARIO,
                    payload: snapshot.val()
                })
            })

    }

}

export const conversasUsuarioFetch = () => {

    const { currentUser } = firebase.auth();

    let emailUsuarioB64 = base64.encode( currentUser.email );
    
    return dispatch => {
        firebase.database().ref(`/usuario_conversas/${emailUsuarioB64}`)
            .on("value", snapshot => {
                
                dispatch ({
                    type: LISTA_CONVERSAS_USUARIO,
                    payload: snapshot.val()
                })
            })
    }

}