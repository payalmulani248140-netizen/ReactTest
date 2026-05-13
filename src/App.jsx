import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./styles/style.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Collections from "./pages/Collections";
import CollectionDetail from "./pages/CollectionDetail";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "20px", background: "#eee" }}>
        <Link to="/" style={{ marginRight: "20px" }}>Home</Link>
        <Link to="/product"  style={{ marginRight: "20px" }}>Product</Link>
        <Link to="/collections"  style={{ marginRight: "20px" }}>Collections</Link>
        <Link to="/cart">cart</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/collections"  element={<Collections />} />
        <Route path="/collection/:handle" element={<CollectionDetail />}/>
        <Route path="/product/:handle" element={<ProductDetail />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

 