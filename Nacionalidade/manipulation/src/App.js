import React, { useEffect, useState } from "react";
import './App.css';
import Table from './components/table';

const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleUpdate = (updatedItem) => {
    // aqui, você chamaria a API para atualizar o item
    fetch(`http://localhost:5000/api/data/${updatedItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('A resposta da rede não foi bem-sucedida.');
      }
      return response.json();
    })
    .then(updatedItemFromServer => {
      // depois de atualizar o item, você pode atualizar a lista de dados
      const updatedData = data.map((item) => {
        if (item.id === updatedItemFromServer.id) {
          return updatedItemFromServer;
        } else {
          return item;
        }
      });
      setData(updatedData);
      setEditItem(null); // limpa o item de edição
    })
    .catch(error => console.error('Erro ao atualizar o item: ', error));
  };

  const filteredData = data.filter(item => 
    item.nome.toLowerCase().includes(search.toLowerCase()) || 
    item.nacionalidade.toLowerCase().includes(search.toLowerCase()) ||
    item.idade.toString().includes(search.toLowerCase()) ||
    item.pais.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input type="text" value={search} onChange={handleChange} placeholder="Pesquisar..." />
      {filteredData.length > 0 ? (
        <Table data={filteredData} onEdit={handleEdit} onUpdate={handleUpdate} editItem={editItem}/>
      ) : (
        'Carregando...'
      )}
    </div>
  );
};

export default App;
