
// === src/components/ProjectList.js ===
import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await API.get('/projects');
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {projects.map((proj) => (
        <Link
          key={proj._id}
          to={`/projects/${proj._id}`}
          className="border p-4 rounded shadow hover:shadow-md"
        >
          <h3 className="text-lg font-semibold">{proj.name}</h3>
          <p className="text-gray-600">{proj.description}</p>
        </Link>
      ))}
    </div>
  );
}

export default ProjectList;