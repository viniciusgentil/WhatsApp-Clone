import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import base64 from 'react-native-base64';
import { MODIFICA_EMAIL, 
         MODIFICA_SENHA, 
         MODIFICA_NOME, 
         CADASTRO_USUARIO_SUCESSO,
         CADASTRO_USUARIO_ERRO,
         AUTENTICA_USUARIO_SUCESSO,
         AUTENTICA_USUARIO_ERRO,
         LOGIN_EM_ANDAMENTO,
         CADASTRO_EM_ANDAMENTO,
         FINALIZA_SESSAO } from './Types';

export const modificaEmail = (texto) => {
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: MODIFICA_NOME,
        payload: texto
    }
}

export const cadastraUsuario = ({ nome, email, senha }) => {

    return dispatch => {

        dispatch ( { type: CADASTRO_EM_ANDAMENTO } );

        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then( user => {

                let emailB64 = base64.encode(email); //Transforma email em BASE64 pois não é possível criar um nó com caracteres especiais
                //conversão p/ base64 não funcionou pois deu erro na instalação do pacote;
                firebase.database().ref(`contatos/${emailB64}`)
                    .push({ nome })
                    .then( value => cadastroUsuarioSucesso(dispatch) )

            } )
            .catch( erro => cadastroUsuarioErro(dispatch, erro) );
    }
}

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch ( { type: CADASTRO_USUARIO_SUCESSO } );

    Actions.boasVindas();
}

const cadastroUsuarioErro = (dispatch, erro) => {
    dispatch ( { type: CADASTRO_USUARIO_ERRO, payload: erro.message } );
}

export const autenticarUsuario = ( email, senha ) => {
    
    return dispatch => {

        dispatch ( { type: LOGIN_EM_ANDAMENTO } );

        firebase.auth().signInWithEmailAndPassword( email, senha )
        .then( value => autenticaUsuarioSucesso(dispatch) )
        .catch( erro => autenticaUsuarioErro(dispatch, erro) );
    }

}

const autenticaUsuarioSucesso = (dispatch) => {
    dispatch ( { type: AUTENTICA_USUARIO_SUCESSO } );

    Actions.principal();
}

const autenticaUsuarioErro = (dispatch, erro) => {
    dispatch ( { type: AUTENTICA_USUARIO_ERRO, payload: erro.message } );
}
