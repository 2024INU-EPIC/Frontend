import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Main from "./pages/MainPage";
import LoginPage from "./pages/SignPage";
import AuthLayout from "./layouts/AuthLayout";
import TestPage from "./pages/TestPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Main />
            </MainLayout>
          }
        />
        <Route
          path="/test"
          element={
            <MainLayout>
              <TestPage />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
