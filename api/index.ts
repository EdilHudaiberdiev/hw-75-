import express from 'express';
const app = express();
const port = 8000;
const Vigenere = require('caesar-salad').Vigenere;
const password = '2835';

app.get('/', (req, res) => {
    res.send('Task 2');
});

app.get('/encode/:name', (req, res) => {
    res.send(Vigenere.Cipher(password).crypt(req.params.name));
});

app.get('/decode/:name', (req, res) => {
    res.send(Vigenere.Decipher(password).crypt(req.params.name));
});

app.listen(port, () => {
    console.log('Server online on ' + port + ' port+');
});