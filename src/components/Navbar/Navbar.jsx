import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/commerce.png';
import useStyles from './styles';


const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    // We use useLocation to hide the Cart-icon of the navbar when we are already in /cart
    const location = useLocation();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit" >
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                        Commerce.js
                    </Typography>
                    <div className={classes.grow} />
                    {/* If the location's pathname is equal to '/' (so, when we are home), only then we show the cart */}
                    {location.pathname === '/' && (
                        <div className={classes.button}>
                            <Link to="/cart">Go to cart</Link>
                            <IconButton component={Link} arial-label="Show Cart Items" color="inherit">
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>)}
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;
