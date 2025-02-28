import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Main from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/SignPage";
import AuthLayout from "./layouts/AuthLayout";
import VocaPage from "./pages/VocaPage";
import TestPage from "./pages/TestPage";
import PartSelectPage from "./pages/PartSelectPage";
import OnboardingPage from "./pages/OnboardingPage";
import Part2Page from "./pages/Part2Page";

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
          path="/part2"
          element={
            <MainLayout>
              <Part2Page />
            </MainLayout>
          }
        />
        <Route
          path="/mypage"
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
        <Route
          path="/partselect"
          element={
            <MainLayout>
              <PartSelectPage />
            </MainLayout>
          }
        />
        <Route
          path="/voca"
          element={
            <MainLayout>
              <VocaPage />
            </MainLayout>
          }
        />
        <Route
          path="/onboarding"
          element={
            <MainLayout>
              <OnboardingPage />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
