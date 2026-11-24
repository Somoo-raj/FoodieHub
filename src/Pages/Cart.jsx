import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

function Cart() {
    const { cart, setCart } = useContext(CartContext);

    const handleRemove = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    return (
        <div className="cart-page">
            {cart.length === 0 ? (<h2>Your cart is empty</h2>) : (<h2>Your Cart</h2>)}

            {cart.map((food, index) => (
                <div key={food.id} className="cart-item">
                    <img src={food.image} alt={food.name} />
                    <h3>{food.name}</h3>
                    <p>₹ {food.price}</p>
                    <button onClick={() => handleRemove(index)}>Remove</button>
                </div>
            ))}
        </div>
    )
}

export default Cart;