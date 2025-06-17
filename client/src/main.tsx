import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Signin from "./pages/Signin.tsx";
import Signup from "./pages/Signup.tsx";
import Header from "./components/Header.tsx";
import User from "./pages/User.tsx";
import Account from "./pages/Account.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/user/:id" element={<User />} />
        <Route path="/account/:id" element={<Account />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);
