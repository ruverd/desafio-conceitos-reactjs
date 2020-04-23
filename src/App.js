import React, { useState, useEffect } from 'react';

import { FaPlus } from 'react-icons/fa';

import './styles.css';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      url: 'https://github.com/ruverd/express-api-boilerplate',
      title: `New Repository ${Date.now()}`,
      techs: ['Node', 'Express', 'TypeScript'],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter((repository) => repository.id !== id);

    setRepositories([...newRepositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
            repositories.map((repository) => (
              <li key={repository.id}>
                { repository.title }
                <button type="button" onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            ))
          }
      </ul>
      <div className="btnWrapper">
        <button data-testid="button-add" type="button" onClick={handleAddRepository}><FaPlus /></button>
      </div>
    </div>
  );
}

export default App;
