import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// import all the pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

// protected guard
import ProtectedGuard from "./guard/ProtectedGuard";
import { DocsPage } from "./pages/Docs";

import Sticky from "./components/Sticky/Sticky";

function App() {
  const path = window.location.pathname.split("/")[1];

  console.log(path);
  return (
    <>
      <Toaster />
      {path === "docs" ? null : <Sticky />}
      <BrowserRouter>
        <Routes>
          {/* protected route  */}
          <Route
            path="/dashboard"
            element={
              <ProtectedGuard>
                <Dashboard />
              </ProtectedGuard>
            }
          />

          {/* open routes  */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/docs" element={<DocsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
