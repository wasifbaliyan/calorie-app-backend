const express = require("express");
const calculate = require("./calculate");
const schema = require("./validate");
const app = express();
const cors = require("cors")
const mongoose = require('mongoose')
require('dotenv').config()

const url = `mongodb+srv://phablecare:${process.env.DB_PASSWORD}@cluster0.wlia6.mongodb.net/calorieAppDB?retryWrites=true&w=majority
`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


app.use(cors())
app.use(express.json())

const { Schema } = mongoose;

  const calorieSchema = new Schema({
    tdee:  Number, 
    bmr: Number,
    name:   String,
    date: { type: Date, default: Date.now },
    loose2PerDay:Number,loose4PerDay:Number,gain2PerDay:Number,gain4PerDay:Number
  });

  const Calorie = mongoose.model('Calorie', calorieSchema);
app.get("/api/user_data", async(req,res) => {
  const data = await Calorie.find();
  res.json(data);
})
app.post("/api/tdee", async(req, res) => {
    const valid = schema.validate(req.body);
    if(valid.error){
        return res.json(valid.error.details[0].message)
    } else {
        const result = calculate(req.body.weight, req.body.fat, req.body.level,req.body.name);
        res.json(result);
        try {
            const newData = new Calorie(result);
            
            let saveData = await newData.save();
            console.log(saveData); 
            
          } catch (err) {
            console.log('err' + err);
            res.status(500).send(err);
          }
    }
})

const port = process.env.PORT || 8000;
app.listen(port,() => {
console.log(`This app is running at port: ${port}`)
})