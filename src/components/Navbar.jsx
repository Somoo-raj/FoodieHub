import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { NavLink } from "react-router-dom"
import "./Navbar.css";

function Navbar() {
    const { cart } = useContext(CartContext);

    return (
        <nav className="nav">
            {/* Navbar Content */}
            <NavLink to="/">Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/cart">🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})</NavLink>
            <NavLink to="/orders">Orders</NavLink>
        </nav>
    )
}

export default Navbar;