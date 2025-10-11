import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/auth";
import Notebook from "./pages/Notebook";
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LandingPage />}></Route>
        <Route path="/notebook" element={<Notebook />} />
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
