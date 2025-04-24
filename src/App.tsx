import React from 'react';
import TerminalHome from './pages/TerminalHome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProjectsPage from './pages/ProjectsPage';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  return (
    <BrowserRouter  future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<TerminalHome />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
