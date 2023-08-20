import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/Sign-up/SignUp";
import Userhome from "./components/UserHome/Userhome";
import Products from "./components/Products/Products";
import { AuthProvider } from "./components/Context/AuthContext";

// style import
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/user-dash/:id" element={<Userhome />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
