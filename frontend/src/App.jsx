import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Notebook from "./pages/Notebook";
import NotFound from "./pages/NotFound";
import ProjectDocs from "./pages/ProjectDocs";
import ForgotPassword from "./pages/ForgotPassword";
import { Toaster } from "sonner";
import VerifyOTP from "./pages/VerifyOTP";

const App = () => {
  return (
    <div className="select-none">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/notebook" element={<Notebook />} />
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/docs" element={<ProjectDocs />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/forgot-password/:userId"
            element={<VerifyOTP />}
          ></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-right" richColors duration={2000} />
      </BrowserRouter>
    </div>
  );
};

export default App;
