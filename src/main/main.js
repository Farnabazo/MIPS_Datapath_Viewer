const express = require('express');
const cors = require('cors');
const routes = require('./routes.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((req, res) => {
    res.json({
        message: 'Server attivo',
        method: req.method,
        path: req.path
    });
});

app.listen(8000, '127.0.0.1', () => {
  console.log('Server in ascolto su http://localhost:8000');
});
