"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskForm() {
    const [token, setToken] = useState('');
    const [task, setTask] = useState({
        nombre: "",
        descripcion: "",
    });
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken'); 
        console.log(storedToken);
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 5000); 

            return () => clearTimeout(timer); 
        }
    }, [error]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setError("Acceso denegado. Por favor, inicie sesión de nuevo.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/v1/tasks', task, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // Redireccionar
            router.push('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError("Acceso denegado. Por favor, inicie sesión de nuevo.");
            } else {
                setError("Ocurrió un error al crear la tarea.");
            }
        }
    };

    return (
        <div className="flex items-center min-h-screen justify-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                {error && <h1 className="text-red-600">{error}</h1>}
                <form className="max-w-md space-y-6 mx-auto" onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Crear una nueva tarea📋</h5>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="nombre"
                            id="nombre_task"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={handleChange}
                            required
                        />
                        <label
                            htmlFor="nombre_task"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Nombre
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="descripcion"
                            id="descripcion_task"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            onChange={handleChange}
                            required
                        />
                        <label
                            htmlFor="descripcion_task"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Descripción
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Crear nueva tarea
                    </button>
                </form>
            </div>
        </div>
    );
}
