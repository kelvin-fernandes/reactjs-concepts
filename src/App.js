import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('repositories').then(response => {
            setRepositories(response.data);
        });
    }, [])

    async function handleAddRepository() {
        const response = await api.post('repositories', {
            "title": `reactjs-concepts ${Date.now()}`,
            "url": "https://github.com/kelvin-fernandes/reactjs-concepts",
            "techs": [
                "Javascript",
                "CSS",
                "HTML"
            ]
        });

        const repository = response.data;

        setRepositories([...repositories, repository]);
    }

    async function handleRemoveRepository(id) {
        const response = await api.delete(`repositories/${id}`);

        const statusCode = response.status;

        if (statusCode === 204) {
            setRepositories([...repositories.filter(repository => repository.id !== id)]);
        }
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map(repository => (
                    <li>
                        {repository.title}

                        <button onClick={() => handleRemoveRepository(repository.id)}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
