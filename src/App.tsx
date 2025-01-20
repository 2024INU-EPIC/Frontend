import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Main from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;
