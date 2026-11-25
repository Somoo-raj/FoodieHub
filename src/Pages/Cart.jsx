import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
    const { cart, setCart } = useContext(CartContext);

    const handleRemove = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    const handleQuantityChange = (id, change) => {
        setCart((prevCart) => prevCart.map((item) => item.id === id ? { ...item, quantity: item.quantity + change } : item).filter((item) => item.quantity > 0));
    };

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    return (
        <div className="cart-page">
            {cart.length === 0 ? (<h2>Your cart is empty</h2>) : (<h2>Your Cart</h2>)}

            {cart.map((food, index) => (
                <div key={food.id} className="cart-item">
                    <img src={food.image} alt={food.name} />
                    <h3>{food.name}</h3>
                    <p>₹ {food.price}</p>

                    <div className="quantity-controls">
                        <button onClick={() => handleQuantityChange(food.id, -1)}>-</button>
                        <span>{food.quantity}</span>
                        <button onClick={() => handleQuantityChange(food.id, 1)}>+</button>
                    </div>

                    <button onClick={() => handleRemove(index)}>Remove</button>
                </div>
            ))}

            <div className="cart-total">
                <h2>Total: ₹ {totalPrice}</h2>
            </div>

        </div>
    )
}

export default Cart;