import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart } from './components';

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async () => {
        try {
            const { data } = await commerce.products.list();
            setProducts(data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchCart = async () => {
        try {
            const response = await commerce.cart.retrieve();
            setCart(response);
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleAddToCart = async (productId, quantity) => {
        try {
            // cart.add comes from commerce.js
            const item = await commerce.cart.add(productId, quantity);
            setCart(item.cart);
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log("cart", cart);

    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
            <Cart cart={cart} />
        </div>
    )
}

export default App;
