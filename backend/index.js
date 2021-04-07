const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//mongodb connection
mongoose.connect("mongodb://localhost:27017/nutrition", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log("Database connected");
});

const foodSchema = new mongoose.Schema({
    name:String,
    calories:Number,
    protein:Number,
    carbs:Number,
    fats:Number,
    fibre:Number,
    weight:Number,
});

const foodModel = new mongoose.model("foods", foodSchema);

app.get('/', (req,res)=>{
    res.send("Hello world, this is nodejs");
});

app.post("/food/create", (req,res)=>{
    const food = req.body;
    let foodObj = new foodModel(food);
    foodObj.save().then(()=>{
        res.send({status:"Food stored"});
    });
});

app.get('/food', async (req,res)=>{
    let foods = await foodModel.find();

    res.send({foods:foods});
});

app.listen(8080,()=>{
    console.log("Server running at port 8080");
});