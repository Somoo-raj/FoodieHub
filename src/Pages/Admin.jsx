import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Admin.css";

function Admin() {
    const { orders, setOrders } = useContext(CartContext);

    const totalOrders = orders.filter((order) => order.status !== "Cancelled").length;
    const placedOrders = orders.filter((order) => order.status === "Placed").length;
    const preparingOrders = orders.filter((order) => order.status === "Preparing").length;
    const deliveredOrders = orders.filter((order) => order.status === "Delivered").length;
    const cancelledOrders = orders.filter((order) => order.status === "Cancelled").length;
    const totalRevenue = orders.filter((order) => order.status === "Delivered")
        .reduce((total, order) => total + order.total, 0);

    const recentOrders = [...orders]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);

    return (
        <div className="admin-page">
            <h1>Admin Dashboard</h1>

            <div className="admin-summary">
                <div className="summary-card">
                    <h3>Total Orders</h3>
                    <h2>{totalOrders}</h2>
                </div>
                <div className="summary-card">
                    <h3>Placed</h3>
                    <h2>{placedOrders}</h2>
                </div>
                <div className="summary-card">
                    <h3>Preparing</h3>
                    <h2>{preparingOrders}</h2>
                </div>
                <div className="summary-card">
                    <h3>Delivered</h3>
                    <h2>{deliveredOrders}</h2>
                </div>
                <div className="summary-card">
                    <h3>Cancel Orders</h3>
                    <h2>{cancelledOrders}</h2>
                </div>
                <div className="summary-card">
                    <h3>Total Revenue</h3>
                    <h2>{totalRevenue}</h2>
                </div>
            </div>

            <div className="recent-orders">
                <h2>Recent Orders</h2>

                {recentOrders.length === 0 ? (
                    <p>No recent orders.</p>
                ) : (
                    recentOrders.map((order) => (
                        <div className="recent-order-card" key={order.id}>
                            <p>Order #{order.id}</p>
                            <p>Date : {order.date}</p>
                            <p>Customer : {order.customer.name}</p>
                            <p>Total : ₹ {order.total}</p>
                            <p>Status : {order.status}</p>
                        </div>
                    ))
                )}
            </div>

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