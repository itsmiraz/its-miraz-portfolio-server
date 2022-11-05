const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

app.use(cors())
app.use(express.json())

const projects = require('./data/projects.json')


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.fpgnyx0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const projectCollection = client.db('PortFolioPorject').collection('projects')
        app.get('/projects', async (req, res) => {
            const query = {}
            const cursor = projectCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
    }
    finally {

    }
}

run().catch(err => console.log(err))




app.get('/', (req, res) => {
    res.send('Hello world!');
})

// app.get('/projects', (req, res) => {
//     res.send(projects)
// })


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
