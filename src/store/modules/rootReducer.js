// arquivo para combinar todos os reducers existentes
import { combineReducers } from 'redux';

import cart from './cart/reducer';

export default combineReducers({
    cart,
});
