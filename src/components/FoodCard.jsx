import { useContext } from "react";

import { CartContext } from "../context/CartContext";
import "./FoodCard.css";

function FoodCard({ food }) {
    const { setCart } = useContext(CartContext);

    const handleAddToCart = () => {
        setCart((prevCart) => {
            const existingFood = prevCart.find((item) => item.id === food.id);

            if (existingFood) {
                return prevCart.map((item) => item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item);
            }

            return [...prevCart, { ...food, quantity: 1 }];
        });
    };

    return (
        <div className="food-card">
            <img src={food.image} alt={food.name} />
            <h3>{food.name}</h3>
            <p>₹ {food.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    )
}

export default FoodCard;