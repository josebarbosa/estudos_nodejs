const { Router } = require('express');
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const port = 3000; 

async function connect(){
    if(global.db) return global.db;
    const client = new MongoClient("mongodb://127.0.0.1:27017/")
    await client.connect();
    global.db = client.db("workshop");
    return global.db
}

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({message:'Funcionando!'}));
app.use('/', router);

router.get('/clientes', async function(req, res, next){
    try{
        const db = await connect();
        res.json(await db.collection("customers").find().toArray());
    }catch(ex){
        console.log(ex);
        res.status(400).json({erro:'${ex}'});
    }
});

router.get('/clientes/:id', async function(req, res, next){
    try{
        const db = await connect();
        if(req.params.id)
        res.json(await db.collection("customers").findOne({_id:new ObjectId(req.params.id)}));
        else
        res.json(await db.collection("customers").find().toArray()); 
    }catch(ex){
        console.log(ex);
        res.status(400).json({erro:'${ex}'});
    }
});

router.post('/clientes', async function(req, res, next){
    try{
        const customer = req.body;
        const db = await connect();
        res.json(await db.collection("customers").insertOne(customer));
    }catch(ex){
        console.log(ex);
        res.status(400).json({erro:'${ex}'});
    }
})

router.put('/clientes/:id', async function(req, res, next){
    try{
        const customer = req.body;
        const db = await connect();
        res.json(
            await db.collection("customers").updateOne({_id: new ObjectId(req.params.id)},
            {$set:customer}));
    }catch(ex){
        console.log(ex);
        res.status(400).json({erro:'${ex}'});
    }
})

router.patch('/clientes/:id', async function(req, res, next){
    try{
        const customer = req.body;
        const db = await connect();
        const id = {_id: new ObjectId(req.params.id)};
        res.json(
            await db.collection("customers").updateOne(id, {$set:customer}));
    }catch(ex){
        console.log(ex);
        res.status(400).json({erro:'${ex}'});
    }
})

router.delete('/clientes/:id', async function(req, res, next){
    try{
        const db = await connect()
        res.json(await db.collection("customers")
        .deleteOne({_id: new ObjectId(req.params.id)}));
    }catch{
        console.log(ex);
        res.status(400).json({erro:'${ex}'});
    }
})

app.listen(port);
console.log('Api funcionando!');