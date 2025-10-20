import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

// Lazy load pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Auth = lazy(() => import("./pages/Auth"));
const Notebook = lazy(() => import("./pages/Notebook"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProjectDocs = lazy(() => import("./pages/ProjectDocs"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const VerifyOTP = lazy(() => import("./pages/VerifyOTP"));

const App = () => {
  return (
    <div className="select-none">
      <BrowserRouter>
        <Suspense fallback={<div className="text-center py-20" />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/notebook" element={<Notebook />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/docs" element={<ProjectDocs />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/forgot-password/:userId" element={<VerifyOTP />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster position="top-right" richColors duration={2000} />
      </BrowserRouter>
    </div>
  );
};

export default App;
