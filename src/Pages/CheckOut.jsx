import React from "react";
import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./CheckOut.css";

function Checkout() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
    });

    const [submittedData, setSubmittedData] = useState(null);

    const [isEditing, setIsEditing] = useState(false);

    const { cart, setCart, setOrders } = useContext(CartContext);

    const [deliveryType, setDeliveryType] = useState("delivery");

    const [orderPlaced, setOrderPlaced] = useState(false);

    const totalPrice = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const handlePlaceOrder = () => {
        setOrders((prevOrders) => [
            ...prevOrders, {
                id: Date.now(),
                customer: submittedData,
                deliveryType: deliveryType,
                items: cart,
                total: totalPrice,
                date: new Date().toLocaleString(),
            },
        ]);

        setOrderPlaced(true);
        setCart([]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || (deliveryType === "delivery" && !formData.address)) {
            alert("Please fill all required fields");
            return;
        }

        setSubmittedData(formData);

        console.log(formData);

        setFormData({
            name: "",
            phone: "",
            address: "",
        });

    }

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>

            <div className="delivery-options">
                <h2>Choose Delivery Option</h2>

                <label>
                    <input
                        type="radio"
                        name="delivery"
                        value="delivery"
                        checked={deliveryType === "delivery"}
                        onChange={(e) => setDeliveryType(e.target.value)}
                    />
                    Home Delivery
                </label>

                <label>
                    <input
                        type="radio"
                        name="delivery"
                        value="pickup"
                        checked={deliveryType === "pickup"}
                        onChange={(e) => setDeliveryType(e.target.value)}
                    />
                    Self Pickup
                </label>

            </div>

            <form className="checkout-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={formData.name}
                    placeholder="Enter your name"
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    type="tel"
                    value={formData.phone}
                    placeholder="Enter mobile number"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                {deliveryType === "delivery" && (
                    <textarea
                        type="text"
                        placeholder="Enter delivery address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                )}

                <button type="submit">Continue</button>
            </form>

            {submittedData && (
                <div className="customer-details">
                    <h2>Customer Details</h2>
                    {isEditing ? (
                        <>
                            <input
                                value={submittedData.name}
                                onChange={(e) => setSubmittedData({ ...submittedData, name: e.target.value })}
                            />

                            <input
                                value={submittedData.phone}
                                onChange={(e) => setSubmittedData({ ...submittedData, phone: e.target.value })}
                            />

                            <textarea
                                value={submittedData.address}
                                onChange={(e) => setSubmittedData({ ...submittedData, address: e.target.value })}
                            />
                        </>
                    ) : (
                        <>
                            <p>Name : {submittedData.name}</p>
                            <p>Phone : {submittedData.phone}</p>
                            {deliveryType === "delivery" && (
                                <p>Address : {submittedData.address}</p>
                            )}
                        </>
                    )}

                    {isEditing ? (
                        <button onClick={() => setIsEditing(false)}>Save Changes</button>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>Edit Details</button>
                    )}
                </div>
            )}

            {submittedData && !orderPlaced && (
                <div className="order-summary">
                    <h2>Order Summary</h2>

                    {cart.map((item) => (
                        <div className="summary-item" key={item.id}>
                            <img src={item.image} alt={item.name} />

                            <div className="summary-info">
                                <h3>{item.name}</h3>
                                <p>₹ {item.price} x {item.quantity}</p>
                                <p>Subtotal : ₹ {item.price * item.quantity}</p>
                            </div>
                        </div>
                    ))}

                    <h3 className="summary-total">Total : ₹ {totalPrice}</h3>
                    <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order</button>
                </div>
            )}

            {orderPlaced && (
                <div className="order-success">
                    <h2>🎉 Order Placed Successfully!</h2>
                    <p>Thank you for ordering with FoodieHub.</p>
                </div>
            )}
        </div>
    )
}

export default Checkout;