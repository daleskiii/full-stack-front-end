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
import { AuthProvider, useAuth } from "./components/Context/AuthContext";
import { CartProvider } from "./components/Context/CartContext";

// style import
import "./App.css";

function App() {
  const { isLoggedIn, userId } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Nav />

        {isLoggedIn && userId ? (
          <Routes>
            <Route path="/user-dash/:id" element={<Userhome />} />

            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />

            <Route
              path="/user-dash/:id"
              element={
                <CartProvider>
                  <Userhome />
                </CartProvider>
              }
            />
            <Route
              path="/products"
              element={
                <CartProvider>
                  <Products />
                </CartProvider>
              }
            />
            <Route
              path="/products/:id"
              element={
                <CartProvider>
                  <ProductView />
                </CartProvider>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <CartProvider>
                  <Edit />
                </CartProvider>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <CartProvider>
                  <Orders />
                </CartProvider>
              }
            />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />

            <Route
              path="/user-dash/:id"
              element={
                <CartProvider>
                  <Userhome />
                </CartProvider>
              }
            />
            <Route
              path="/products"
              element={
                <CartProvider>
                  <Products />
                </CartProvider>
              }
            />
            <Route
              path="/products/:id"
              element={
                <CartProvider>
                  <ProductView />
                </CartProvider>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <CartProvider>
                  <Edit />
                </CartProvider>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <CartProvider>
                  <Orders />
                </CartProvider>
              }
            />
          </Routes>
        )}
      </Router>
    </AuthProvider>
  );
}

export default App;
