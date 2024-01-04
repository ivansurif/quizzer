import 'dotenv/config';
import express from 'express';
import { extractQuestions } from './router/parseJSONObject.js';

const app = express();
const collection = 'az204';
const db = 'quizzer';

app.use(express.json());
app.use(express.static('public'));

import { run, insertRecord, getRandomRecord } from './mongoConnect.js';
run().catch(console.error);


app.post('/add-questions-manual', async (req, res) => {
    try {
        const result = await insertRecord(req.body, collection, db);
        res.status(200).json({ message: `Questions added successfully`, details: result });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding questions');
    }
});

// same as
// app.post('/add-questions-manual', (req, res) => {
//     insertRecord(req.body, collection, db)
//         .then(result => {
//             res.status(200).json({ message: `Questions added successfully`, details: result });
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).send('Error adding questions');
//         });
// });


app.get('/getQuestion', async (req, res) => {
    try {
        const result = await getRandomRecord(collection, db);
        res.status(200).json({ message: `Questions obtained successfully`, details: result });
            // res.status(200).json({ message: `Questions added successfully`, details: result });
        } catch (error) {
            console.error(error);
            // res.status(500).send('Error adding questions');
        }
    });



app.post('/add-questions', (req, res) => {
    try {
        extractQuestions(req);
        res.status(200).send('Questions added successfully');
    } catch (error) {
        res.status(500).send('Error getting questions');
    }
});

app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    const receivedData = req.body; // The JSON data sent from the client
    if (!receivedData.dataField || receivedData.dataField.trim() === '') {
        console.error('Error: Received empty message');
        res.status(400).json({ message: 'Error: Message is empty' });
        return;
    }
    res.json({ message: 'Data received successfully' });
});

const PORT = process.env.PORT;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
