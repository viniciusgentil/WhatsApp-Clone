import { MODIFICA_EMAIL, 
    MODIFICA_SENHA, 
    MODIFICA_NOME, 
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    AUTENTICA_USUARIO_SUCESSO,
    AUTENTICA_USUARIO_ERRO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO } from '../actions/Types';

const INITIAL_STATE = {
    nome: '',
    email: 'vviniciuss@gmail.com',
    senha: 'a1a2a3',
    erroCadastro: '',
    erroAutenticacao: '',
    loadingLogin: false,
    loadingCadastro: false
}

export default (state = INITIAL_STATE, action) => {
    
    switch(action.type) {
        case MODIFICA_EMAIL:
            return { ...state, email: action.payload }
        case MODIFICA_SENHA:
            return { ...state, senha: action.payload }
        case MODIFICA_NOME:
            return { ...state, nome: action.payload }
        case CADASTRO_USUARIO_ERRO:
            return { ...state, erroCadastro: action.payload, loadingCadastro: false }
        case CADASTRO_USUARIO_SUCESSO:
            return { ...state, nome: '', senha: '', loadingCadastro: false}
        case AUTENTICA_USUARIO_ERRO:
            return { ...state, erroAutenticacao: action.payload, loadingLogin: false }
        case AUTENTICA_USUARIO_SUCESSO:
            return { ...state, ...INITIAL_STATE }
        case LOGIN_EM_ANDAMENTO:
            return { ...state, loadingLogin: true }
        case CADASTRO_EM_ANDAMENTO:
            return { ...state, loadingCadastro: true }
        default:
            return state;
    }

}