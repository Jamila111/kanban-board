import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InputGroup,
    Input,
    InputGroupText,
    Alert
} from 'reactstrap';

function CreateModel({ statuses, onCreateTask }) {
    const [modal, setModal] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        status: statuses.length > 0 ? statuses[0].title : '',
        priority: 0
    });

    const toggle = () => {
        setModal(!modal);
        setError('');
        if (modal) {
            setFormData({
                name: '',
                description: '',
                status: statuses.length > 0 ? statuses[0].title : '',
                priority: 0
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            setError('Please enter a task name');
            return;
        }
        try {
            await onCreateTask(formData);
            toggle();
        } catch (err) {
            setError('Failed to create task. Please try again.');
        }
    };

    const getPriorityColor = (priority) => {
        const priorityNum = Number(priority);
        if (priorityNum >= 0 && priorityNum <= 3) return 'success';
        if (priorityNum >= 4 && priorityNum <= 6) return 'warning';
        return 'danger';
    };

    return (
        <div className="mb-4">
            <Button color="danger" onClick={toggle}>
                Create new task
            </Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create new task</ModalHeader>
                <ModalBody>
                    {error && (
                        <Alert color="danger" className="mb-3">
                            {error}
                        </Alert>
                    )}

                    <InputGroup className="mb-3">
                        <InputGroupText>
                            Name
                        </InputGroupText>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroupText>
                            Description
                        </InputGroupText>
                        <Input
                            type="textarea"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    </InputGroup>

                    <div className="mb-3">
                        <label className="form-label">Priority (0-9)</label>
                        <Input
                            type="number"
                            name="priority"
                            value={formData.priority}
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
                        <div className="mt-2">
                            <span className={`badge bg-${getPriorityColor(formData.priority)}`}>
                                Priority: {formData.priority}
                            </span>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Status</label>
                        <select
                            className="form-select"
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            {statuses.map((status) => (
                                <option key={status._id} value={status.title}>
                                    {status.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit} disabled={!formData.name || !formData.description || !formData.status}>
                        Submit
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CreateModel;