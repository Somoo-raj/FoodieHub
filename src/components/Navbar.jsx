import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { NavLink } from "react-router-dom"
import "./Navbar.css";

function Navbar() {
    const { cart } = useContext(CartContext);

    return (
        <nav className="nav">
            <h2 className="nav-brand">FoodieHub</h2>
            {/* Navbar Content */}
            <div className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/menu">Menu</NavLink>
                <NavLink to="/cart" className={({ isActive }) => isActive ? "active cart-link" : "cart-link"}>🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})</NavLink>
                <NavLink to="/orders">Orders</NavLink>
                <NavLink to="/admin">Admin</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;