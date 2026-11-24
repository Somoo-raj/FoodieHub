import { useContext } from "react";

import { CartContext } from "../context/CartContext";
import "./FoodCard.css";

function FoodCard({ food }) {
    const { cart, setCart } = useContext(CartContext);

    const handleAddToCart = () => {
        setCart((prevCart) => [...prevCart, food]);
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