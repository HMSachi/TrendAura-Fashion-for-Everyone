"use client";
import React, { createContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x._id === existItem._id ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x._id !== action.payload),
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const initialState = {
        cartItems: [],
    };

    // Lazy initialization to access localStorage on client
    const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
        if (typeof window !== 'undefined') {
            const localData = localStorage.getItem('cartItems');
            return localData ? { cartItems: JSON.parse(localData) } : initial;
        }
        return initial;
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }, [state.cartItems]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
