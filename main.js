
fetch("./products.json")
    .then(response => response.json())
    .then(data => {
        products = data;
        cargarProductos(products);
    })

const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items');
let allProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

btnCart.addEventListener('click', () => containerCartProducts.classList.toggle('hidden-cart'));

productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;
        const title = product.querySelector('h2').textContent;
        const price = product.querySelector('p').textContent;

        const existingProduct = allProducts.find(product => product.title === title);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            allProducts.push({ title, price, quantity: 1 });
        }
        showHTML();
    }
});

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;
        allProducts = allProducts.filter(product => product.title !== title);
        showHTML();
    }
});

const showHTML = () => {
    const isEmpty = allProducts.length === 0;

    cartEmpty.classList.toggle('hidden', !isEmpty);
    rowProduct.classList.toggle('hidden', isEmpty);
    cartTotal.classList.toggle('hidden', isEmpty);

    rowProduct.innerHTML = '';
        Toastify({
            text: "Modificaste tu compra, haz click en la bolsa",
            duration: 2000
            }).showToast();

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        `;

        rowProduct.append(containerProduct);
    });

    const total = allProducts.reduce((acc, product) => acc + (product.quantity * parseFloat(product.price.slice(1))), 0);
    const totalOfProducts = allProducts.reduce((acc, product) => acc + product.quantity, 0);

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;

    localStorage.setItem('cartProducts', JSON.stringify(allProducts));

};

showHTML();
