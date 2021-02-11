import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
            const { cart } = await commerce.cart.add(productId, quantity);
            setCart(cart);
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        // We put quantity inside an object because it's only one of the things we want to update
        const { cart } = await commerce.cart.update(productId, { quantity });

        setCart(cart);
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);

        setCart(cart);
    }

    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.emtpy();

        setCart(cart);
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log("cart", cart);

    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart} />
                    </Route>
                    <Route exact path="/cart">
                        <Cart
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Route>
                    <Route exact path="/checkout">
                        <Checkout cart={cart} />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;
