import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./styles/style.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";


function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "20px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "20px" }}>Home</Link>
        <Link to="/product"  style={{ marginRight: "20px" }}>Product</Link>
        <Link to="/cart">cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

 