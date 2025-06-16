// === src/pages/Project.js ===
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      const res = await API.get(`/projects/${id}`);
      setProject(res.data);
    };
    const fetchTickets = async () => {
      const res = await API.get('/tickets');
      setTickets(res.data.filter((t) => t.projectId === id));
    };
    fetchProject();
    fetchTickets();
  }, [id]);

  if (!project) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
      <p className="mb-6 text-gray-700">{project.description}</p>
      <h3 className="text-xl font-semibold mb-2">Tickets</h3>
      <ul className="space-y-2">
        {tickets.map((ticket) => (
          <li
            key={ticket._id}
            className="border p-3 rounded shadow hover:shadow-md"
          >
            <a href={`/tickets/${ticket._id}`}>{ticket.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Project;
