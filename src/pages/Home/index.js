import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';

export default function Home() {
    // state - Hook
    const [products, setProducts] = useState([]);
    // HOOKS - com os hooks, o valor do antigo mapStateToProps é transferido
    // pra cá, assim como a useSelector é usada no lugar da connect. este
    // pega o valor do state do redux e passa para a amount.
    // o reduce agrupa todos os valores em um objeto vazio
    // que foi inicializado no fim, sendo que a chave do item é o seu id e seu
    // valor é o amount em questão
    const amount = useSelector(state =>
        state.cart.reduce((sumAmount, product) => {
            sumAmount[product.id] = product.amount;

            return sumAmount;
        }, {})
    );

    const dispatch = useDispatch();

    // componentDidMount - Hook
    useEffect(() => {
        // para usar async dentro de hooks, é melhor declarar a função async
        // e em seguida chamá-la dentro da hook em questão
        async function loadProducts() {
            const response = await api.get('products');

            // edita o objeto retornado pela API, adicionando o campo priceFormatted
            // para não ter que chamar a função dentro do render, o que faria que
            // esta fosse executada varias vezes, sendo que é desnecessário.
            const data = response.data.map(product => ({
                ...product,
                priceFormatted: formatPrice(product.price),
            }));

            setProducts(data);
        }

        loadProducts();
    }, []);

    function handleAddProduct(id) {
        // todo componente que se conecta com o redux recebe nas props o
        // dispatch, que serve para disparar uma action ao redux
        // const { addToCartRequest } = this.props;

        // quando se executa o dispatch, todos os reducers são ativados
        dispatch(CartActions.addToCartRequest(id));
    }

    // lembrar de evitar chamar funções para formatação (ex. format preço)
    // no render, pois tratando isso antes evita que seja chamado toda vez

    return (
        <ProductList>
            {products.map(product => (
                <li key={product.id}>
                    <img src={product.image} alt={product.title} />
                    <strong>{product.title}</strong>
                    <span>{product.priceFormatted}</span>

                    <button
                        type="button"
                        onClick={() => handleAddProduct(product.id)}
                    >
                        <div>
                            <MdAddShoppingCart size={16} color="#fff" />{' '}
                            {amount[product.id] || 0
                            /* caso nao exista valor, inicializa por padrão com 0 */
                            }
                        </div>
                        <span>adicionar ao carrinho </span>
                    </button>
                </li>
            ))}
        </ProductList>
    );
}

// pega o state do redux. o reduce agrupa todos os valores em um objeto vazio
// que foi inicializado no fim, sendo que a chave do item é o seu id e seu
// valor é o amount em questão
// const mapStateToProps = state => ({
//    amount: state.cart.reduce((amount, product) => {
//        amount[product.id] = product.amount;
//
//        return amount;
//    }, {}),
// });

// pega as actions juntamente com o dispatch e passa como props ao componente
// const mapDispatchToProps = dispatch =>
//    bindActionCreators(CartActions, dispatch);

// conecta o componente Home com o estado do redux
// o primeiro parametro (null) é o mapStateToProps, e o segundo mapDispatchToProps
// export default connect(
//    null,
//    mapDispatchToProps
// )(Home);
