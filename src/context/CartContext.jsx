import { createContext, useState, useEffect } from "react";
export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState(() => {
        const saveOrders = localStorage.getItem("orders");

        return saveOrders ? JSON.parse(saveOrders) : [];
    });

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    return (
        <CartContext.Provider value={{ cart, setCart, orders, setOrders }}>{children}</CartContext.Provider>
    )
}