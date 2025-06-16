// === src/pages/TicketsPage.js ===
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import Sidebar from '../components/Sidebar';

function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await API.get(`/tickets`);
        setTickets(res.data);
      } catch (err) {
        console.error('Error fetching tickets:', err);
      }
    };
    fetchTickets();
  }, [projectId]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">All Tickets</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tickets.map((ticket) => (
            <Link
              key={ticket._id}
              to={`/tickets/${ticket._id}`}
              className="border p-4 rounded shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">{ticket.title}</h3>
              <p className="text-gray-600">{ticket.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TicketsPage;
