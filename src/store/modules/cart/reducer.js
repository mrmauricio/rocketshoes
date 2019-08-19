// reducer do cart

// lib para ajudar a fazer alterações nos estados imutáveis do redux
import produce from 'immer';
// o state é o state anterior do redux, enquanto o action é o valor que foi
// passado através do dispatch do componente
export default function cart(state = [], action) {
    switch (action.type) {
        case '@cart/ADD_SUCCESS':
            // o produce do immer permite que no draft (rascunho), sejam
            // feitas alterações, coisa que não poderia ocorrer direto no
            // state por causa da imutabilidade. state é o estado anterior
            // e draft é uma cópia deste que pode ser mutada e resultará
            // no próximo state
            return produce(state, draft => {
                // anteriormente as validações de quantidade ficavam aqui,
                // mas o conteúdo foi levado ao saga que intercepta a action
                // e este conteúdo vem na const product da action abaixo
                const { product } = action;

                draft.push(product);
            });
        case '@cart/REMOVE':
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id);

                if (productIndex >= 0) {
                    draft.splice(productIndex, 1);
                }
            });
        case '@cart/UPDATE_AMOUNT_SUCCESS': {
            return produce(state, draft => {
                const productIndex = draft.findIndex(p => p.id === action.id);

                if (productIndex >= 0) {
                    draft[productIndex].amount = Number(action.amount);
                }
            });
        }
        // caso não seja nenhum dos types em questão, mantem o state atual
        default:
            return state;
    }
}
