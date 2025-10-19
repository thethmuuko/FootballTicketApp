import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { isLoginedIn } from "./service/AuthService";
import type { ReactElement } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import Matches from "./components/Matches";
import Booking from "./components/Booking";
import Checkout from "./components/Checkout";

export default function App() {
  const AuthRoute = ({ children }: { children: ReactElement }) =>
    !isLoginedIn() ? <Navigate to="/login" state={{ from: location.pathname }} replace /> : children;
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/matches" element={<Matches />} />
          <Route
            path="/matches/:matchId/:stadiumName/booking"
            element={
              <AuthRoute>
                <Booking />
              </AuthRoute>
            }
          />
          <Route
            path="/matches/checkout"
            element={
              <AuthRoute>
                <Checkout />
              </AuthRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
