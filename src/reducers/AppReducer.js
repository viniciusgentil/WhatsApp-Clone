import { 
    MODIFICA_ADICIONA_CONTATO_EMAIL,
    ADICIONA_CONTATO_EM_ANDAMENTO,
    ADICIONA_CONTATO_ERRO,
    ADICIONA_CONTATO_SUCESSO,
    LISTA_CONTATO_USUARIO,
    MODIFICA_MENSAGEM,
    ENVIA_MENSAGEM,
    LIMPA_MENSAGEM } from '../actions/Types';

const INITIAL_STATE = {
    email: '',
    loadingAdicionarContato: false,
    erroAdicionarContato: '',
    sucessoAdicionarContato: false,
    mensagem: ''
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type) {
        case MODIFICA_ADICIONA_CONTATO_EMAIL:
            return { ...state, email: action.payload };
        case ADICIONA_CONTATO_EM_ANDAMENTO:
            return { ...state, loadingAdicionarContato: true };
        case ADICIONA_CONTATO_ERRO:
            return { ...state, erroAdicionarContato: action.payload, loadingAdicionarContato: false };
        case ADICIONA_CONTATO_SUCESSO:
            return { ...state, email: '', sucessoAdicionarContato: action.payload, erroAdicionarContato: '', loadingAdicionarContato: false };
        case LISTA_CONTATO_USUARIO:
            return { ...state };
        case MODIFICA_MENSAGEM:
                return { ...state, mensagem: action.payload };
        case ENVIA_MENSAGEM:
            return { ...state, mensagem: '' };
        case LIMPA_MENSAGEM:
            return { ...state, mensagem: '' };
        default:
            return state;
    }
    
}