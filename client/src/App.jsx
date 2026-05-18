import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import LoadingHeader from "./components/LoadingHeader";
import AuthInitializer from "./components/AuthInitializer";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Notebook = lazy(() => import("./pages/Notebook"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProjectDocs = lazy(() => import("./pages/ProjectDocs"));
const ForgotPassword = lazy(
  () => import("./pages/forgot-password/ForgotPassword"),
);

const App = () => {
  return (
    <div className="select-none">
      <BrowserRouter>
        <Suspense fallback={<LoadingHeader />}>
          <Routes>
            <Route element={<AuthInitializer />}>
              <Route path="/" element={<LandingPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/notebook" element={<Notebook />} />
              </Route>
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/docs" element={<ProjectDocs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster position="top-right" richColors duration={2000} />
      </BrowserRouter>
    </div>
  );
};

export default App;
