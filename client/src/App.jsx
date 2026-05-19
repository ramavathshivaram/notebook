import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingHeader from "./components/common/LoadingHeader";
import AuthInitializer from "./components/common/AuthInitializer";
import ProtectedRoute from "./components/common/ProtectedRoute";

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
    </div>
  );
};

export default App;
