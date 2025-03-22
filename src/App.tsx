import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Main from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/SignPage";
import AuthLayout from "./layouts/AuthLayout";
import VocaPage from "./pages/VocaPage";
import PartSelectPage from "./pages/PartSelectPage";
import OnboardingPage from "./pages/OnboardingPage";
import Part1Page from "./pages/Part1Page";
import Part2Page from "./pages/Part2Page";
import Part3Page from "./pages/Part3Page";
import Part4Page from "./pages/Part4Page";
import Part5Page from "./pages/Part5Page";
import TestResultPage from "./pages/TestResult";
import TempPart1Page from "./pages/TempPart1Page";

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
          path="/temppart1"
          element={
            <MainLayout>
              <TempPart1Page part={1} />
            </MainLayout>
          }
        />
        <Route
          path="/part1"
          element={
            <MainLayout>
              <Part1Page />
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
          path="/part3"
          element={
            <MainLayout>
              <Part3Page />
            </MainLayout>
          }
        />
        <Route
          path="/part4"
          element={
            <MainLayout>
              <Part4Page />
            </MainLayout>
          }
        />
        <Route
          path="/part5"
          element={
            <MainLayout>
              <Part5Page />
            </MainLayout>
          }
        />
        <Route
          path="/testresult"
          element={
            <MainLayout>
              <TestResultPage />
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
