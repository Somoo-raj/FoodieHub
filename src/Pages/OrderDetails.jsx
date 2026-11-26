import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./OrderDetails.css";

function OrderDetails() {
    const { id } = useParams();
    const { orders } = useContext(CartContext);

    const order = orders.find((item) => item.id === Number(id));

    if (!order) {
        return <h2>Order not found!</h2>
    }

    return (
        <div className="order-details">
            <h1>Order Details</h1>

            <h2>Order #{order.id}</h2>
            <p>Date : {order.date}</p>

            <h3>Customer Details</h3>
            <p>Name : {order.customer.name}</p>
            <p>Phone : {order.customer.phone}</p>
            <p>Delivery : {order.deliveryType === "delivery" ? "Home Delivery" : "Self Pickup"}</p>

            {order.deliveryType === "delivery" && (
                <p>Address : {order.customer.address}</p>
            )}

            <h3>Order Items</h3>

            {order.items.map((item) => (
                <div key={item.id}>
                    <p> {item.name} x {item.quantity}</p>
                    <p>₹ {item.price * item.quantity}</p>
                </div>
            ))}

            <h2>Total : ₹ {order.total}</h2>
        </div >
    )
}

export default OrderDetails;