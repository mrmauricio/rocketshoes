// utils = métodos que serão usados em varias partes da app

// intl nativo do JS, retorna varios métodos. então com a destructuring
// pegaremos apenas o format e renomearemos para formatPrice
export const { format: formatPrice } = new Intl.NumberFormat('pr-BR', {
    style: 'currency',
    currency: 'BRL',
});
