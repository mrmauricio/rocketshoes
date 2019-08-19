// as sagas são middlewares. é um passo a mais entre a action e o reducer
// sempre que for necessário fazer uma verificação assíncrona antes de al-
// terar um dado no redux store precisa de sagas. ex: verificar na API de
// estoque se os produtos estao disponíveis, tanto na home quanto no cart

// call é o método do redux-saga responsável por chamar funções assincronas
// que retornam promises
// put dispara uma action no redux
// select busca informaçoes dentro do state
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';
// o * em frente ao function é similar ao async, porém mais potente.
// é chamado no js de generator
function* addToCart({ id }) {
    const productExists = yield select(state =>
        state.cart.find(p => p.id === id)
    );

    // chama a api stock para verificar se o produto está disponível antes
    // de adicionar ao carrinho
    const stock = yield call(api.get, `/stock/${id}`);

    const stockAmount = stock.data.amount;
    const currentAmount = productExists ? productExists.amount : 0;

    const amount = currentAmount + 1;

    if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
    }

    if (productExists) {
        yield put(updateAmountSuccess(id, amount));
    } else {
        // o yield é como o await, faz com que aguarde a execução da linha
        // em vez de chamar diretamente api.get, com o call deve ser passado assim
        const response = yield call(api.get, `/products/${id}`);

        // adiciona campos à reposta que veio do comando acima que buscou na API
        const data = {
            ...response.data,
            amount: 1,
            priceFormatted: formatPrice(response.data.price),
        };

        // put é como se fosse o dispatch, dispara a action pro reducer ouvir
        yield put(addToCartSuccess(data));
    }
}

function* updateAmount({ id, amount }) {
    // impede de diminuir abaixo de 0
    if (amount <= 0) return;

    const stock = yield call(api.get, `stock/${id}`);
    const stockAmount = stock.data.amount;

    if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
    }

    yield put(updateAmountSuccess(id, amount));
}

// essa função exportada é um listener: ouve sempre que houver um click no
// botão que dispara a action do primeiro parâmetro, e então executa a função
// addToCart passada no segundo parâmetro (presente neste saga)
export default all([
    takeLatest('@cart/ADD_REQUEST', addToCart),
    takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
