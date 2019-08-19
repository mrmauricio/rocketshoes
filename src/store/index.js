// conectando componentes ao redux:
// ao conectar o index.js da Home page, o método dispatch ficou disponível.
// este dispara actions q executa todos os reducers, então checa qual tem o
// type igual ao da action para enfim executar. então, após o state do redux
// store ser alterado pelo reducer, todos os outros componentes que estão
// conectados com o redux e necessitam do state que foi alterado são rende-
// rizados novamente, atualizando a informação em todos os lugares da app.

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
    process.env.NODE_ENV === 'development'
        ? console.tron.createSagaMonitor()
        : null;

const sagaMiddleware = createSagaMiddleware({
    sagaMonitor,
});

const enhancer =
    process.env.NODE_ENV === 'development'
        ? compose(
              console.tron.createEnhancer(),
              applyMiddleware(sagaMiddleware)
          )
        : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
