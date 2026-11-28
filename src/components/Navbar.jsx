import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { NavLink } from "react-router-dom"
import "./Navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { cart } = useContext(CartContext);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    function closeMenu() {
        setMenuOpen(false);
    }


    return (
        <nav className="nav">
            <h2 className="nav-brand">FoodieHub</h2>
            <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "x" : "☰"}</button>
            {/* Navbar Content */}
            <div className={`nav-links ${menuOpen ? "show" : ""}`}>
                <NavLink to="/" onClick={closeMenu}>Home</NavLink>
                <NavLink to="/menu" onClick={closeMenu}>Menu</NavLink>
                <NavLink to="/cart" className={({ isActive }) => isActive ? "active cart-link" : "cart-link"} onClick={closeMenu}>🛒 Cart ({cartCount})</NavLink>
                <NavLink to="/orders" onClick={closeMenu}>Orders</NavLink>
                <NavLink to="/admin" onClick={closeMenu}>Admin</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;