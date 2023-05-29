const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Configure a conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'TESTE@123',
    database: 'Lab'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
    console.log('Conectado ao banco de dados.');
});

// Crie uma rota para buscar dados
app.get('/api/data', (req, res) => {
    db.query('SELECT * FROM react_db', (err, results) => {
        if (err) {
            console.error('Erro ao realizar a consulta:', err);
            res.status(500).send('Erro ao realizar a consulta.');
            return;
        }
        res.json(results);
    });
});

// Rota para atualizar dados
app.put('/api/data/:id', (req, res) => {
    const id = req.params.id;
    const { nome, nacionalidade, idade, pais } = req.body;

    const sql = 'UPDATE react_db SET nome = ?, nacionalidade = ?, idade = ?, pais = ? WHERE id = ?';
    const values = [nome, nacionalidade, idade, pais, id];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao realizar a atualização:', err);
            res.status(500).send('Erro ao realizar a atualização.');
            return;
        }
        res.json(results);
    });
});

// Inicie o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
