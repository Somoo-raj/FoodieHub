import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./OrderDetails.css";

function OrderDetails() {
    const { id } = useParams();
    const { orders, setOrders } = useContext(CartContext);
    const navigate = useNavigate();

    const order = orders.find((item) => item.id === Number(id));

    const statusSteps = ["Placed", "Preparing", "Ready", "Delivered"];

    const currentStep = statusSteps.indexOf(order.status || "Placed");


    if (!order) {
        return <h2>Order not found!</h2>
    }

    const handleCancelOrder = () => {
        const confirmCancel = window.confirm("Are you sure you want to cancel this order?");

        if (!confirmCancel) return;

        setOrders((prevOrders) => prevOrders.map((item) => item.id === Number(id) ? { ...item, status: "Cancelled" } : item));
        navigate("/orders");
    };

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

            <div className="order-tracking">
                <h3>Track Your Order</h3>

                {order.status === "Cancelled" ? (
                    <p>Order Canelled</p>
                ) : (
                    <div className="tracking-steps">
                        {statusSteps.map((step, index) => (
                            <div key={step} className={index <= currentStep ? "step active" : "step"}>
                                <span>{index + 1}</span>
                                <p>{step}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {order.status !== "Cancelled" && (
                <button className="cancel-order-btn" onClick={handleCancelOrder}>Cancel Order</button>
            )}

            {order.status === "Cancelled" && (
                <p> This order has been cancelled.</p>
            )}
        </div >
    )
}

export default OrderDetails;