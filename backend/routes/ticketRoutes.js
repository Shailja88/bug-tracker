import express from 'express';
import {
  createTicket,
  getTicketsByProject,
  updateTicket,
  deleteTicket
} from '../controllers/ticketController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createTicket);
router.get('/:projectId', protect, getTicketsByProject);
router.put('/:id', protect, updateTicket);
router.delete('/:id', protect, deleteTicket);

export default router;
