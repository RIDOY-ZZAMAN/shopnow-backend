const express = require('express');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();
const port = process.env.PORT || 5000;

const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.r53mt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db('FinalTask');
        const productCollection = database.collection('products');
        const cartCollection = database.collection('cartItems');
        console.log("Database connected For Assignment task");

        //GET API
        app.get('/', (req, res) => {
            res.send("Hello from the shopNow");

        })

        //GETTING ALL THE PRODUCTS
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            const result = await cursor.toArray();
            res.send(result);


        })

        // //ADDING NEW PRODUCTS IN CART
        // app.post('/cartItems', async (req, res) => {
        //     const cart = req.body;
        //     const result = await cartCollection.insertOne(cart);
        //     res.json(result)
        // })

        // app.get('/cartItems', async (req, res) => {
        //     const cursor = cartCollection.find({});
        //     const result = await cursor.toArray();
        //     res.send(result);


        // })



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log("Listening to port", port)
})