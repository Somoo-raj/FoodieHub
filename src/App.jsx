import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import Orders from "./Pages/Orders";
import Checkout from "./Pages/CheckOut";
import OrderDetails from "./Pages/OrderDetails";
import Admin from "./Pages/Admin";
import MenuManagenent from "./Pages/MenuManagenent";

function App() {

  return (
    <>
      <Navbar />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/menumanagement" element={<MenuManagenent />} />
      </Routes>
    </>
  )
}

export default App;