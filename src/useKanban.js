import { useState, useCallback } from 'react';
import axios from 'axios';

const useKanban = () => {
    const [statuses, setStatuses] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStatuses = useCallback(async () => {
        try {
            const response = await axios.get('https://expressjs-server.vercel.app/statuses');
            setStatuses(response.data);
        } catch (err) {
            setError('Failed to fetch statuses');
            throw err;
        }
    }, []);

    const fetchTasks = useCallback(async () => {
        try {
            const response = await axios.get('https://expressjs-server.vercel.app/tasks');
            setTasks(response.data);
        } catch (err) {
            setError('Failed to fetch tasks');
            throw err;
        }
    }, []);

    const moveTask = useCallback(async (taskId, newStatus) => {
        try {
            await axios.patch(`https://expressjs-server.vercel.app/tasks/${taskId}`, {
                status: newStatus
            });
            await fetchTasks();
        } catch (err) {
            setError('Failed to move task');
            throw err;
        }
    }, [fetchTasks]);

    const initializeKanban = useCallback(async () => {
        setLoading(true);
        try {
            await Promise.all([fetchStatuses(), fetchTasks()]);
        } catch (err) {
            setError('Failed to initialize Kanban board');
        } finally {
            setLoading(false);
        }
    }, [fetchStatuses, fetchTasks]);

    return {
        statuses,
        tasks,
        loading,
        error,
        moveTask,
        initializeKanban
    };
};

export default useKanban;