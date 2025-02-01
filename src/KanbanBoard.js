import React from 'react';
import Column from './Column';
import CreateModel from "../models/CreateModel";

const KanbanBoard = ({ statuses, tasks, onMoveTask, onDeleteTask, onUpdateTask, onCreateTask }) => {
    return (
        <div className="container-fluid p-4">
            <h1 className="text-center mb-4">Kanban Board</h1>
            <CreateModel statuses={statuses}
                         onCreateTask={onCreateTask}
                         tasks={tasks} />
            <div className="row g-4">
                {statuses.map((status) => (
                    <Column
                        key={status.id}
                        status={status}
                        tasks={tasks}
                        statuses={statuses}
                        onMoveTask={onMoveTask}
                        onDeleteTask={onDeleteTask}
                        onUpdateTask={onUpdateTask}
                    />
                ))}
            </div>
        </div>
    );
};

export default KanbanBoard;