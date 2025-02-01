import React from 'react';
import TaskCard from './TaskCard';

const Column = ({ status, tasks, statuses, onMoveTask, onDeleteTask, onUpdateTask}) => {
    const columnTasks = tasks.filter((task) => task.status === status.title);

    return (
        <div className="col">
            <div className="card h-100">
                <div className="card-header bg-light">
                    <h5 className="card-title mb-0">{status.title}</h5>
                    <small className="text-muted">{columnTasks.length} tasks</small>
                </div>
                <div className="card-body">
                    {columnTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            statuses={statuses}
                            onMoveTask={onMoveTask}
                            onDeleteTask={onDeleteTask}
                            onUpdateTask={onUpdateTask}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Column;