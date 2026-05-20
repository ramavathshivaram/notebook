import React, { Suspense, lazy, useEffect } from "react";

import { Route, Routes } from "react-router-dom";

import LoadingHeader from "./components/common/LoadingHeader";

import AuthInitializer from "./components/common/AuthInitializer";

import ProtectedRoute from "./components/common/ProtectedRoute";

import RootLayout from "@/components/layout/RootLayout";

const LandingPage = lazy(() => import("./pages/LandingPage"));

const Login = lazy(() => import("./pages/Login"));

const Register = lazy(() => import("./pages/Register"));

const NoteEditor = lazy(() => import("./components/pages/NoteEditor"));

const CanvasEditor = lazy(() => import("./components/canvas/CanvasEditor"));

const NotFound = lazy(() => import("./pages/NotFound"));

const ProjectDocs = lazy(() => import("./pages/ProjectDocs"));

const EmptyState = lazy(() => import("./components/common/EmptyState"));

const ForgotPassword = lazy(
  () => import("./pages/forgot-password/ForgotPassword"),
);

const App = () => {
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";

    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  return (
    <div className="select-none">
      <Suspense fallback={<LoadingHeader />}>
        <Routes>
          <Route element={<AuthInitializer />}>
            <Route path="/" element={<LandingPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/notebook" element={<RootLayout />}>
                <Route index element={<EmptyState />} />

                <Route path="page/:pageId" element={<NoteEditor />} />

                <Route path="canvas/:canvasId" element={<CanvasEditor />} />
              </Route>
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
