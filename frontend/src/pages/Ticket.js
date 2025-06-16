// === src/pages/Ticket.js ===
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';

function Ticket() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      const res = await API.get(`/tickets/${id}`);
      setTicket(res.data);
    };
    fetchTicket();
  }, [id]);

  if (!ticket) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{ticket.title}</h2>
      <p className="text-gray-700 mb-4">{ticket.description}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
      <p><strong>Priority:</strong> {ticket.priority}</p>
    </div>
  );
}

export default Ticket;
