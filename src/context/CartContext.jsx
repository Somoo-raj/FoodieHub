import { createContext, useState, useEffect } from "react";
export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState(() => {
        const saveOrders = localStorage.getItem("orders");

        return saveOrders ? JSON.parse(saveOrders) : [];
    });

    const [menuFoods, setMenuFoods] = useState(() => {
        const savedFoods = localStorage.getItem("menuFoods");
        return savedFoods ? JSON.parse(savedFoods) : [];
    });

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
        localStorage.setItem("menuFoods", JSON.stringify(menuFoods));
    }, [menuFoods]);

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                orders,
                setOrders,
                menuFoods,
                setMenuFoods,
            }}>{children}</CartContext.Provider>
    )
}