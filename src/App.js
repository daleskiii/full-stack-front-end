import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/Sign-up/SignUp";
import Userhome from "./components/UserHome/Userhome";
import Products from "./components/Products/Products";
import Edit from "./components/Edit/Edit";
import Orders from "./components/Oders/Orders";
import ProductView from "./components/Products/ProductView";
import { AuthProvider } from "./components/Context/AuthContext";
import { CartProvider } from "./components/Context/CartContext";

// style import
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Nav />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />

            <Route path="/user-dash/:id" element={<Userhome />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductView />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/orders/:id" element={<Orders />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
