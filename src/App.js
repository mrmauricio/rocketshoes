import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// deixa o store (estado global) disponivel para todos os componentes
import { Provider } from 'react-redux';
// para exibir mensagens ao usuário
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import Header from './components/Header';
import Routes from './routes';

import store from './store';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header />
                <Routes />
                <GlobalStyle />
                <ToastContainer autoClose={3000} />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
