import express from 'express';
const app = express();
const cors = require('cors');
const port = 8000;
const Vigenere = require('caesar-salad').Vigenere;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Task 2');
});

app.post('/encode/:name', (req, res) => {
    res.send(Vigenere.Cipher(req.body.password).crypt(req.params.name));
});

app.post('/decode/:name', (req, res) => {
    res.send(Vigenere.Decipher(req.body.password).crypt(req.params.name));
});

app.listen(port, () => {
    console.log('Server online on ' + port + ' port+');
});