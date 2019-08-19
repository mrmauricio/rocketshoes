import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

export default function Header() {
    // HOOKS - com os hooks, não é preciso mais utilizar o connect do redux,
    // já que agora a useSelector já recupera o valor que vem do state para
    // a variável cartSize
    const cartSize = useSelector(state => state.cart.length);

    return (
        <Container>
            <Link to="/">
                <img src={logo} alt="Rocketshoes" />
            </Link>

            <Cart to="/cart">
                <div>
                    <strong>Meu carrinho</strong>
                    <span>{cartSize} itens</span>
                </div>
                <MdShoppingBasket size={36} color="FFF" />
            </Cart>
        </Container>
    );
}

// ao conectar com o redux, o primeiro parâmetro é as informações que
// o componente deve acessar que estão guardadas no redux store, no caso
// o state do cart.
// quando o state do redux altera, um componente que está conectado com este
// também é renderizado novamente
// export default connect(state => ({
//    cartSize: state.cart.length
// }))(Header);
