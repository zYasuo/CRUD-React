import React from 'react';
import TableRow from './TableRow';

const Table = ({ data, onEdit, onUpdate, editItem }) => {
  return (
    <div className="div-table">
    <table className="table">
      <thead className="thead">
        <tr className="tr">
          <th className="th">ID</th>
          <th className="th">Nome</th>
          <th className="th">Nacionalidade</th>
          <th className="th">Idade</th>
          <th className="th">Pais</th>
          <th className="th">Ações</th>
        </tr>
      </thead>
      <tbody className="tbody">
        {data.map((item) => (
          <TableRow key={item.id} item={item} onEdit={onEdit} onUpdate={onUpdate} editItem={editItem}/>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Table;
