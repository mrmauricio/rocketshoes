// esse arquivo, assim como o rootReducer, server para juntar todos os sagas
// o all server para juntar vários sagas
import { all } from 'redux-saga/effects';

import cart from './cart/sagas';

export default function* rootSaga() {
    return yield all([cart]);
}
