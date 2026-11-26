import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Orders.css";

function Orders() {
    const { orders } = useContext(CartContext);

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
                        <p>Phone : {order.customer.phone}</p>
                        <p>Delivery : {" "} {order.deliveryType === "delivery" ? "Home Delivery" : "Self Pickup"}</p>

                        {order.deliveryType === "delivery" && (
                            <p>Address : {order.customer.address}</p>
                        )}

                        {order.items.map((item) => (
                            <p key={item.id}>
                                {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                            </p>
                        ))}

                        <h3>Total : ₹ {order.total}</h3>
                        <Link to={`/order/${order.id}`}>
                            View Details
                        </Link>
                    </div>
                ))
            )
            }
        </div>
    )
}

export default Orders;