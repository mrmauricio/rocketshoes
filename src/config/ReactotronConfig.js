import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

// essa var de ambiente é = development sempre que esteiver rodando no yarn
// start; quando é feito o build, é alterada
if (process.env.NODE_ENV === 'development') {
    const tron = Reactotron.configure()
        .use(reactotronRedux())
        .use(reactotronSaga())
        .connect();

    tron.clear();

    console.tron = tron;
}
