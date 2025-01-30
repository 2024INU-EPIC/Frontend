import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Main from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/SignPage";
import AuthLayout from "./layouts/AuthLayout";

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
          path="MyPage"
          element={
            <MainLayout>
              <MyPage />
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
