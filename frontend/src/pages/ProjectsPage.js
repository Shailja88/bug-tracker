// === src/pages/ProjectsPage.js ===
import React from 'react';
import Sidebar from '../components/Sidebar';
import ProjectList from '../components/ProjectList';

function ProjectsPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">All Projects</h1>
        <ProjectList />
      </main>
    </div>
  );
}

export default ProjectsPage;