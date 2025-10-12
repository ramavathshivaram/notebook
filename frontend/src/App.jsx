import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/auth";
import Notebook from "./pages/Notebook";
import NotFound from './pages/NotFound'
import ProjectDocs from "./pages/ProjectDocs";
import { Toaster } from "sonner";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/notebook" element={<Notebook />} />
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/docs" element={<ProjectDocs />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" richColors duration={4000} />
    </BrowserRouter>
  );
};

export default App;
