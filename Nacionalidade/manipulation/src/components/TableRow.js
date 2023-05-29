import React, { useState } from 'react';

const TableRow = ({ item, onEdit, editItem, onUpdate }) => {
  const [editedItem, setEditedItem] = useState(item);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedItem({...editedItem, [name]: value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(editedItem);
  };

  return (
    <tr className="tr">
      {editItem && editItem.id === item.id ? (
        <>
          <td className="td">
            <input name="nome" value={editedItem.nome} onChange={handleChange} />
          </td>
          <td className="td">
            <input name="nacionalidade" value={editedItem.nacionalidade} onChange={handleChange} />
          </td>
          <td className="td">
            <input name="idade" type="number" value={editedItem.idade} onChange={handleChange} />
          </td>
          <td className="td">
            <input name="pais" value={editedItem.pais} onChange={handleChange} />
          </td>
          <td className="td">
            <button onClick={handleSubmit}>Salvar</button>
          </td>
        </>
      ) : (
        <>
          <td className="td">{item.id}</td>
          <td className="td">{item.nome}</td>
          <td className="td">{item.nacionalidade}</td>
          <td className="td">{item.idade}</td>
          <td className="td">{item.pais}</td>
          <td className="td">
            <button onClick={() => onEdit(item)}>Editar</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default TableRow;
