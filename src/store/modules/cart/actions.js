// action ouvida pelo saga
export function addToCartRequest(id) {
    return {
        type: '@cart/ADD_REQUEST',
        id,
    };
}

// action ouvida pelo reducer
export function addToCartSuccess(product) {
    return {
        type: '@cart/ADD_SUCCESS',
        product,
    };
}

export function removeFromCart(id) {
    return {
        type: '@cart/REMOVE',
        id,
    };
}

// quando utiliza saga, dividir actions em duas para facilitar o log
export function updateAmountRequest(id, amount) {
    return {
        type: '@cart/UPDATE_AMOUNT_REQUEST',
        id,
        amount,
    };
}

export function updateAmountSuccess(id, amount) {
    return {
        type: '@cart/UPDATE_AMOUNT_SUCCESS',
        id,
        amount,
    };
}
