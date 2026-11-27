import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Admin.css";

function Admin() {
    const { orders, setOrders } = useContext(CartContext);

    return (
        <div className="admin-page">
            <h1>Admin Dashboard</h1>
            <h2>Manage Orders</h2>
            {orders.length === 0 ? (
                <p>No orders available.</p>
            ) : (
                orders.map((order) => (
                    <div className="admin-order-card" key={order.id}>
                        <h3>Order #{order.id}</h3>
                        <p>Date : {order.date}</p>
                        <p>Customer : {order.customer.name}</p>
                        <p>Phone : {order.customer.phone}</p>
                        <p>Total : ₹ {order.total}</p>
                        <p>Status : {order.status || "{Placed"}</p>

                        {order.status === "Cancelled" ? (
                            <p>Order Cancelled</p>
                        ) : (
                            <select value={order.status || "Placed"} onChange={(e) => {
                                const newStatus = e.target.value;

                                setOrders((prevOrders) => prevOrders.map((item) => item.id === order.id ? { ...item, status: newStatus } : item));
                            }}>
                                <option value="Placed">Placed</option>
                                <option value="Preparing">Preparing</option>
                                <option value="Ready">Ready</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}

export default Admin;