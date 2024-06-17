"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';

async function getTask(token) {
    try {
        const response = await axios.get('http://localhost:5000/api/v1/tasks', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error('401');
        }
        throw error;
    }
}

function TaskCard({ task }) {
    return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {task.nombre}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {task.descripcion}
                </p>
            </div>
        </div>
    );
}

export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const tasks = await getTask(token);
                setTasks(tasks);
            } catch (err) {
                if (err.message === '401') {
                    window.location.href = '/login';
                } else {
                    setError(err.message);
                }
            }
            setLoading(false);
        };
        fetchTasks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error === 'No token found') {
        return <h1>No token found</h1>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}
