import Ticket from '../models/Ticket.js';

export const createTicket = async (req, res) => {
  const ticket = await Ticket.create(req.body);
  res.status(201).json(ticket);
};

export const getTicketsByProject = async (req, res) => {
  const tickets = await Ticket.find({ projectId: req.params.projectId })
    .populate('assignee', 'name')
    .sort({ createdAt: -1 });
  res.json(tickets);
};

export const updateTicket = async (req, res) => {
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ticket);
};

export const deleteTicket = async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.json({ message: 'Ticket deleted' });
};
