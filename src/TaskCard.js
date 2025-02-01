import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const TaskCard = ({ task, statuses, onMoveTask, onDeleteTask, onUpdateTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editedTask, setEditedTask] = useState({
        name: task.name,
        description: task.description,
        priority: task.priority,
        status: task.status
    });

    const currentStatusIndex = statuses.findIndex(status => status.title === task.status);
    const canMoveLeft = currentStatusIndex > 0;
    const canMoveRight = currentStatusIndex < 3;

    const handleMoveLeft = () => {
        if (canMoveLeft) {
            const newStatus = statuses[currentStatusIndex - 1].title;
            onMoveTask(task._id, newStatus);
        }
    };

    const handleMoveRight = () => {
        if (canMoveRight) {
            const newStatus = statuses[currentStatusIndex + 1].title;
            onMoveTask(task._id, newStatus);
        }
    };

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal);
    };

    const handleDelete = () => {
        onDeleteTask(task._id);
        toggleDeleteModal();
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        onUpdateTask(task._id, editedTask);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTask({
            name: task.name,
            description: task.description,
            priority: task.priority,
            status: task.status
        });
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (isEditing) {
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={editedTask.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={editedTask.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Priority (0-9)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="priority"
                            value={editedTask.priority}
                            onChange={handleInputChange}
                            min="0"
                            max="9"
                        />
                        <div className="form-text">
                            0-3: Low Priority (Green)
                            <br />
                            4-6: Medium Priority (Yellow)
                            <br />
                            7-9: High Priority (Red)
                        </div>
                    </div>
                    <div className="d-flex justify-content-end gap-2">
                        <button
                            className="btn btn-secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="card mb-3">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <span>{task.name}</span>
                    <span className={`badge bg-${getPriorityColor(task.priority)}`}>
                        Priority: {task.priority}
                    </span>
                </div>
                <div className="card-body">
                    <p className="card-text">{task.description}</p>
                    <div className="d-flex justify-content-between">
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={handleMoveLeft}
                            disabled={!canMoveLeft}
                        >
                            ←
                        </button>
                        <button
                            className="btn btn-warning btn-sm"
                            onClick={handleEdit}
                        >
                            ✏️ Edit
                        </button>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={toggleDeleteModal}
                        >
                            X
                        </button>
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={handleMoveRight}
                            disabled={!canMoveRight}
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>

            <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
                <ModalHeader toggle={toggleDeleteModal}>
                    Confirm Delete
                </ModalHeader>
                <ModalBody>
                    Are you sure you want to delete task "{task.name}"?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDelete}>
                        Yes, Delete
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleDeleteModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

const getPriorityColor = (priority) => {
    const priorityNum = Number(priority);
    if (priorityNum >= 0 && priorityNum <= 3) {
        return 'success';
    } else if (priorityNum >= 4 && priorityNum <= 6) {
        return 'warning';
    } else {
        return 'danger';
    }
};

export default TaskCard;