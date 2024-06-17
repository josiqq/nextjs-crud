"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

async function loginUser(credentials) {
    return fetch('http://localhost:5000/api/v1/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .catch(error => {
            throw error;
        });
}

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 5000); // 5000 ms = 5 seconds

            return () => clearTimeout(timer); // Clean up timer on unmount or error change
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({
                email,
                password
            });

            if ('accessToken' in response) {
                console.log(response);

                localStorage.setItem('accessToken', response.accessToken);

                window.location.href = '/';
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (error) {
            if (error.message === '404') {
                setError('No se encuentra el correo');
            } else {
                setError('Credenciales incorrectas');
            }
        }
    }

    return (
        <div className="flex items-center min-h-screen justify-center">
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                {error && <h1 className="text-red-600">{error}</h1>}
                <form className="space-y-6" required onSubmit={handleSubmit}>
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Inicia sesión con tu cuenta🍓</h5>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="username@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            required />
                    </div>

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Iniciar sesión</button>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        No estás registrado? <Link href="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Crear una cuenta</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
