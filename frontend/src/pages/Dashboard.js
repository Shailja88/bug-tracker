// === src/pages/Dashboard.js ===
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import API from '../api/axios';
import Sidebar from '../components/Sidebar';

const columnsFromBackend = {
  'todo': {
    name: 'To Do',
    items: [],
  },
  'inprogress': {
    name: 'In Progress',
    items: [],
  },
  'done': {
    name: 'Done',
    items: [],
  },
};

function Dashboard() {
  const [columns, setColumns] = useState(columnsFromBackend);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await API.get('/tickets');
        const tickets = res.data;

        const newColumns = {
          todo: { name: 'To Do', items: [] },
          inprogress: { name: 'In Progress', items: [] },
          done: { name: 'Done', items: [] },
        };

        tickets.forEach((ticket) => {
          const status = ticket.status.toLowerCase().replace(' ', '');
          if (newColumns[status]) {
            newColumns[status].items.push(ticket);
          }
        });

        setColumns(newColumns);
      } catch (err) {
        console.error('Error fetching tickets:', err);
      }
    };

    fetchTickets();
  }, []);

  const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newItems = Array.from(startColumn.items);
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...startColumn,
          items: newItems,
        },
      });
    } else {
      const startItems = Array.from(startColumn.items);
      const [removed] = startItems.splice(source.index, 1);
      const finishItems = Array.from(finishColumn.items);
      finishItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...startColumn,
          items: startItems,
        },
        [destination.droppableId]: {
          ...finishColumn,
          items: finishItems,
        },
      });

      // Update status on backend
      try {
        await API.put(`/tickets/${removed._id}`, {
          ...removed,
          status: finishColumn.name,
        });
      } catch (err) {
        console.error('Error updating ticket status:', err);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Kanban Board</h1>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          <div className="flex space-x-6">
            {Object.entries(columns).map(([columnId, column], index) => (
              <div key={columnId} className="bg-gray-100 rounded p-4 w-80 flex flex-col">
                <h2 className="text-xl font-semibold mb-4">{column.name}</h2>
                <Droppable droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex flex-col space-y-3 min-h-[200px] ${
                        snapshot.isDraggingOver ? 'bg-blue-100' : ''
                      } rounded p-2`}
                    >
                      {column.items.map((item, index) => (
                        <Draggable key={item._id} draggableId={item._id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white p-4 rounded shadow cursor-pointer ${
                                snapshot.isDragging ? 'bg-blue-200' : ''
                              }`}
                            >
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-gray-600 text-sm truncate">{item.description}</p>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Dashboard;
