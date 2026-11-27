import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Orders.css";

function Orders() {
    const { orders, setCart } = useContext(CartContext);

    const handleReorder = (order) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];

            order.items.forEach((item) => {
                const existingFood = updatedCart.find((food) => food.id === item.id);

                if (existingFood) {
                    existingFood.quantity += 1;
                } else {
                    updatedCart.push({ ...item, quantity: 1 });
                }
            });
            return updatedCart;
        });
    };

    return (
        <div className="orders-page">
            <h1>My Orders</h1>

            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                orders.map((order) => (
                    <div className="order-card" key={order.id}>
                        <h2>Order #{order.id}</h2>

                        <p>Date : {order.date}</p>
                        <p>Name : {order.customer.name}</p>
                        <p>Delivery : {" "} {order.deliveryType === "delivery" ? "Home Delivery" : "Self Pickup"}</p>

                        <h3>Total : ₹ {order.total}</h3>
                        <p>Status : {order.status || "Placed"}</p>
                        <Link to={`/order/${order.id}`}>
                            View Details
                        </Link>
                        {order.status === "Cancelled" && (
                            <button className="reorder-btn" onClick={() => handleReorder(order)}>Order Again</button>
                        )}
                    </div>
                ))
            )
            }
        </div>
    )
}

export default Orders;